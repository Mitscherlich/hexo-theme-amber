import { VueConstructor } from 'vue';
import VueScript2 from 'vue-script2';

const install = (Vue: VueConstructor) => {
  Vue.use(VueScript2);
};

export default { install };
