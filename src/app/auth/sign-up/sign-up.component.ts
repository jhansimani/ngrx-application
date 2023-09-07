import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/@store/Shared/shared.actions';
import { AppState } from 'src/app/@store/app.state';
import { signUpStart } from '../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSignUp() {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.controls['email'].value;
    const password = this.signUpForm.controls['password'].value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signUpStart({ email, password }));
  }
}
