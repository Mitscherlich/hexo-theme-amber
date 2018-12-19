<template lang="pug">
  .mb-3
    .blog-article
      h2.article-title
        span {{ context.title || $t('untitled') }}
      small.article-meta.text-muted
        span.mr-1
          fa-icon.mr-1(icon="calendar")
          | {{ context.date | date(format) }}
        span.mr-1
          fa-icon.mr-1(icon="user-edit")
          | {{ context.author || site.author }}
        span.mr-1
          b-btn.text-muted.mb-1(size="sm", variant="light", :to="{ name: 'related', query: { categroies: [lastCategory] } }", v-if="lastCategory.length")
            fa-icon.mr-1(icon="bookmark")
            | {{ lastCategory }}
        span.mr-1
          b-btn.text-muted.mb-1.mr-1(size="sm", variant="light", v-for="{ name, slug } of context.tags", :key="`tag-${slug}`", :to="{ name: 'related', query: { tag: name } }")
            fa-icon.mr-1(icon="tag")
            | {{ name }}
      article.markdown-body.my-4(ref="content", v-html="context.content")
      Comments.mb-4(:comments="context.comments")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { mapState } from 'vuex';
import { Route } from 'vue-router';
import { IRootState, IContext } from '@/store';
import { FETCH_DETAILABLE_TARGET } from '@/store/types';
import { renderMathInElement } from '@/common/js/katex';
import { renderDplayer } from '@/common/js/dplayer';
import Article from '@/models/article';
import Page from '@/models/page';
import Comments from '@/components/partials/Comments.vue';

@Component({
  name: 'Article',
  components: { Comments },
})
export default class Content extends Vue {
  private get format() {
    return this.$store.state.site.format!.date_format || 'll';
  }

  private get context() {
    return this.$store.state.detailable.target || {};
  }

  private get lastCategory() {
    if (this.context instanceof Article) {
      const length = this.context.categories && this.context.categories.length;
      return length ? this.context.categories[length - 1].slug : '';
    }
    return '';
  }

  @Watch('$route.params.slug')
  protected async onSourceOrSlugChanged(slug: string, old?: string) {
    if (!old || !slug || slug === old) {
      return;
    }
    this.$nprogress.start();
    await this.$store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit: false, sourceOrSlug: slug });
    this.$nprogress.done();
  }

  protected async fetch({ store, route }: IContext) {
    const slug = route.params.slug;
    await store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit: false, sourceOrSlug: slug });
  }

  private mounted() {
    const title = this.context!.title;
    if (!document) {
      // ignore this when ssr
      return;
    }
    document.title = `${title} | Amber`;
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
