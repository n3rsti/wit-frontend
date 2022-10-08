import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  postContent = '';

  constructor(
    private data: DataService
  ) {

  }

  ngOnInit(): void {
  }

  createPost(){

  }

}
