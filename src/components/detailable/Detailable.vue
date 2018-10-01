<template>
  <main class="detailable-page mb-3">
    <div class="blog-post">
      <!-- title -->
      <h2>
        <a
          class="blog-post-title text-dark"
          v-if="!isImplicit && target.link && target.link.length">
          <span>{{ $t(target.title || 'untitled') }}</span>
          <i class="fas fa-link"></i>
        </a>
        <span v-else>{{ $t(target.title || 'untitled') }}</span>
      </h2>

      <!-- meta -->
      <small class="blog-post-meta">
        <!-- post date -->
        <span class="post-meta post-meta-date">
          <i class="fas fa-calendar"></i>
          {{ target.date | date('ll') }}
        </span>
        <!-- post author -->
        <span class="post-meta post-meta-author">
          <i class="fas fa-user-edit"></i>
          {{ target.author || $site.author }}
        </span>
        <!-- post category -->
        <span class="post-meta post-meta-author" v-if="lastCategory.length">
          <b-btn
            class="post-meta-tag text-muted mr-1 mb-1"
            size="sm" variant="light"
            @click="$router.push({ name: 'related-posts-page', params: { type: 'category', slug: lastCategory } })">
            <i class="fas fa-hashtag"></i>
            {{ lastCategory.toTitleCase() }}
          </b-btn>
        </span>
        <!-- post tags -->
        <span class="post-meta post-meta-tags">
          <b-btn
            class="post-meta-tag mr-1 text-muted"
            size="sm" variant="light"
            v-for="tag in target.tags"
            :key="`post-meta-tag-${tag.slug}`"
            @click="$router.push({ name: 'related-posts-page', params: { type: 'tag', slug: tag.slug } })">
            <i class="fas fa-tag"></i>
            {{ tag.name }}
          </b-btn>
        </span>
      </small>

      <!-- content -->
      <article class="blog-post-content mt-4" v-html="target.content" ref="blog-post-content"></article>

      <!-- comment -->
      <div class="comments" v-if="target.comments">
        <gitalk :isImplicit="isImplicit"
          :slugOrSource="isImplicit ? $route.path : `posts/${target.slug}`" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { renderMathJax } from '@/common/js/mathjax';
import { Article, Page } from '@/models/article';
import Gitalk from '@/base/comment/Gitalk.vue';

@Component({
  components: { Gitalk },
})
export default class Detailable extends Vue {
  @Prop({ required: true })
  /* tslint:disable:variable-name */
  private date_format?: string;

  @Prop({ required: true })
  private isImplicit?: boolean;

  @Prop({ required: true, validator: (obj: any) => obj instanceof Article || obj instanceof Page })
  private target?: Article|Page;

  @Prop({ required: true })
  /* tslint:disable:variable-name */
  private time_format?: string;

  private format: string = '';

  private lastCategory() {
    if (this.target instanceof Article) {
      const len = this.target.categories && this.target.categories.length;
      if (!len) {
        return '';
      } else {
        return this.target.categories[len - 1].slug;
      }
    }
    return '';
  }

  private mounted() {
    const title = this.target!.title;
    window.document.title = `${this.$t(title)} | ${this.$site.title}`;
    this.$nextTick(function() {
      renderMathJax(this.$refs['blog-post-content']);
    });
  }

  @Watch('target.title')
  private onPageTitleChanged(val: string) {
    if (val.length < 1) {
      return;
    }
    window.document.title = `${this.$t(val)} | ${this.$site.title}`;
  }
}
</script>
