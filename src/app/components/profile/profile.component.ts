import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = <User>{};
  username: string = '';
  isOwnProfile: boolean = false;
  openedPostMenuIndex = -1;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    localStorage.setItem('title', 'Profile');

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

  togglePostMenu(index: number){
    if(index == this.openedPostMenuIndex)
      this.openedPostMenuIndex = -1;
    else
      this.openedPostMenuIndex = index;
  }
  closePostMenu(){
    this.openedPostMenuIndex = -1;
  }

}
