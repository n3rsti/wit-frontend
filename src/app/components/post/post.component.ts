import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User, UserBuilder} from "../../models/user.model";
import {Post} from "../../models/post.model";
import {DataService} from "../../services/data.service";
import {ToastOptions} from "../../interfaces/toast-options";
import {CommentBuilder} from "../../models/comment.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() author: any = <User>{};
  @Input() post: Post = <Post>{};
  @Output() deletePostEvent = new EventEmitter<number>;
  @Output() postCommentEvent = new EventEmitter;
  dateDiff: string = '';

  isOwnProfile = false;
  isMenuOpened = false;


  comment = '';
  commentCount = 1;
  commentPage = 0;
  showComments: boolean = true;

  constructor(
    private data: DataService
  ) {
  }

  ngOnInit(): void {
    console.log(this.post.Comments);
    this.isOwnProfile = localStorage.getItem('username') == this.author.Username;

    this.dateDiff = this.convertTime(this.post.CreationDate.getTime());

  }

  convertTime(time: number) {
    const dateDiffMinutes = Math.floor((new Date().getTime() - time) / (60 * 1000));
    let dateDiff = '';

    switch (true) {
      case dateDiffMinutes < 1:
        dateDiff = "Just now";
        break;
      case dateDiffMinutes < 60:
        dateDiff = `${dateDiffMinutes}m`;
        break;
      case dateDiffMinutes < 24 * 60:
        dateDiff = `${Math.floor(dateDiffMinutes / 60)}h`;
        break;
      default:
        dateDiff = `${Math.floor(dateDiffMinutes / 60 / 24)}d`;
        break;
    }

    return dateDiff;
  }

  deletePost() {
    const postId = this.post.Id;

    this.data.deletePost(postId).subscribe(response => {
      const responseCode = response.status;

      if (responseCode === 204)
        document.querySelector(`[data-post='${postId}']`)?.classList.add('opacity-0');
      setTimeout(() => {
        document.querySelector(`[data-post='${postId}']`)?.classList.add('hidden');
      }, 300);
      // this.toastList.push({
      //   content: 'Post deleted',
      //   icon: ''
      // })


      // don't need to pass any value
      this.deletePostEvent.emit();


    })
  }

  postComment() {
    const comment = new CommentBuilder()
      .setPostId(this.post.Id)
      .setContent(this.comment)
      .build();


    this.data.postComment(comment).subscribe({
      next: (responseComment) => {
        comment.setAuthor(
          new UserBuilder()
            .setUsername(localStorage.getItem('username') || '')
            .setProfileImage(localStorage.getItem('profile_image') || '')
            .setBackgroundImage(localStorage.getItem('background_image') || '')
            .build()
        );
        this.post.Comments.push(comment);

        this.comment = '';
        this.post.incrementCommentCount();
        this.postCommentEvent.emit();
      }
    })
  }

  loadComments() {

    this.data.getPostComments(this.post.Id, this.commentCount, 4).subscribe({
        next: (comments) => {
          this.post.setComments(this.post.Comments.concat(comments));
          this.commentCount += comments.length;
        }
      }
    )
  }

}
