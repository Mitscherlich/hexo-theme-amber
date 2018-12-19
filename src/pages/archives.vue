<template lang="pug">
  b-container.blog-archives
    b-row
      b-col
        b-alert(:show="timeLines.keys.length < 1", variant="prtimary") {{ $t('no_articles') }}
        b-card.border-0.p-3.mb-3(no-body, :key="key", v-for="key of timeLines.keys")
          h4.text-dark
            fa-icon.mr-2(icon="clock")
            | {{ key | date('MMM. YYYY') }}
          ul.timeline
            li.cursor-pointer(:key="slug", v-for="{ date, slug, link, title, text } of timeLines.entities[key]", @click="$router.push({ name: 'article', params: { slug } })")
              b-link(:to="{ name: 'article', params: { slug } }") {{ title }}
              b-link.float-right {{ date | date(format) }}
              p #[small.text-muted {{ text }}]
        Pagination(align="center", v-if="shouldPage", :total="pagination.total", :page-size="pagination.pageSize", :current-page="page", @current-change="onPage")
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { TIME_LINE_LIST, FETCH_ARCHIVES_POSTS_LIST, SHOULD_PAGINATION } from '@/store/types';
import { IContext } from '@/store';
import Pagination from '@/components/partials/Pagination.vue';
import day from 'dayjs';

@Component({
  name: 'Archives',
  components: { Pagination },
})
export default class Archives extends Vue {
  private get format(): string {
    return this.site.format!.date_format;
  }

  private get timeLines() {
    return this.$store.getters[`archive/${TIME_LINE_LIST}`];
  }

  private get page(): number {
    return this.$store.state.archive.page;
  }

  private get pagination(): { pageCount: number, pageSize: number, total: number } {
    const { pageCount, pageSize, total } = this.$store.state.archive.posts;
    return { pageCount, pageSize, total };
  }

  private get shouldPage() {
    return (
      this.$store.getters[SHOULD_PAGINATION] &&
      this.pagination.pageCount > 1
    );
  }

  private async fetch({ store }: IContext) {
    const prePage = store.state.archive.page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`archive/${FETCH_ARCHIVES_POSTS_LIST}`, { page: 1 });
    }
  }

  private async onPage(page: number) {
    this.$nprogress.start();
    await this.$store.dispatch(`archive/${FETCH_ARCHIVES_POSTS_LIST}`, { page });
    if (window) {
      window.scrollTo(0, 0);
    }
    this.$nprogress.done();
  }
}
</script>
