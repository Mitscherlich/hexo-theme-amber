<template lang="pug">
  .slider: transition(name="fade", mode="out-in")
    .overloay(v-if="!ready")
      loading.loading(type="grid", variant="light")
    b-carousel(v-else, controls, indicators,
              :interval="interval",
              v-model="slide")
      b-carousel-slide.slide(v-for="{ cover, slug, title } in recommends", :key="`slide-${slug}`")
        b-card.cover(no-body, slot="img"): .mask: b-img(v-if="shouldShowCover(cover)", :src="cover")
        b-link.text-light(:to="{ name: 'article', params: { slug } }"): h3 {{ title }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { fetchPosts } from '@/api/hexo';
import Post from '@/models/post';

@Component({ name: 'Carousel' })
export default class Carousel extends Vue {
  private ready: boolean = false;
  private recommends: Post[] = [];

  @Prop({ type: Number, default: 10 * 1000 })
  private interval?: number;

  private slide: number = 0;

  private shouldShowCover(path?: string|null): boolean {
    return !(
      !path ||
      !path.startsWith('/') &&
      !path.startsWith('http')
    );
  }

  private async fetchRecommendPosts() {
    const { data } = await fetchPosts(1);
    this.recommends = data.data.slice(0, 5);
  }

  private async mounted() {
    await this.fetchRecommendPosts();
    this.ready = true;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/style/utils/mixins"

.slider
  background #1d2124
  border-radius .25rem
  margin-bottom 1.25rem
.overloay
  height 20rem
  center()
  .loading
    position relative
.slide
  border-radius .25rem
  height 20rem
  .cover
    width inherit
    height inherit
    background #1d2124
    .mask
      width inherit
      height inherit
      box-shadow inset 0 0 5rem rgba(0, 0, 0, .5)
      transition all .5s
      opacity 0.4
      filter blur(3px)
      overflow hidden
      text-align center
      &:hover
        opacity 0.6
        filter blur(1px)
      img
        position relative
        top 50%
        left 50%
        min-width 100%
        min-height 100%
        transform translate(-50%, -50%)
</style>
