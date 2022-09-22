import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;
  error = null;

  constructor(
    private router: Router,
    private data: DataService
  ) {
    this.loginGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    );
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.data.login(this.username?.value, this.password?.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  get username() { return this.loginGroup.get('username'); }
  get password() { return this.loginGroup.get('password'); }

}
