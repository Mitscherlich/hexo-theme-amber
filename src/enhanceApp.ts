import Vue from 'vue';
import Components from 'vue-class-component';
import Bootstrap from './enhancers/bootstrap';
import I18n from './enhancers/i18n';
import Script2 from './enhancers/script2';
import Markdown from './enhancers/markdown';
import Mixins from './enhancers/mixins';
import Moment from './enhancers/moment';
import NProgress from './enhancers/nprogress';
import Utils from './enhancers/utils';

// use bootstrap-vue
Vue.use(Bootstrap);
// use vue-i18n
Vue.use(I18n);
// use vue-script2
Vue.use(Script2);
// use markdown-it
Vue.use(Markdown);
// use custom mixins
Vue.use(Mixins);
// use moment.js
Vue.use(Moment);
// use nprogress
Vue.use(NProgress);
// use custom utils
Vue.use(Utils);

// register hooks
Components.registerHooks([
  'fetch',
]);
