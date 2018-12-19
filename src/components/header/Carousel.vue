<template lang="pug">
  b-carousel.mb-4(controls, indicators, :interval="interval", v-model="slide")
    b-carousel-slide.rounded(v-for="{ cover, slug, title } in posts", :key="`slide-${slug}`", style="height: 20rem;")
      b-card.post-cover(no-body, slot="img")
        .post-cover-mask
          b-img(v-if="shouldDisplayCover(cover)", :src="cover", :alt="slug")
      b-link.text-light(:to="{ name: 'article', params: { slug } }")
        h3 {{ title }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Post from '@/models/post';

@Component({ name: 'Carousel' })
export default class Carousel extends Vue {
  @Prop({ type: Number, default: 10 * 1000 })
  private interval?: number;

  @Prop({ default: [] })
  private posts?: Post[];

  private slide: number = 0;

  private shouldDisplayCover(path?: string|null): boolean {
    return !(
      !path ||
      !path.startsWith('/') &&
      !path.startsWith('http')
    );
  }
}
</script>

<style lang="stylus" scoped>
.post-cover
  width inherit
  height inherit
  background #1d2124
  .post-cover-mask
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
      // transform-origin 50% 50%
</style>
