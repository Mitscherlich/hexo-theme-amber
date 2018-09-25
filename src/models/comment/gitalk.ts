/* tslint:disable:variable-name */

export class GitalkConfig {
  public enable: boolean = false;
  public client_id: string = '';
  public client_secret: string = '';
  public owner: string = '';
  public admin: string[] = [''];
  public github_id: string = '';
  public repo: string = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [key]: raw[key] });
        }
      }
    }
  }
}
