import {User} from "./user.model";

export class IComment {
  protected id: string = '';
  protected postId: string = '';
  protected parentCommentId: string = '';
  protected author: User | string = <User>{};
  protected content: string = '';

  get Id(){
    return this.id;
  }

  get PostId(){
    return this.postId;
  }

  get ParentCommentId(){
    return this.parentCommentId;
  }

  get Author(){
    return this.author;
  }

  get Content(){
    return this.content;
  }

}

export class CommentBuilder extends IComment {
  constructor() {
    super();
  }

  setId(id: string){
    this.id = id;
    return this;
  }

  setPostId(id: string){
    this.postId = id;
    return this;
  }

  setParentCommentId(id: string){
    this.parentCommentId = id;
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

  build(): Comment{
    return new Comment(this);
  }

}
export class Comment extends IComment {
  constructor(builder: CommentBuilder) {
    super();
    this.id = builder.Id;
    this.postId = builder.PostId;
    this.parentCommentId = builder.ParentCommentId;
    this.author = builder.Author;
    this.content = builder.Content;
  }
}
