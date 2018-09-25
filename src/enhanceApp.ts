import Vue from 'vue';
import Components from 'vue-class-component';
import Bootstrap from './enhancer/bootstrap';
import I18n, { messages } from './enhancer/i18n';
import Icon from './enhancer/icon';
import Markdown from './enhancer/markdown';
import Mixins from './enhancer/mixins';
import Moment from './enhancer/moment';
import NProgress from './enhancer/nprogress';
import Utils from './enhancer/utils';


// use bootstrap-vue
Vue.use(Bootstrap);
// use vue-i18n
Vue.use(I18n);
// use font-awesome
Vue.use(Icon);
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
