import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username = localStorage.getItem('username');
  title = localStorage.getItem('title');

  isNavOpened = false;

  constructor() {

  }


  ngOnInit(): void {

  }

}