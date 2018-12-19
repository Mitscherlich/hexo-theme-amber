import pick from 'lodash.pick';
import merge from 'lodash.merge';
import IDetailable from './detailable';

export default class Page implements IDetailable {
  public title = '';
  public date = '';
  public updated = '';
  public comments = false;
  public path = '';
  public covers = '';
  public excerpt = '';
  public content = '';

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    merge(this, pick(raw, Object.keys(this)));
  }
}
