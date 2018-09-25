import { Post } from './post';

/* tslint:disable:max-classes-per-file */

export interface IDetailable {
  title: string;
  date: string;
  updated: string;
  comments: boolean;
  path: string;
  covers?: string|null;
  excerpt?: string|null;
  content: string;
}

export class Article extends Post implements IDetailable {
  public covers?: string|null = null;
  public content: string = '';
  public excerpt: string = '';

  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of [ 'covers', 'content' ]) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

export class Page implements IDetailable {
  public title = '';
  public date = '';
  public updated = '';
  public comments = false;
  public path = '';
  public covers = null;
  public excerpt = null;
  public content = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}
