import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = <User>{};
  username: string = '';

  constructor(
    private data: DataService
  ) { }

  ngOnInit(): void {
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
