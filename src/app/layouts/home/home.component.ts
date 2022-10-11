import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username = '';
  profileImage = '';


  isNavOpened = false;

  constructor() {
  }


  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.profileImage = localStorage.getItem('profile_image') || '';
  }

}
