/* tslint:disable:max-classes-per-file */

import { GitalkConfig } from './comment/gitalk';

/* tslint:disable:variable-name */
/* tslint:disable:no-string-literal */

export class Theme {
  public menu: IMenuConfig[] = [];
  public menu_icon: boolean = false;
  public rss: boolean|string = false;
  public search: boolean = false;
  public search_max: number = 5;
  public sidebar: ISidebarItemConfig[] = [];
  public social: ISocialConfig[] = [];
  public social_icon: boolean = true;
  public leaf: string = '';
  public page_404: ThemeCustom404 = new ThemeCustom404();
  public gitalk: GitalkConfig = new GitalkConfig();
  public google_analytics: GoogleAnalytics = new GoogleAnalytics();
  public powered_by: ThemePoweredBy = new ThemePoweredBy();

  constructor(raw?: any) {
    const raw_theme = raw && raw[ 'theme_config' ];
    if (raw_theme) {
      this.menu = flattenNestedConfig(raw_theme.menu);
      this.menu_icon = raw_theme.menu_icon;
      this.rss = raw_theme.rss;
      this.search = raw_theme.search;
      this.search_max = raw_theme.search_max;
      this.social = flattenNestedConfig(raw_theme.social);
      this.social_icon = raw_theme.social_icon;
      this.leaf = raw_theme.leaf;
      this.page_404 = new ThemeCustom404(raw_theme.page_404);
      this.gitalk = new GitalkConfig(raw_theme.gitalk);
      this.google_analytics = new GoogleAnalytics(raw_theme.google_analytics);
      this.powered_by = new ThemePoweredBy(raw_theme.powered_by);
      normalizeSidebarConfig(raw_theme.sidebar).then((s: ISidebarItemConfig[]) => this.sidebar = s);
    }
  }
}

export class ThemeCustom404 {
  public enable: boolean = false;
  public source_path: string = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

export interface IMenuConfig {
  text: string;
  link: string;
  icon: string|null;
}

declare interface ISocialConfig {
  text: string;
  link: string;
  icon: string|null;
}

function flattenNestedConfig(raw?: any): IMenuConfig[]|ISocialConfig[] {
  let flatten: IMenuConfig[] = [];
  if (raw) {
    Object.keys(raw).forEach((key: string) => {
      const item = raw[ key ];
      if (typeof item === 'string') {
        flatten.push({ text: key, link: item, icon: null });
      } else if (Array.isArray(item)) {
        flatten = flatten.concat(flattenNestedConfig(item));
      } else {
        const { link, icon } = item;
        if (link) {
          flatten.push({ text: key, link, icon });
        } else {
          flatten.push({ text: key, link: '#', icon });
        }
      }
    });
  }
  return flatten;
}

export interface ISidebarItemConfig {
  component?: any;
  only: string;
  text: string;
  type?: string;
}

async function normalizeSidebarConfig(raw?: any): Promise<ISidebarItemConfig[]> {
  let normalized: ISidebarItemConfig[] = [];

  if (raw) {
    if (typeof raw === 'boolean') {
      normalized = [];
    } else if (raw.hasOwnProperty('enable')) {
      const { enable } = raw;
      if (!enable) {
        normalized = [];
      }
    } else {
      normalized = await resolveComponents();
    }
  }

  function resolveComponents(): Promise<ISidebarItemConfig[]> {
    let components: ISidebarItemConfig[] = [];
    return new Promise(async (resolve, reject) => {
      for (const type of [ 'fixed', 'sticky' ]) {
        const nested = raw[ type ];
        if (!nested || nested === null) {
          return resolve(components);
        }
        try {
          const flatten = await resolveNested(nested, type);
          components = components.concat(flatten);
        } catch (err) {
          return reject(err);
        }
      }
      return resolve(components);
    });
  }

  function resolveNested(nested?: any, type?: string): Promise<ISidebarItemConfig[]> {
    const flatten: ISidebarItemConfig[] = [];
    return new Promise(async (resolve) => {
      for (const key of Object.keys(nested)) {
        if (nested.hasOwnProperty(key)) {
          const item = nested[ key ];
          let text = key.toTitleCase();
          let only;
          let component;
          if (item === null) {
            component = (await import(`@/components/partials/widgets/${text}Card.vue`)).default;
          } else if (typeof item === 'boolean') {
            component = item ? (await import(`@/components/partials/widgets/${text}Card.vue`)).default : null;
          } else if (typeof item === 'string') {
            component = (await import(`@/components/partials/widgets/${(text = item)}Card.vue`)).default;
          } else if (typeof item === 'object') {
            if (item.hasOwnProperty('only')) {
              only = item.only;
            }
            component = (await import(`@/components/partials/widgets/${text}Card.vue`)).default;
          }
          flatten.push({ text, type, only, component });
        }
      }
      return resolve(flatten);
    });
  }

  return normalized;
}

export class GoogleAnalytics {
  public enable = false;
  public track_id = '';

  constructor(raw?: any) {
    if (raw) {
      this.enable = raw.enable;
      this.track_id = raw.track_id;
    }
  }
}

export class ThemePoweredBy {
  public text = '';
  public url = false;

  constructor(raw?: any) {
    if (raw) {
      if (typeof raw === 'string') {
        this.text = raw;
        this.url = false;
      } else if (typeof raw === 'boolean') {
        this.text = '';
        this.url = raw;
      } else {
        this.text = raw.text;
        this.url = raw.url;
      }
    }
  }
}
