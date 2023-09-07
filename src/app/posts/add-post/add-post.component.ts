import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store/app.state';
import { Post } from 'src/app/models/post.model';
import * as PostsActions from '../../@store/posts/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {}

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.postForm.value);
    this.store.dispatch(
      PostsActions.addPost({
        post: this.postForm.value,
      })
    );
    this.postForm.reset();
  }
}
