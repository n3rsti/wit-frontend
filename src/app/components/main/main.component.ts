import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {FormControl} from "@angular/forms";
import {Post, PostBuilder} from "../../models/post.model";
import {UserBuilder} from "../../models/user.model";
import {ToastOptions} from "../../interfaces/toast-options";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  postContent: string = '';
  postList: Post[] = [];
  toastList: ToastOptions[] = [];

  constructor(
    private data: DataService
  ) {

  }

  ngOnInit(): void {
    this.getPosts();
  }

  createPost(){
    const username: string = localStorage.getItem('username') || '';
    let post = new PostBuilder().setAuthor(username).setContent(this.postContent).build();


    this.data.createPost(post).subscribe({
      next: (responsePost) => {
        post = responsePost;
        post.setAuthor(
          new UserBuilder()
            .setUsername(username)
            .setProfileImage(localStorage.getItem('profile_image') || '')
            .setBackgroundImage(localStorage.getItem('background_image') || '')
            .build()
        );
        this.postList.push(post);
        this.toastList.push(
          {
            content: 'Post created',
            icon: 'success'
          }
        )
        this.postContent = '';
      },
      error: (err: Error) => {
        console.log(err);
      },
    })

  }

  deletePostToast(){
    this.toastList.push(
      {
        content: 'Post deleted',
        icon: ''
      }
    )
  }
  postCommentToast(){
    this.toastList.push(
      {
        content: 'Comment created',
        icon: 'success'
      }
    )
  }

  getPosts(){
    this.data.getPosts().subscribe(
      {
        next: (posts) => {
          this.postList = posts;
        }
      }
    )
  }

}
