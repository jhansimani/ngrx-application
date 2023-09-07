import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/authResponse.model';
import { User } from '../models/user.model';
import { AppState } from '../@store/app.state';
import { Store } from '@ngrx/store';
import { autoLogout } from '../auth/state/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate: Date = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account. Please provide other email !';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return ' We have blocked all requests from this device due to unusual activity. Try again later.';
      default:
        return 'Unknown error occured. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  getUserDataFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userDataObj = JSON.parse(userDataString);
      const user = new User(
        userDataObj.email,
        userDataObj.token,
        userDataObj.localId,
        new Date(userDataObj.expirationDate)
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }
  runTimeoutInterval(user: User) {
    const currentDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();

    const timeInterval = expirationDate - currentDate;
    this.timeoutInterval = setTimeout(() => {
      // auto logout
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }
  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
