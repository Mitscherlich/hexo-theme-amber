import pick from 'lodash.pick';
import merge from 'lodash.merge';
import IDetailable from './detailable';
import Post from './post';

export default class Article extends Post implements IDetailable {
  public covers: string = '';
  public content: string = '';
  public excerpt: string = '';

  constructor(raw?: any) {
    super(raw);
    if (!raw) {
      return;
    }
    merge(this, pick(raw, Object.keys(this)));
  }
}
