<template>
  <b-carousel
    class="mb-4"
    controls indicators
    :interval="interval"
    v-model="slide">
    <b-carousel-slide
      class="rounded"
      style="height: 20rem;"
      v-for="post in posts.take(5)"
      :key="`slide-item-${post.slug}`">
      <!-- posr cover image -->
      <div class="card post-cover" slot="img">
        <div class="post-cover-mask">
          <img
            v-if="post.cover !== null && post.cover.startsWith('/assets/')"
            :src="post.cover"
            :alt="post.slug" />
        </div>
      </div>
      <!-- post title -->
      <b-link class="text-light" :to="{ name: 'post-page', params: { slug: post.slug }}">
        <h3>{{ post.title }}</h3>
      </b-link>
    </b-carousel-slide>
  </b-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Post } from '@/models/post';

@Component
export default class Carousel extends Vue {
  @Prop({ default: 10 * 1000 })
  private interval?: number;

  @Prop({ default: [] })
  private posts?: Post[];

  private slide: number = 0;
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
