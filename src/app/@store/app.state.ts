import { RouterState } from '@angular/router';
import { authReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selectors';
import { AuthState } from '../auth/state/auth.state';
import { sharedReducer } from './Shared/shared.reducer';
import { SHARED_STATE_NAME } from './Shared/shared.selectors';
import { SharedState } from './Shared/shared.state';
import { CounterState, counterReducer } from './counter/counter.reducers';
import { postsReducer } from './posts/posts.reducer';
import { PostsState } from '././posts/posts.state';
import { routerReducer } from '@ngrx/router-store';
export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer,
  router: routerReducer,
};

// export interface AppState {
//   posts: PostsState;
//   counter: CounterState;
// }

// export const appReducer = {
//   counter: counterReducer,
//   posts: postsReducer,
// };
