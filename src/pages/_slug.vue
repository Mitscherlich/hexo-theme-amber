<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { IContext } from '@/store';
import { FETCH_DETAILABLE_TARGET } from '@/store/types';
import Content from './articles/_slug.vue';

@Component({ name: 'Page' })
export default class PageContent extends Content {
  protected async fetch({ store, route }: IContext) {
    const slug = route.params.slug;
    await store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit: true, sourceOrSlug: slug });
  }

  @Watch('$route.params.slug')
  protected async onSourceOrSlugChanged(slug: string, old?: string) {
    if (!old || !slug || slug === old) {
      return;
    }
    this.$nprogress.start();
    await this.$store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit: true, sourceOrSlug: slug });
    this.$nprogress.done();
  }
}
</script>
