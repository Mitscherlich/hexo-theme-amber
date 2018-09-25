import { VueConstructor } from 'vue';
import BootstrapVue from 'bootstrap-vue';

const install = (Vue: VueConstructor) => {
  Vue.use(BootstrapVue);
};

export default { install };
