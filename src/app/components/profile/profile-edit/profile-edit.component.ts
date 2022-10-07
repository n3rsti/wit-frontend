import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: User = <User>{};
  username: string = '';

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('title', 'Profile');

    this.username = localStorage.getItem('username') || '';
    this.getUser(this.username);
  }

  getUser(username: string){
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

}
