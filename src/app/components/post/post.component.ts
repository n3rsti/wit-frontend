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

  @Input() author: User = <User>{};
  @Input() post: Post = <Post>{};
  @Output() deletePostEvent = new EventEmitter<number>;

  isOwnProfile = false;
  isMenuOpened = false;

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.isOwnProfile = localStorage.getItem('username') == this.author.Username;
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
