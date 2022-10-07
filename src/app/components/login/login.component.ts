import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  return = '';
  loginGroup: FormGroup;
  error = null;

  constructor(
    private router: Router,
    private data: DataService,
    private route: ActivatedRoute
  ) {
    this.loginGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params =>  this.return = params['return'] || '/');
  }

  onSubmit(){
    this.data.login(this.username?.value, this.password?.value).subscribe({
      next: (resp: any) => {
        if(resp.access_token){
          localStorage.setItem("access_token", resp.access_token);
          localStorage.setItem("refresh_token", resp.refresh_token);

          const username = this.parseJwt(resp.access_token)["sub"]

          localStorage.setItem("username", username);

          this.data.getUser(username).subscribe({
            next: (user: User) => {
              localStorage.setItem("profile_image", user.ProfileImage);
              localStorage.setItem("background_image", user.BackgroundImage);
            },
            error: (error: any) => {
              console.log(error);
            }
          })


          this.router.navigate([this.return]);
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
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

}
