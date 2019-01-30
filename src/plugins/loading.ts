import { VueConstructor } from 'vue';
import VueLoading from '@/packages/vue-loading/src/components/Loading.vue';

const install = (Vue: VueConstructor) => {
  Vue.component('loading', VueLoading);
};

export default { install };
