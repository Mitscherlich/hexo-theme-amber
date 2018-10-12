declare interface String {
  toTitleCase: () => string;
}

declare interface Array<T> {
  take: (n: number) => T[];
}

declare interface Window {
  MathJax: any;
  Runner: any;
  adsbygoogle: any;
  loadTimeData: any;
  sidebar: any;
  tagcloud: (config?: any) => any;
}

declare interface External {
  // IE8
  AddToFavoritesBar(url?: string, title?: string): any;
  // else
  addFavorite(url?: string, title?: string): any;
}

declare module 'gitalk';
