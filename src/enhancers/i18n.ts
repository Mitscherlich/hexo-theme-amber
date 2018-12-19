import { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';

export const i18nOpts = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('@/locales/en').default,
    jp: require('@/locales/jp').default,
    cn: require('@/locales/cn').default,
    tw: require('@/locales/tw').default,
  },
};

const install = (Vue: VueConstructor) => {
  Vue.use(VueI18n);
};

export default { install };
