import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {DataService} from "../../../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user: User = <User>{};
  username: string = '';

  userGroup: FormGroup;

  constructor(
    private data: DataService,
    private router: Router,
  ) {
    this.userGroup = new FormGroup(
      {
        profileImage: new FormControl('', [Validators.required]),
        backgroundImage: new FormControl('', [Validators.required]),
      }
    );
  }

  ngOnInit(): void {
    localStorage.setItem('title', 'Profile');

    this.username = localStorage.getItem('username') || '';
    this.getUser(this.username);
  }

  // after form with value after data fetch
  updateForm(){
    this.userGroup.setValue({
      profileImage: this.user.ProfileImage,
      backgroundImage: this.user.BackgroundImage
    })
  }

  getUser(username: string){
    this.data.getUser(username).subscribe({
      next: (user: User) => {
        this.user = user;
        console.log(this.user);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.updateForm();
      }
    })
  }

  onSubmit(){
    this.user.setProfileImage(this.userGroup.get('profileImage')?.value);
    this.user.setBackgroundImage(this.userGroup.get('backgroundImage')?.value);

    this.data.updateUser(this.user).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigate(['/profile']);
      }
    });
  }

}
