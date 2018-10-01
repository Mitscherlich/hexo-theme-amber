import { VueConstructor } from 'vue';
import moment from 'moment';

declare module 'vue/types/vue' {
  interface Vue {
    $moment: moment.Moment;
  }
}

const install = (Vue: VueConstructor) => {
  Vue.prototype.$moment = moment;

  Vue.filter('date', (val: string, fmt: string) => {
    if (!val.length) {
      return '';
    }

    return moment(new Date(val)).format(fmt);
  });
};

export default { install };
