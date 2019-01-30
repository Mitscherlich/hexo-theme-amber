import Vue from 'vue';
import Components from 'vue-class-component';

// use bootstrap-vue
import Bootstrap from './plugins/bootstrap';
Vue.use(Bootstrap);

// use vue-i18n
import I18n from './plugins/i18n';
Vue.use(I18n);

// use vue-font-awesome
import FontAwesome from './plugins/font-awesome';
Vue.use(FontAwesome);

// use vue-loading
import Loading from './plugins/loading';
Vue.use(Loading);

// use global mixins
import mixins from './plugins/mixins';
Vue.use(mixins);

// use dayjs
import date from './plugins/date';
Vue.use(date);

// use markdown-it
import markdown from './plugins/markdown';
Vue.use(markdown);

// use nprogress
import nprogress from './plugins/nprogress';
Vue.use(nprogress);

// register hooks
Components.registerHooks([
  'fetch',
]);
