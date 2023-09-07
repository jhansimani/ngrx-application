import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/@store/app.state';
import * as PostSelectors from '../../@store/posts/posts.selectors';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs';
import * as PostsActions from '../../@store/posts/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  post!: Post;
  routeSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createEditForm();
    // this.routeSubscription = this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.store.select(PostSelectors.getPostById, { id }).subscribe((data) => {
    //     this.post = data;
    //     this.updateForm();
    //   });
    // });

    this.store.select(PostSelectors.getPostById).subscribe((post) => {
      this.post = post;
      this.updateForm();
    });
  }
  createEditForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onUpdatePost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = { id: this.post.id, ...this.postForm.value };
    this.store.dispatch(
      PostsActions.updatePost({
        post,
      })
    );
  }

  updateForm() {
    if (this.post) {
      this.postForm.patchValue({
        title: this.post.title,
        description: this.post.description,
      });
    }
  }
  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
