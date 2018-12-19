import merge from 'lodash.merge';
import pick from 'lodash.pick';

import Gitalk from './gitalk';
import Gitment from './gitment';
import Valine from './valine';

export default class Comments {
  public enable: boolean = false;
  public engine?: 'gitalk'|'gitment'|'valine';
  public options?: Gitalk|Gitment|Valine;

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    const { enable, engine } = pick(raw, 'enable', 'engine');
    merge(this, { enable, engine });
    if (!enable) {
      return;
    }
    const opts = pick(raw, engine);
    switch (engine) {
      case 'gitalk': this.options = new Gitalk(opts[engine]); break;
      case 'gitment': this.options = new Gitment(opts[engine]); break;
      case 'valine': this.options = new Valine(opts[engine]); break;
      default: break;
    }
  }
}
