import { Component, Vue } from 'vue-property-decorator';
import { IContext } from '@/store';
import { SHOULD_PAGINATION, FETCH_ARCHIVES_POSTS_LIST, TIME_LINE_LIST } from '@/store/types';
import Pagination from '@/components/partials/Pagination.vue';

@Component({
  components: { Pagination },
})
export default class ArchivesPage extends Vue {
  private get format(): string {
    return this.$store.state.meta.hexoConfig.dateTimeFormat.date_format;
  }

  private get timeLines() {
    return this.$store.getters[`archives/${TIME_LINE_LIST}`];
  }

  private get page(): number {
    return this.$store.state.archives.page;
  }

  private get pagination(): { pageCount: number, pageSize: number, total: number } {
    const { pageCount, pageSize, total } = this.$store.state.archives.postsList;
    return { pageCount, pageSize, total };
  }

  private get shouldPage() {
    return (this.$store.getters[`meta/${SHOULD_PAGINATION}`]) && this.pagination.pageCount > 1;
  }


  private async fetch({ store }: IContext) {
    const prePage = store.state.archives.page;
    // avoid double fetch initial data
    if (prePage !== 1) {
      await store.dispatch(`archives/${FETCH_ARCHIVES_POSTS_LIST}`, { page: 1 });
    }
  }

  private async onPage(page: number) {
    this.$nprogress.start();
    await this.$store.dispatch(`archives/${FETCH_ARCHIVES_POSTS_LIST}`, { page });
    if (window) {
      window.scrollTo(0, 0);
    }
    this.$nprogress.done();
  }
}
