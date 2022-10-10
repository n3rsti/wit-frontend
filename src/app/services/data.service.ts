import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, observable, Observable, pluck, retry} from "rxjs";
import {Config} from "../config";
import {User, UserBuilder} from "../models/user.model";
import {Post, PostBuilder} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(`${Config.Host}/api/v1/login`, body.toString(), options);

  }

  refreshToken(){
    return this.http.get(`${Config.Host}/api/v1/token/refresh`, {observe: 'response'});
  }

  getUser(username: string): Observable<User>{
    return this.http.get(`${Config.Host}/api/v1/users/${username}`).pipe(
      map((user: any) => {
        return new UserBuilder()
          .setId(user.id)
          .setUsername(user.username)
          .setProfileImage(user.profileImage)
          .setBackgroundImage(user.backgroundImage)
          .setPostList(user.postList.map((post: any) => {
            return new PostBuilder()
              .setId(post.id)
              .setAuthor(post.author)
              .setContent(post.content)
              .build()
          }))
          .build();
      }),
    )
  }
  updateUser(user: User){
    return this.http.patch(`${Config.Host}/api/v1/users/${user.Username}`, user.toJSON());
  }
  deletePost(postId: string){
    return this.http.delete(`${Config.Host}/api/v1/posts/${postId}`, {observe: 'response'});
  }
  createPost(post: Post): Observable<Post>{
    return this.http.post(`${Config.Host}/api/v1/posts/`, post.toJSON()).pipe(
      map((post: any) => {
        return new PostBuilder()
          .setId(post.id)
          .setAuthor(post.author)
          .setContent(post.content)
          .build()
      })
    );
  }
}
