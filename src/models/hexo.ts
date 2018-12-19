import pick from 'lodash.pick';
import merge from 'lodash.merge';

export default class HexoConfig {
  public title: string = '';
  public subtitle: string = '';
  public description: string = '';
  public author: string = '';
  public language: 'en'|'jp'|'cn'|'tw' = 'en';
  public format?: { date_format: string; time_format: string; };
  public pagination?: { per_page: number; };

  constructor(raw?: any) {
    if (!raw) {
      return;
    }
    const site = pick(raw, 'title', 'subtitle', 'description', 'author', 'language');
    const format = pick(raw, 'date_format', 'time_format');
    const pagination = pick(raw, 'per_page');
    merge(this, site, { format, pagination });
  }
}
