import merge from 'lodash.merge';

export default class Gitalk {
  public clientID: string = '';
  public clientSecret: string = '';
  public repo: string = '';
  public owner: string = '';
  public admin: string[] = [];
  public labels?: string[];
  public title?: string;
  public body?: string;
  public language?: 'en'|'zh-CN'|'zh-TW';
  public perPage?: number;
  public distractionFreeMode?: boolean = false;
  public pagerDirection?: 'last'|'first';
  public createIssueManually?: boolean;
  public enableHotKey?: boolean;

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    this.validOptions(raw);
    merge(this, raw);
  }

  private validOptions(opts: any) {
    const hasKeys = Object.keys(opts);
    for (const requiredProp of ['clientID', 'clientSecret', 'repo', 'owner', 'admin']) {
      if (!hasKeys.includes(requiredProp)) {
        throw new Error(`[Gitalk] '${requiredProp}' is required!`);
      }
    }
  }
}
