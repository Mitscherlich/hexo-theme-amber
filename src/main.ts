import Vue from 'vue';
import Layout from './views/Layout.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// enhance app
import './enhanceApp';

// import i18n messages
import { messages } from './enhancers/i18n';

// vue-i18n instance must be initialized after `VueI18n` is loaded
// eslint-disable-next-line
import VueI18n from 'vue-i18n';

// use fallback locale as `Simplified Chinese`
// if you want to specific you language to display,
// make sure you have configure site/theme language
// properly. See this page below for more information:
// [https://github.com/Mitscherlich/mitscherlich.github.io/blob/master/theme/amber/README.md#setup-locale]
const i18n = new VueI18n({
  locale: 'zh_cn',
  fallbackLocale: 'zh_cn',
  messages,
});

Vue.config.productionTip = false;

const app = new Vue({
  i18n,
  router,
  store,
  render: (h) => h(Layout),
});

declare const window: Window;

import { FETCH_META, LOAD_GOOGLE_ANALYTICS } from '@/store/types';

router.onReady(async () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = (prevMatched[index] !== component));
    });

    if (!activated.length) {
      return next();
    }

    try {
      app.$nprogress.start();
      const hooks = activated.map((c: any) => c.fetch || c.options && c.options.fetch).filter((_) => _);
      await Promise.all(hooks.map((hook) => hook({ store, route: to })));
      if (window) {
        window.scrollTo(0, 0);
      }
      app.$nprogress.done();
      next();
    } catch (error) {
      app.$nprogress.done(true);
      next(error);
    }
  });

  // base global meta
  await store.dispatch(`meta/${FETCH_META}`);

  // google analytics
  await store.dispatch(`meta/${LOAD_GOOGLE_ANALYTICS}`, { router });

  // Fetch initial state
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.fetch || c.options && c.options.fetch).filter((_) => _);
  await Promise.all(asyncDataHooks.map((hook) => hook({ store, route: router.currentRoute })));

  // start!
  app.$mount('#app');
});
