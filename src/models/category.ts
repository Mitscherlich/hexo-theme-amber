import pick from 'lodash.pick';
import merge from 'lodash.merge';

export default class Category {
  public name: string = '';
  public slug: string = '';
  public path: string = '';
  public count: number = 0;
  public parent: string = '';

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    merge(this, pick(raw, Object.keys(this)));
  }
}
