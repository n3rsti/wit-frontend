import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {User, UserBuilder} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {ToastOptions} from "../../interfaces/toast-options";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new UserBuilder().build();
  username: string = '';
  isOwnProfile: boolean = false;

  toastList: ToastOptions[] = [];

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    localStorage.setItem('title', 'Profile');
    
    this.route.params.subscribe((param) => {
      this.route.params.pipe(
        take(1)
      ).subscribe((param) => {
        let username = param['username'];
        if (username == null)
          this.username = localStorage.getItem('username') || '';
        else
          this.username = username;

        if (this.username == localStorage.getItem('username'))
          this.isOwnProfile = true;
      })

      this.getUser(this.username);
    })

  }

  getUser(username: string) {
    this.data.getUser(username).subscribe({
      next: (user: User) => {
        this.user = user;
        console.log(this.user);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  createToast(){
    this.toastList.push({
      content: 'Post deleted',
      icon: ''
    })
  }

}
