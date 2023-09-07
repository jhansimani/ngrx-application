import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN_START = '[Auth page] login start';
export const LOGIN_SUCCESS = '[Auth page] login success';
export const LOGIN_FAIL = '[Auth page] login fail';

export const SIGNUP_START = '[Auth Page] signup start';
export const SIGNUP_SUCCESS = '[Auth Page] signup success';
export const SIGNUP_FAIL = '[Auth Page] signup fail';

export const AUTO_LOGIN = '[Auth Page] auto login';

export const LOG_OUT = '[Auth Page] logout';
export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null; redirect: boolean }>()
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ email: string; password: string }>()
);

export const signUpStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signUpSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN);

export const autoLogout = createAction(LOG_OUT);
export const dummyAction = createAction('[dummy action]');
