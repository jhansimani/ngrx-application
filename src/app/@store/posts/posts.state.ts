import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from 'src/app/models/post.model';

export interface PostsState extends EntityState<Post> {
  count: number;
}

export function sortByName(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1;
  }
  if (compare < 0) {
    return 1;
  }
  return compare;
}
// export function selectUserId(a: User): string {
//   //In this case this would be optional since primary key is id
//   return a.id;
// }

export const postsAdaptor = createEntityAdapter<Post>({
  //   selectId: (post: Post) => post.id,
  sortComparer: sortByName,
});

export const initialState: PostsState = postsAdaptor.getInitialState({
  count: 0,
});
