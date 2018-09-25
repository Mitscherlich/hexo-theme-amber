import { Component, Vue } from 'vue-property-decorator';
import { IContext } from '@/store';
import { SHOULD_PAGINATION, FETCH_HOME_POSTS_LIST } from '@/store/types';
import ArticleGroup from '@/components/ArticleGroup.vue';
import Pagination from '@/components/partials/Pagination.vue';

declare const window: Window;

@Component({
  components: { ArticleGroup, Pagination },
})
export default class HomePage extends Vue {
  private get format() {
    return this.$store.state.meta.hexoConfig.dateTimeFormat.date_format;
  }

  private get page() {
    return this.$store.state.home.page;
  }

  private get pagination() {
    const { pageCount, pageSize, total } = this.$store.state.home.postsList;
    return { pageCount, pageSize, total };
  }

  private get posts() {
    return this.$store.state.home.postsList.data;
  }

  private get shouldPage() {
    return this.$store.getters[ `meta/${SHOULD_PAGINATION}` ] && this.pagination.pageCount > 1;
  }

  private async fetch({ store }: IContext) {
    const prePage = store.state.home.page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`home/${FETCH_HOME_POSTS_LIST}`, { page: 1 });
    }
  }

  private async onPage(page: number) {
    if (this.page === page) {
      return;
    }
    this.$nprogress.start();
    await this.$store.dispatch(`home/${FETCH_HOME_POSTS_LIST}`, { page });
    if (window) {
      window.scrollTo(0, 0);
    }
    this.$nprogress.done();
  }
}
