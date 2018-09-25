<template>
  <section
    v-if="showTags"
    class="card mb-3"
    :class="[isHome()?'p-3 border-0':null]">
    <h4 :class="[isHome()?'font-italic':'card-header']">{{ $t('tagcloud') }}</h4>
    <tag-cloud
      :tags="tags"
      @tap="(tag) => $router.push({
        name: 'related-posts-page',
        params: { type: 'tag', slug: tag.slug }
      })" />
  </section>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { FETCH_TAGS } from '@/store/types';
import { Tag } from '@/models/post';
import { IContext } from '@/store';
import TagCloud from '@/base/widgets/TagCloud.vue';

@Component({
  components: { TagCloud },
})
export default class TagCloudCard extends Vue {
  private get showTags(): boolean {
    return (
      this.tags &&
      this.tags.length > 0
    );
  }

  private get tags(): Tag[] {
    return this.$state.tags.tags || [];
  }

  private async mounted() {
    await this.$store.dispatch(`tags/${FETCH_TAGS}`);
  }
}
</script>
