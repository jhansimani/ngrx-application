import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LOAD_POSTS,
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import {
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { setErrorMessage, setLoadingSpinner } from '../Shared/shared.actions';
import { Router } from '@angular/router';
import {
  ROUTER_NAVIGATION,
  RouterNavigationAction,
  RouterNavigatedAction,
} from '@ngrx/router-store';
import { Post } from 'src/app/models/post.model';
import { RouterStateUrl } from '../router/custom-serializer';
import { Update } from '@ngrx/entity';
import { getPosts } from './posts.selectors';
import { dummyAction } from 'src/app/auth/state/auth.actions';
@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private postsService: PostsService,
    private router: Router
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return loadPostsSuccess({ posts: data });
            })
          );
        } else {
          return of(dummyAction);
        }
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            console.log(data);
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post: post, redirect: true });
          })
        );
      })
    );
  });

  addPostRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addPostSuccess), // using because we are redirecting to the same home page only
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['posts']);
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const updatedPost: Update<Post> = {
              id: action.post.id ?? '',
              changes: { ...action.post },
            };
            return updatePostSuccess({ post: updatedPost, redirect: true });
          })
        );
      })
    );
  });

  updatePostRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePostSuccess), // using because we are redirecting to the same home page only
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['posts']);
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            console.log(data);
            return deletePostSuccess({ id: action.id, redirect: true });
          })
        );
      })
    );
  });

  deletePostRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deletePostSuccess), // using because we are redirecting to the same home page only
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['posts']);
          }
        })
      );
    },
    {
      dispatch: false,
    }
  );

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/posts/details/');
      }),
      map((r: RouterNavigationAction) => {
        // const route= r.payload.routerState;
        const routerState = r.payload.routerState;
        const getId = (routerState: any) => routerState.params['id'];
        const id = getId(routerState);
        // return r.payload.routerState.root.params['id'];
        // return r.payload.routerState.root.paramMap.get('id');
        // // const { id } = params;
        // r.payload.routerState['params']['id'];
        return id;
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postsData: Post[] = [{ ...post, id }];
              return loadPostsSuccess({ posts: postsData });
            })
          );
        } else {
          return of(dummyAction);
        }
      })
    );
  });
}
