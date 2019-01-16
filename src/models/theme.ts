import pick from 'lodash.pick';
import merge from 'lodash.merge';

import Comments from './comments';

export default class ThemeConfig {
  public comments: Comments = new Comments();
  public menu?: Array<{ text: string; link: string }>;
  public rss?: { enable: boolean; path?: string };
  public search?: { enable: boolean; engine?: 'build-in'|string; max?: number; };
  public sidebar?: { leaf?: string; github?: string; };
  public social?: {
    website: Array<{ text: string; link: string; }>;
    [key: string]: string|Array<{ text: string; link: string; }>;
  };
  public poweredBy?: { author: string; repo: string; };
  public ga?: { enable: boolean; track_id: string; };

  constructor(raw?: any) {
    // tslint:disable:no-string-literal
    const themeConfig = raw && raw['theme_config'];
    if (!themeConfig) {
      return;
    }
    const { comments } = pick(themeConfig, 'comments');
    const commentsOpts = new Comments(comments);
    const { menu } = pick(themeConfig, 'menu');
    const flattenMenu = this.flattenMenu(menu);
    const { rss } = pick(themeConfig, 'rss');
    const { search } = pick(themeConfig, 'search');
    const { sidebar } = pick(themeConfig, 'sidebar');
    const { social } = pick(themeConfig, 'social');
    const { powered_by } = pick(themeConfig, 'powered_by');
    const { google_analytics } = pick(themeConfig, 'google_analytics');
    merge(this, { menu: flattenMenu }, { rss, search, sidebar, social }, {
      comments: commentsOpts,
      poweredBy: powered_by,
      ga: google_analytics,
    });
  }

  private flattenMenu(raw?: any) {
    const menu = [];
    if (!raw) {
      return [];
    }
    for (const key of Object.keys(raw)) {
      const item = raw[key];
      if (typeof item === 'string') {
        menu.push({ text: key, link: item });
      } else if (Array.isArray(item)) {
        menu.concat(item);
      }
    }
    return menu;
  }
}
