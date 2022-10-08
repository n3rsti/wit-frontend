import {User} from "./user.model";

export class IPost {
  protected id: string = '';
  protected author: User | string = <User>{};
  protected content: string = '';
  protected comments: object = {};

  get Id(){
    return this.id;
  }

  get Author(){
    return this.author;
  }

  get Content(){
    return this.content;
  }

  get Comments(){
    return this.comments;
  }

}

export class PostBuilder extends IPost {
  constructor() {
    super();
  }

  setId(id: string){
    this.id = id;
    return this;
  }

  setAuthor(author: User | string){
    this.author = author;
    return this;
  }

  setContent(content: string){
    this.content = content;
    return this;
  }

  build(): Post {
    return new Post(this);
  }

}

export class Post extends IPost {
  constructor(builder: PostBuilder) {
    super();
    this.id = builder.Id;
    this.author = builder.Author;
    this.content = builder.Content;
    this.comments = builder.Comments;
  }

  setAuthor(author: User){
    this.author = author;
  }

  toJSON(){
    return {
      author: this.Author,
      content: this.Content
    }
  }
}
