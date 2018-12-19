import { VueConstructor } from 'vue';
import nprogress from 'nprogress';

declare module 'vue/types/vue' {
  interface Vue {
    $nprogress: NProgressStatic;
  }
}

const install = (Vue: VueConstructor) => {
  Vue.prototype.$nprogress = nprogress;
};

export default { install };
