import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/@store/app.state';
import { getPostById } from 'src/app/@store/posts/posts.selectors';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  post$!: Observable<Post>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.post$ = this.store.select(getPostById);
  }
}
