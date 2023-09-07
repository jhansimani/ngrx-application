import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        'https://ngrx-application-9b12d-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://ngrx-application-9b12d-default-rtdb.firebaseio.com/posts.json',
      post
    );
  }

  updatePost(post: Post) {
    const key: any = post.id;
    const postData: any = {
      [key]: {
        title: post.title,
        description: post.description,
      },
    };
    return this.http.patch(
      'https://ngrx-application-9b12d-default-rtdb.firebaseio.com/posts.json',
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://ngrx-application-9b12d-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://ngrx-application-9b12d-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
