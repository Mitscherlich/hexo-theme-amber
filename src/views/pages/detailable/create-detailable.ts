import { mapState } from 'vuex';
import { NavigationGuard } from 'vue-router';
import { IContext, RootState } from '@/store';
import { FETCH_DETAILABLE_TARGET } from '@/store/types';
import Detailable from '@/components/detailable/Detailable.vue';
import { CreateElement } from 'vue';

export function createDetailablePage(isImplicit: boolean) {
  return {
    beforeRouteUpdate: async function(this: any, to, _, next) {
      const { fetch } = this.$options;
      if (fetch) {
        try {
          this.$nprogress.start();
          await fetch({ store: this.$store, route: to });
          this.$nprogress.done();
        } catch (error) {
          next(error);
        }
      } else {
        next();
      }
    } as NavigationGuard,
    computed: {
      ...mapState({
        date_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.date_format,
        time_format: (state: RootState) => state.meta.hexoConfig.dateTimeFormat.time_format,
        target: (state: RootState) => state.detailable.target,
      }),
    },
    async fetch({ store, route }: IContext) {
      const sourceOrSlug = isImplicit ? route.path.replace(/^\/pages\/?/, '') : route.params.slug;
      await store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit, sourceOrSlug });
    },
    name: `${isImplicit ? 'implicit-' : ''}post`,
    render(this: any, h: CreateElement) {
      return h(Detailable, {
        props: {
          isImplicit,
          date_format: this.date_format,
          time_format: this.time_format,
          target: this.target,
        },
      });
    },
  };
}
