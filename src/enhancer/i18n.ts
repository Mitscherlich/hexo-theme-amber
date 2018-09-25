import { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';

// require i18n messages
export const messages = {
  zh_cn: require('./languages/zh_cn.json'),
  en_us: require('./languages/en_us.json'),
};

const install = (Vue: VueConstructor) => {
  Vue.use(VueI18n);
};

export default { install };
