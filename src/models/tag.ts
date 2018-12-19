import pick from 'lodash.pick';
import merge from 'lodash.merge';

export default class Tag {
  public name: string = '';
  public slug: string = '';
  public path: string = '';
  public count: number = 0;

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    merge(this, pick(raw, Object.keys(this)));
  }
}
