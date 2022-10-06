export class IUser {
  protected id: string = '';
  protected username: string = '';
  protected profileImage: string = '';
  protected backgroundImage: string = '';

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
  }
}
