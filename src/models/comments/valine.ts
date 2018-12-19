import merge from 'lodash.merge';

export default class Valine {
  public appId: string = '';
  public appKey: string = '';
  public placeholder?: string;
  public notify?: boolean;
  public verify?: boolean;
  public path?: string;
  public avatar?: ''|'mp'|'identicon'|'monsterid'|'wavatar'|'retro'|'robohash'|'hide';
  public pageSize?: number;
  public lang?: 'en'|'zh-cn';
  public visitor?: boolean;
  public highlight?: boolean;
  public avatarForce?: boolean;

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    this.validOptions(raw);
    merge(this, raw);
  }

  private validOptions(opts: any) {
    const hasKeys = Object.keys(opts);
    for (const requiredProp of ['appId', 'appKey']) {
      if (!hasKeys.includes(requiredProp)) {
        throw new Error(`[Valine] '${requiredProp}' is required!`);
      }
    }
  }
}
