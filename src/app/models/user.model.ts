export class IUser {
  protected id: string = '';
  protected username: string = '';

  get Id(){
    return this.id;
  }

  get Username(){
    return this.username;
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

  build(): User {
    return new User(this);
  }

}

export class User extends IUser {
  constructor(builder: UserBuilder) {
    super();
    this.id = builder.Id;
    this.username = builder.Username;
  }
}
