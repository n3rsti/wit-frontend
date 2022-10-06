import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, pluck, retry} from "rxjs";
import {Config} from "../config";
import {User, UserBuilder} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post(`${Config.Host}/api/v1/login`, body.toString(), options);

  }

  getUser(username: string): Observable<User>{
    return this.http.get(`${Config.Host}/api/v1/users/${username}`).pipe(
      map((user: any) => {
        return new UserBuilder()
          .setId(user.id)
          .setUsername(user.username)
          .setProfileImage(user.profileImage)
          .setBackgroundImage(user.backgroundImage)
          .build();
      }),
      retry(2)
    )
  }
}
