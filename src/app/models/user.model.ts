import {Post} from "./post.model";

export class IUser {
  protected id: string = '';
  protected username: string = '';
  protected profileImage: string = '';
  protected backgroundImage: string = '';
  protected postList: Post[] = [];

  get Id(){
    return this.id;
  }

  get Username(){
    return this.username;
  }

  get ProfileImage(){
    return this.profileImage;
  }

  get BackgroundImage(){
    return this.backgroundImage;
  }

  get PostList(){
    return this.postList;
  }


}

export class UserBuilder extends IUser{
  constructor() {
    super();
  }

  setUsername(username: string){
    this.username = username;
    return this;
  }

  setId(id: string){
    this.id = id;
    return this;
  }

  setProfileImage(profileImage: string){
    this.profileImage = profileImage;
    return this;
  }

  setBackgroundImage(backgroundImage: string){
    this.backgroundImage = backgroundImage;
    return this;
  }

  setPostList(postList: Post[]){
    this.postList = postList;
    return this;
  }

  build(): User {
    return new User(this);
  }

}

export class User extends IUser {
  constructor(builder: UserBuilder) {
    super();
    this.id = builder.Id;
    this.username = builder.Username;
    this.profileImage = builder.ProfileImage;
    this.backgroundImage = builder.BackgroundImage;
    this.postList = builder.PostList;
  }

  setProfileImage(profileImage: string){
    this.profileImage = profileImage;
  }

  setBackgroundImage(backgroundImage: string){
    this.backgroundImage = backgroundImage;
  }

  toJSON(): Object {
    return {
      id: this.id,
      username: this.username,
      profileImage: this.profileImage,
      backgroundImage: this.backgroundImage
    }
  }
}
