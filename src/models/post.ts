import pick from 'lodash.pick';
import merge from 'lodash.merge';
import Category from './category';
import Tag from './tag';

export default class Post {
  public title: string = '';
  public author: string = '';
  public slug: string = '';
  public date: string = '';
  public updated: string = '';
  public comments: boolean = true;
  public path: string = '';
  public excerpt: string|null = null;
  public keywords: string[]|null = null;
  public cover: string = '';
  public content: string = '';
  public text: string = '';
  public link: string = '';
  public raw: string = '';
  public photos: string[]|null = null;
  public categories: Category[] = [];
  public tags: Tag[] = [];

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    merge(this, pick(raw, Object.keys(this)));
  }
}
