<template>
  <div class="blog-home-article-group">
    <article-card
      v-for="post in posts"
      :key="`blog-post-${post.slug}`"
      :post="post"
      :format="format" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Post } from '@/models/post';
import ArticleCard from './partials/ArticleCard.vue';

@Component({
  components: { ArticleCard },
})
export default class ArticleGroup extends Vue {
  @Prop({ default: 'll' })
  private format?: string;

  @Prop({ default: [] })
  private posts?: Post[];
}
</script>
