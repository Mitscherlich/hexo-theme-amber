import Vue from 'vue';
import Components from 'vue-class-component';

// use bootstrap-vue
import Bootstrap from './enhancers/bootstrap';
Vue.use(Bootstrap);

// use vue-i18n
import I18n from './enhancers/i18n';
Vue.use(I18n);

// use vue-font-awesome
import FontAwesome from './enhancers/font-awesome';
Vue.use(FontAwesome);

// use global mixins
import mixins from './enhancers/mixins';
Vue.use(mixins);

// use dayjs
import date from './enhancers/date';
Vue.use(date);

// use markdown-it
import markdown from './enhancers/markdown';
Vue.use(markdown);

// use nprogress
import nprogress from './enhancers/nprogress';
Vue.use(nprogress);

// register hooks
Components.registerHooks([
  'fetch',
]);
