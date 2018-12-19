export function renderDplayer(elem?: HTMLElement) {
  if (!elem) {
    throw new Error('No element provided to render.');
  }
  if (!window) {
    // ignore this when ssr
    return;
  }
  const elScripts = elem.querySelectorAll('.dplayer.hexo-tag-dplayer-mark script');
  if (!elScripts) {
    return;
  }
  for (const elScript of elScripts) {
    // tslint:disable:no-eval
    eval(elScript.innerHTML);
  }
  const dplayers = window.dplayers;
  if (!dplayers || dplayers.length < 1) {
    return;
  }
  Promise.all([
    import(/* webpackChunkName: "dplayer" */ 'dplayer'),
  ]).then(([dplayer]) => {
    const DPlayer = dplayer.default;
    for (const dplayerOtpts of dplayers) {
      const dp = new DPlayer(dplayerOtpts);
    }
  });
}
