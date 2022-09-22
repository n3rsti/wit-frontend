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
        if(resp.access_token){
          localStorage.setItem("access_token", resp.access_token);
          localStorage.setItem("refresh_token", resp.refresh_token);
          localStorage.setItem("username", this.parseJwt(resp.access_token)["sub"]);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  get username() { return this.loginGroup.get('username'); }
  get password() { return this.loginGroup.get('password'); }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

}
