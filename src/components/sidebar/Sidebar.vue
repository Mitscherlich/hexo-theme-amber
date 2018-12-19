<template lang="pug">
  transition(name="fade")
    aside.blog-sidebar.mb-3(v-if="ready")
      //- ads placeholder
      Leaf(:word="leaf")
      Elsewhere(:where="social")
      TagCloud(:tags="tags")

      .position-sticky.mb-3(style="top: 1.25rem;")
        Github(:name="user")
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { FETCH_TAGS } from '@/store/types';
import Elsewhere from './widgets/Elsewhere.vue';
import Leaf from './widgets/Leaf.vue';
import TagCloud from './widgets/TagCloud.vue';
import Github from './widgets/Github.vue';

@Component({
  name: 'Sidebar',
  components: { Elsewhere, Leaf, TagCloud, Github },
})
export default class Sidebar extends Vue {
  private get ready(): boolean {
    return (
      this.$store.state.tag.tags &&
      this.$store.state.tag.tags.length > 0
    );
  }

  private get leaf() {
    return this.themeConfig.sidebar!.leaf || '';
  }

  private get user() {
    return this.themeConfig.sidebar!.github || this.site.author;
  }

  private get social() {
    return this.themeConfig.social || {};
  }

  private get tags() {
    return this.$store.state.tag.tags || [];
  }

  private async beforeMount() {
    await this.$store.dispatch(`tag/${FETCH_TAGS}`);
  }
}
</script>
