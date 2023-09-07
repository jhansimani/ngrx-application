import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store/app.state';
import { Observable } from 'rxjs';
import { getCount, getPosts } from 'src/app/@store/posts/posts.selectors';
import { Post } from 'src/app/models/post.model';
import * as PostActions from '../../@store/posts/posts.actions';
import { setLoadingSpinner } from 'src/app/@store/Shared/shared.actions';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  count$!: Observable<number>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.count$ = this.store.select(getCount);
    this.store.dispatch(PostActions.loadPosts());
  }
  onDeletePost(id: any) {
    if (confirm('Are you want to delete Post')) {
      this.store.dispatch(PostActions.deletePost({ id }));
    }
  }
}
