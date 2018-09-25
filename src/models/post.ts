/* tslint:disable:max-classes-per-file */

export class Category {
  public name: string = '';
  public slug: string = '';
  public path: string = '';
  public count: number = 0;
  public parent: string = '';

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }

      if (!(raw instanceof Category)) {
        const splitted = this.slug.split('/');
        this.parent = splitted.filter((v, i, a) => i !== a.length - 1).join('/');
      }
    }
  }
}

export class Tag {
  public name: string = '';
  public slug: string = '';
  public path: string = '';
  public count: number = 0;

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

export class Post {
  public title: string = '';
  public author: string = '';
  public slug: string = '';
  public date: string = '';
  public updated: string = '';
  public comments = false;
  public path: string = '';
  public excerpt?: string|null = null;
  public keywords?: string|null = null;
  public cover: string = '';
  public content?: string|null = null;
  public text: string = '';
  public link: string = '';
  public raw?: string|null = null;
  public photos: string[] = [];
  public categories: Category[] = [];
  public tags: Tag[] = [];

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'categories') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Category(one)) });
          } else if (key === 'tags') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Tag(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }
        }
      }
    }
  }
}

export class PostsList {
  public data: Post[] = [];
  public pageCount: number = 0;
  public pageSize: number = 0;
  public total: number = 0;

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'categories') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Category(one)) });
          } else if (key === 'tags') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Tag(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }
        }
      }
    }
  }
}

export class SpecificPostsList {
  public name: string = '';
  public postlist: Post[] = [];

  constructor(raw?: any) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          if (key === 'postlist') {
            Object.assign(this, { [ key ]: raw[ key ].map((one: any) => new Post(one)) });
          } else {
            Object.assign(this, { [ key ]: raw[ key ] });
          }
        }
      }
    }
  }
}
