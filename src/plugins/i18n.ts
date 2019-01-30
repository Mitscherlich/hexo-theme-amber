import { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';

export const i18nOpts = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': require('@/locales/en.json'),
    'zh-CN': require('@/locales/zh-CN.json'),
    'zh-TW': require('@/locales/zh-TW.json'),
  },
};

const install = (Vue: VueConstructor) => {
  Vue.use(VueI18n);
};

export default { install };
