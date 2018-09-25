export const addFavorite = (url: string, title: string, cb: (msg: string) => void) => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('360se') > -1) {
    cb('360se_failed_msg');
  } else if (ua.indexOf('msie 8') > -1) {
    window.external.AddToFavoritesBar(url, title);  // IE8
  } else if (document.all) {
    try {
      window.external.addFavorite(url, title);
    } catch (e) {
      // console.error(e);
      cb('add_favorite_failed_msg');
    }
  } else if (window.sidebar) {
    window.sidebar.addPanel(title, url, '');
  } else {
    cb('add_favorite_failed_msg');
  }
};
