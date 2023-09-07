import { Component, OnInit } from '@angular/core';
import { AppState } from './@store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './@store/Shared/shared.selectors';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-application';
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
