import { VueConstructor } from 'vue';
import LayoutMixin from '@/mixins/layout.mixin';
import SiteMixin from '@/mixins/site.mixin';

const install = (Vue: VueConstructor) => {
  Vue.mixin(LayoutMixin);
  Vue.mixin(SiteMixin);
};

export default { install };
