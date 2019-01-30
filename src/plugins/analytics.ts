import { VueConstructor } from 'vue';
import { VueRouter } from 'vue-router/types/router';
import VueAnalytics from 'vue-analytics';

const install = (Vue: VueConstructor, { router, track_id }: { router: VueRouter, track_id: string }) => {
  Vue.use(VueAnalytics, {
    id: track_id,
    router,
  });
};

export default { install };
