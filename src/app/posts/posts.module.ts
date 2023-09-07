import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from '../@store/posts/posts.reducer';
import { POSTS_STATE_NAME } from '../@store/posts/posts.selectors';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from '../@store/posts/posts.effects';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
  },
];
@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POSTS_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
