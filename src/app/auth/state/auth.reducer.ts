import { createReducer, on } from '@ngrx/store';
import { inititialState } from './auth.state';
import {
  autoLogout,
  loginStart,
  loginSuccess,
  signUpSuccess,
} from './auth.actions';

const reducer = createReducer(
  inititialState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
export function authReducer(state: any, action: any) {
  return reducer(state, action);
}
