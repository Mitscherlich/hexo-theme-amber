import { VueConstructor } from 'vue';
import RootMixin from '@/mixins/root.mixin';

const install = (Vue: VueConstructor) => {
  Vue.mixin(RootMixin);
};

export default { install };
