import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, observable, Observable, pluck, retry} from "rxjs";
import {Config} from "../config";
import {User, UserBuilder} from "../models/user.model";
import {Post, PostBuilder} from "../models/post.model";
import {Comment, CommentBuilder} from "../models/comment.model";

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
              .setCommentCount(post.commentCount)
              .setComments(
                post.comments.map((comment: any) => {
                  return new CommentBuilder()
                    .setId(comment.id)
                    .setPostId(comment.postId)
                    .setParentCommentId(comment.parentCommentId)
                    .setAuthor(
                      new UserBuilder()
                        .setUsername(comment.author[0].username)
                        .setProfileImage(comment.author[0].profileImage)
                        .build()
                    )
                    .setContent(comment.content)
                    .build();
                })
              )
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

  getPosts(): Observable<Post[]>{
    return this.http.get(`${Config.Host}/api/v1/posts/`).pipe(
      map((data: any) => (data || Array()).map((post: any) => {
        return new PostBuilder()
          .setId(post.id)
          .setContent(post.content)
          .setCommentCount(post.commentCount)
          .setAuthor(
            new UserBuilder()
              .setUsername(post.author[0].username)
              .setId(post.author[0].id)
              .setProfileImage(post.author[0].profileImage)
              .setBackgroundImage(post.author[0].backgroundImage)
              .build()
          )
          .setComments(
            post.comments.map((comment: any) => {
              return new CommentBuilder()
                .setId(comment.id)
                .setPostId(comment.postId)
                .setContent(comment.content)
                .setAuthor(
                  new UserBuilder()
                    .setId(comment.author.id)
                    .setUsername(comment.author.username)
                    .setProfileImage(comment.author.profileImage)
                    .setBackgroundImage(comment.author.backgroundImage)
                    .build()
                )
                .build()
            })
          )
          .build();
      }))
    )
  }

  postComment(comment: Comment) {
    return this.http.post(`${Config.Host}/api/v1/posts/${comment.PostId}/comments/`, {"content": comment.Content}, {observe: 'response'}).pipe(
      map((comment: any) => {
        return new CommentBuilder()
          .setId(comment.id)
          .setPostId(comment.postId)
          .setContent(comment.content)
          .build()
      })
    );
  }

  getPostComments(postId: string, page: number, size: number){
    return this.http.get(`${Config.Host}/api/v1/posts/${postId}/comments?page=${page}&size=${size}`).pipe(
      map((data: any) => (data || Array()).map((comment: any) => {
        return new CommentBuilder()
          .setId(comment.id)
          .setPostId(comment.postId)
          .setContent(comment.content)
          .setAuthor(
            new UserBuilder()
              .setId(comment.author.id)
              .setUsername(comment.author.username)
              .setProfileImage(comment.author.profileImage)
              .setBackgroundImage(comment.author.backgroundImage)
              .build()
          )
          .build()
      }))
    )
  }
}
