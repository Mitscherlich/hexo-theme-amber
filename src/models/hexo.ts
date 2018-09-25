// https://hexo.io/zh-cn/docs/configuration.html

/* tslint:disable:max-classes-per-file */

export class HexoConfig {
  public site = new SiteConfig();
  public url = new UrlConfig();
  public directory = new Directory();
  public writing = new Writing();
  public categoriesAndTags = new CategoryAndTags();
  public dateTimeFormat = new DateTimeFormat();
  public page = new Pagination();
  public extensions = new Extensions();

  constructor(raw?: any) {
    this.site = new SiteConfig(raw);
    this.url = new UrlConfig(raw);
    this.directory = new Directory(raw);
    this.writing = new Writing(raw);
    this.categoriesAndTags = new CategoryAndTags(raw);
    this.dateTimeFormat = new DateTimeFormat(raw);
    this.page = new Pagination(raw);
    this.extensions = new Extensions(raw);
  }
}

export class SiteConfig {
  public title = '';        // site title
  public subtitle = '';     // site subtitle
  public description = '';  // site decription
  public author = '';       // site author
  public language = '';     // site language
  public timezone = '';     // site timezone. Hexo use your PC's by default.
                            // like: America/New_York, Japan, UTC

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

/* tslint:disable:variable-name */

export class UrlConfig {
  public url = '';    // site url
  public root = '/';  // site root
  public permalink = ':year/:month/:day/:title/'; // post permalink format
  public permalink_defaults = ''; // the default for each part of the permalink

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

export class Directory {
  public source_dir = 'sources';      // source directory. for posts and data
  public public_dir = 'public';       // public directory. for output files
  public tag_dir = 'tags';            // tag directory
  public archive_dir = 'archives';    // archive directory
  public category_dir = 'categories'; // category directory
  public code_dir = 'downloads/code'; // `Include code` directory
  public i18n_dir = ':lang';          // internationalize (i18n) directory
  public skip_render = '' ;           // directory for skip render. support `glob`

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

export class Writing {
  public new_post_name = ':title.md';
  public default_layout = 'post';
  public titlecase = false;         // convert title to title case
  public filename_case = 0;         // convert file name to lower case (1) or upper case (2)
  public external_link = true;      // open links in new page
  public render_drafts = false;     // show drafts
  public post_asset_directory = false; // use asset directory
  public relative_link = false;     // use relative url
  public future = true;             // show posts in the future
  public highlight = {
    enable: true,
    line_number: false,
    auto_detect: false,
    tab_replace: '',
  };

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

export class CategoryAndTags {
  public default_category = ''; // default category
  public category_map = '';     // category aliases
  public tag_map = '';          // tag aliases

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

export class DateTimeFormat {
  public date_format = 'YYYY-MM-DD';  // date format  YYYY-MM-DD
  public time_format = 'H:mm:ss';     // time format  H:mm:ss

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

export class Pagination {
  public per_page = 0;        // post per page (0 = disabled pagination)
  public pagination_dir = ''; // pagination directory

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

export class Extensions {
  public theme = false; // current theme name. (false = disabled theme)
  public deploy = {};   // deployment setting

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
