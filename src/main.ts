import Vue from 'vue';
import App from './layouts/default.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import { FETCH_META, LOAD_GOOGLE_ANALYTICS } from './store/types';

// enhance app
import './enhanceApp';

// integrate i18n instance
import VueI18n from 'vue-i18n';
import { i18nOpts } from './enhancers/i18n';
const i18n = new VueI18n(i18nOpts);

const dev = !(process.env.NODE_ENV === 'production');
Vue.config.devtools = dev;
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
});

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

  // load global meta
  await store.dispatch(FETCH_META);

  // google analytics
  await store.dispatch(LOAD_GOOGLE_ANALYTICS, { router });

  // Fetch initial state
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.fetch || c.options && c.options.fetch).filter((_) => _);
  await Promise.all(asyncDataHooks.map((hook) => hook({ store, route: router.currentRoute })));

  // start!
  app.$mount('#app');
});
