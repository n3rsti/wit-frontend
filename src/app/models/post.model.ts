import {User} from "./user.model";
import {Comment} from "./comment.model";

export class IPost {
  protected id: string = '';
  protected author: User | string = <User>{};
  protected content: string = '';
  protected comments: Comment[] = [];
  protected commentCount = 0;

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

  get CreationDate(){
    return new Date(parseInt(this.id.substring(0, 8), 16) * 1000);
  }

  get CommentCount(){
    return this.commentCount;
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

  setComments(comments: Comment[]){
    this.comments = comments;
    return this;
  }

  setCommentCount(commentCount: number){
    this.commentCount = commentCount;
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
    this.comments = builder.Comments
    this.commentCount = builder.CommentCount;
  }

  setAuthor(author: User){
    this.author = author;
  }

  incrementCommentCount(){
    this.commentCount += 1;
  }

  toJSON(){
    return {
      author: this.Author,
      content: this.Content
    }
  }
}
