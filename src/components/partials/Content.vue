<template lang="pug">
  .blog-post-content
    article.markdown-body(v-html="content", ref="content", :style="styleObject")
    .hide-article-box(v-if="shouldHideArticle"): b-link.text-center.font-italic(@click="showArticle()") &gt;&gt;&nbsp;{{ $t('read_more') }}&nbsp;&lt;&lt;
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { renderMathInElement } from '@/common/script/katex';
import { renderDplayer } from '@/common/script/dplayer';

@Component({ name: 'Content' })
export default class Content extends Vue {
  private shouldHideArticle: boolean = false;

  @Prop({ required: true, type: String })
  private content?: string;

  private get styleObject() {
    return this.shouldHideArticle ? {
      maxHeight: '80rem',
      overflow: 'hidden',
    } : null;
  }

  private showArticle() {
    if (this.shouldHideArticle) {
      this.shouldHideArticle = false;
    }
  }

  private hideArticle(element: HTMLElement) {
    const height = element.offsetHeight;
    if (height >= 1280) {
      this.shouldHideArticle = true;
    }
  }

  private mounted() {
    this.hideArticle(this.$refs.content as HTMLElement),
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  private updated() {
    const elContent = this.$refs.content;
    this.$nextTick(() => Promise.all([
      renderMathInElement(elContent as HTMLElement),
      renderDplayer(elContent as HTMLElement),
    ]));
  }
}
</script>

<style src="github-markdown-css/github-markdown.css"></style>
<style src="katex/dist/katex.min.css"></style>
<style src="dplayer/dist/DPlayer.min.css"></style>
<style lang="stylus" scoped>
@import "~@/common/style/utils/mixins"

.blog-post-content
  position relative
  .hide-article-box
    position relative
    padding-top 10rem
    margin-top -10rem
    z-index 999
    background-image linear-gradient(-180deg, rgba(255,255,255,0) 0%, #fff 70%)
    center()
  .markdown-body
    line-height 1.68
</style>
