import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user.model";
import {Post} from "../../models/post.model";
import {DataService} from "../../services/data.service";
import {ToastOptions} from "../../interfaces/toast-options";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() author: any = <User>{};
  @Input() post: Post = <Post>{};
  @Output() deletePostEvent = new EventEmitter<number>;
  dateDiff: string = '';

  isOwnProfile = false;
  isMenuOpened = false;

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.isOwnProfile = localStorage.getItem('username') == this.author.Username;

    const dateDiffMinutes = Math.floor((new Date().getTime() -  this.post.CreationDate.getTime()) / (60*1000));

    switch (true) {
      case dateDiffMinutes < 1:
        this.dateDiff = "Just now";
        break;
      case dateDiffMinutes < 60:
        this.dateDiff = `${dateDiffMinutes}m`;
        break;
      case dateDiffMinutes < 24 * 60:
        this.dateDiff = `${Math.floor(dateDiffMinutes / 60)}h`;
        break;
      default:
        this.dateDiff = `${Math.floor(dateDiffMinutes / 60 / 24)}d`;
        break;
    }

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

}
