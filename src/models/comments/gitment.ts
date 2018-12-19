import merge from 'lodash.merge';
import pick from 'lodash.pick';

export default class Gitment {
  public repo: string = '';
  public owner: string = '';
  public oauth: { client_id: string; client_secret: string; } = {
    client_id: '',
    client_secret: '',
  };
  public title?: string;
  public link?: string;
  public desc?: string;
  public labels?: string[];
  public theme?: string;
  public perPage?: number;
  public maxCommentHeight?: number;

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    this.validOptions(raw);
    merge(this, raw);
  }

  private validOptions(opts: any) {
    const hasKeys = Object.keys(opts);
    for (const requiredProp of ['oauth', 'repo', 'owner']) {
      if (requiredProp === 'oauth') {
        const { client_id, client_secret } = pick(opts[requiredProp], 'client_id', 'client_secret');
        if (!client_id) {
          throw new Error('[Gitment] \'client_id\' is required!');
        }
        if (!client_secret) {
          throw new Error('[Gitment] \'client_secret\' is required!');
        }
      } else if (!hasKeys.includes(requiredProp)) {
        throw new Error(`[Gitment] '${requiredProp}' is required!`);
      }
    }
  }
}
