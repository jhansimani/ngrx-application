import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/@store/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.get('password')?.value;
    console.log(this.loginForm.value);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
  onCancel() {}
}
