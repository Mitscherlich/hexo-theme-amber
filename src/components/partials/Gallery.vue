<template lang="pug">
  .blog-home-gallery(ref="content")
    b-card.blog-post.mb-5(v-for="post in posts", :key="`blog-post-${post.slug}`", :post="post", :format="format")
      header(slot="header")
        b-link.text-dark(:to="{ name: 'article', params: { slug: post.slug } }")
          h4 {{ post.title }}
        small.text-muted
          span.mr-1
            fa-icon.mr-1(icon="calendar")
            | {{ post.date | date(format) }}
          span.mr-1
            fa-icon.mr-1(icon="user-edit")
            | {{ post.author || site.author }}
          span.mr-1
            b-btn.text-muted.mb-1.mr-1(size="sm", variant="light", v-for="{ name, slug } of post.tags", :key="`tag-${slug}`", :to="{ name: 'related', query: { tag: name } }")
              fa-icon.mr-1(icon="tag")
              | {{ name }}
      Content(:content="post.excerpt || post.content")
      em(slot="footer"): small
        b-link.text-muted(:to="{ name: 'article', params: { slug: post.slug }}") {{ $t('read_more') }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { renderMathInElement } from '@/common/script/katex';
import { renderDplayer } from '@/common/script/dplayer';
import Post from '@/models/post';
import Category from '@/models/category';
import Content from './Content.vue';

@Component({
  name: 'Gallery',
  components: { Content },
})
export default class Gallery extends Vue {
  @Prop({ type: String, default: 'll' })
  private format?: string;

  @Prop({ default: [] })
  private posts?: Post[];

  private mounted() {
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  private updated() {
    const elContent = this.$refs.content;
    this.$nextTick(() => {
      renderMathInElement(elContent as HTMLElement);
      renderDplayer(elContent as HTMLElement);
    });
  }
}
</script>

<style src="github-markdown-css/github-markdown.css"></style>
