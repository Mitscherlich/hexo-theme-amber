import { Post } from './post';

export class Modal {
  public isShown: boolean = false;
  public url: string = '';
  public post: Post = new Post();
}
