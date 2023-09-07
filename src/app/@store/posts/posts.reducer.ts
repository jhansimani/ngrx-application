import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './posts.actions';
import { Post } from '../../models/post.model';
import { initialState, postsAdaptor } from './posts.state';

const reducer = createReducer(
  initialState,
  // on(PostsActions.addPost, (state, action) => {
  //   const id = (state.posts.length + 1).toString();
  //   return {
  //     ...state,
  //     posts: [
  //       ...state.posts,
  //       {
  //         id: id,
  //         ...action.post,
  //       },
  //     ],
  //   };
  // }),
  // on(PostsActions.updatePost, (state, action) => {
  //   const updatedPosts: Post[] = state.posts.map((post) =>
  //     post.id === action.post.id ? action.post : post
  //   );
  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),
  // on(PostsActions.deletePost, (state, action) => {
  //   const updatedPosts: Post[] = state.posts.filter(
  //     (post) => post.id !== action.id
  //   );
  //   return {
  //     ...state,
  //     posts: updatedPosts,
  //   };
  // }),
  on(PostsActions.loadPostsSuccess, (state, action) => {
    //if you want to update other than entity
    return postsAdaptor.setAll(action.posts, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(PostsActions.addPostSuccess, (state, action) => {
    return postsAdaptor.addOne(action.post, state);
  }),
  on(PostsActions.updatePostSuccess, (state, action) => {
    return postsAdaptor.updateOne(action.post, state);
    // return postAdaptor.updateOne()
    // const updatedPosts: Post[] = state.posts.map((post) =>
    //   post.id === action.post.id ? action.post : post
    // );
    // return {
    //   ...state,
    //   posts: updatedPosts,
    // };
  }),
  on(PostsActions.deletePostSuccess, (state, action) => {
    return postsAdaptor.removeOne(action.id, state);
  })
);
export function postsReducer(state: any, action: any) {
  return reducer(state, action);
}
