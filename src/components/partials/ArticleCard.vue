<template>
  <b-card class="blog-post mb-5">
    <header slot="header">
      <b-link class="text-dark" :to="{ name: 'post-page', params: { slug: post.slug }}">
        <h4>{{ post.title }}</h4>
      </b-link>
      <small class="blog-post-meta text-muted">
        <!-- post date -->
        <span class="post-meta post-meta-date">
          <i class="fas fa-calendar"></i>
          {{ $moment(post.date).format(format) }}
        </span>
        <!-- post author -->
        <span class="post-meta post-meta-author">
          <i class="fas fa-user-edit"></i>
          {{ post.author || $site.author }}
        </span>
        <!-- post tags -->
        <span class="post-meta post-meta-tags">
          <b-btn
            class="post-meta-tag text-muted mr-1 mb-1"
            size="sm" variant="light"
            v-for="tag in post.tags"
            :key="`post-meta-tag-${tag.slug}`"
            @click="onTagTapped(tag)">
            <i class="fas fa-tag"></i>
            {{ tag.name }}
          </b-btn>
        </span>
      </small>
    </header>

    <article class="blog-post-content" ref="post-card-content" v-if="post.excerpt" v-html="post.excerpt"></article>
    <article class="blog-post-content" ref="post-card-content" v-else-if="post.content" v-html="post.content"></article>

    <em slot="footer">
      <b-link :to="{ name: 'post-page', params: { slug: post.slug }}">{{ $t('read_more') }}</b-link>
    </em>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { renderMathJax } from '@/common/js/mathjax';
import { Tag, Post } from '@/models/post';

@Component
export default class ArticleCard extends Vue {
  @Prop({ default: 'll' })
  private format?: string;

  @Prop({ required: true })
  private post?: Post;

  private onTagTapped(tag: Tag) {
    this.$router.push({
      name: 'related-posts-page',
      params: {
        type: 'tag',
        slug: tag.slug,
      },
    });
  }

  private mounted() {
    this.$nextTick(function() {
      renderMathJax(this.$refs['post-card-content']);
    });
  }
}
</script>

<style lang="stylus" scoped>
.post-meta
  margin-right .5rem

  .post-meta-tag
    &:hover
      background
</style>
