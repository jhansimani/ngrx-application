import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, postsAdaptor } from './posts.state';
import { Post } from 'src/app/models/post.model';
import { getCurrentRoute } from '../router/router.selector';
import { RouterStateUrl } from '../router/custom-serializer';

export const POSTS_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const postsSelectors = postsAdaptor.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostsEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

// export const getPosts = createSelector(getPostsState, (state) => {
//   return state.posts;
// });

// export const getPostById = createSelector(
//   getPostsState,
//   (state: any, props: any) => {
//     return state.posts.find((post: Post) => post.id == props.id);
//   }
// );
// replacing props with getCurrentRoute
// export const getPostById = createSelector(
//   getPosts,
//   getCurrentRoute,
//   (posts: any, route: RouterStateUrl) => {
//     return posts
//       ? posts.find((post: Post) => post.id == route.params['id'])
//       : null;
//   }
// );

//
export const getPostById = createSelector(
  getPostsEntities,
  getCurrentRoute,
  (posts: any, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

export const getCount = createSelector(getPostsState, (state) => state.count);
