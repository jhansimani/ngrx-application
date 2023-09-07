import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';

export const ADD_POST_ACTION = '[Posts page] add Post';
export const ADD_POST_SUCCESS = '[Posts page] add Post suuccess';

export const UPDATE_POST_ACTION = '[Posts page] update Post';
export const UPDATE_POST_SUCCESS = '[Posts page] update Post Success';

export const DELETE_POST_ACTION = '[Posts page] delete Post';
export const DELETE_POST_SUCCESS = '[Posts page] delete Post Success';

export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: Post; redirect: boolean }>()
);

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>()
);

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Update<Post>; redirect: boolean }>()
);

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string }>()
);

export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ id: string; redirect: boolean }>()
);

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
);

// export const getPost = createAction(GET_POST, props<{ id: number }>());
