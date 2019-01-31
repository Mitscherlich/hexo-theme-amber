<template lang="pug">
  transition(name="fade")
    aside.mb-3(v-if="ready")
      //- ads placeholder
      Leaf(:word="leaf", v-if="shouldShowLeaf")
      Elsewhere(:where="social", v-if="shouldShowElsewhere")
      TagCloud(:tags="tags", v-if="shouldShowTagCloud")
      .position-sticky
        Github(:name="user", v-if="shouldShowGithub")
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
    return this.themeConfig.sidebar!.github || this.site.author || '';
  }

  private get social() {
    return this.themeConfig.social || {};
  }

  private get tags() {
    return this.$store.state.tag.tags || [];
  }

  private get shouldShowLeaf() {
    return !(
      !this.leaf ||
      this.leaf.length < 1
    );
  }

  private get shouldShowElsewhere() {
    return !(
      Object.is(this.social, {}) ||
      !(this.social as any).websites ||
      (this.social as any).websites.length < 1
    );
  }

  private get shouldShowTagCloud() {
    return !(
      !this.tags ||
      this.tags.length < 1
    );
  }

  private get shouldShowGithub() {
    return !(
      !this.user ||
      this.user.length < 1
    );
  }

  private async beforeMount() {
    await this.$store.dispatch(`tag/${FETCH_TAGS}`);
  }
}
</script>

<style lang="stylus" scoped>
.position-sticky
  margin-bottom 1rem
  top 1.25rem
</style>
