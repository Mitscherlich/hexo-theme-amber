import { VueConstructor } from 'vue';
import date from 'dayjs';

declare module 'vue/types/vue' {
  interface Vue {
    $moment: date.Dayjs;
  }
}

const install = (Vue: VueConstructor) => {
  Vue.prototype.$moment = date;

  Vue.filter('date', (val: string, fmt: string) => {
    if (!val.length) {
      return '';
    }
    return date(new Date(val)).format(fmt);
  });
};

export default { install };
