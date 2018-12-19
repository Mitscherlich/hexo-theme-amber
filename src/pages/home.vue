<template lang="pug">
  .blog-home
    h3.pb-3.mb-4.font-italic.border-bottom
      transition(name="fade")
        b-btn.mr-2(variant="light" v-show="page !== 1" @click="onPage(1)")
          fa-icon(icon="angle-left").mr-2
      span.align-middle EL PSY CONGROO
    transition(name="fade", mode="out-in")
      Gallery.blog-archives(v-if="posts.length", :posts="posts", :format="format")
      b-alert(v-else variant="info") {{ $t('no_posts') }}
    Pagination(v-if="shouldPagination", :total="pagination.total", :page-size="pagination.pageSize", :current-page="page", @current-change="onPage")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IContext } from '@/store';
import { FETCH_HOME_POSTS_LIST, SHOULD_PAGINATION } from '@/store/types';
import Gallery from '@/components/partials/Gallery.vue';
import Pagination from '@/components/partials/Pagination.vue';

@Component({
  name: 'Home',
  components: { Gallery, Pagination },
})
export default class Home extends Vue {
  private get format() {
    return this.site.format!.date_format;
  }

  private get page() {
    // if (this.$route.query && this.$route.query.page) {
    //   let page = 0;
    //   if (this.$route.query.page.length) {
    //     const length = this.$route.query.page.length;
    //     page = parseInt(this.$route.query.page[length - 1], 10);
    //   } else {
    //     page = parseInt(this.$route.query.page as string, 10);
    //   }
    //   this.$store.dispatch(`home/${FETCH_HOME_POSTS_LIST}`, { page });
    // }
    return this.$store.state.home.page;
  }

  private get pagination() {
    const { pageCount, pageSize, total } = this.$store.state.home.posts;
    return { pageCount, pageSize, total };
  }

  private get posts() {
    return this.$store.state.home.posts.data || [];
  }

  private get shouldPagination() {
    return this.$store.getters[SHOULD_PAGINATION] && this.pagination.pageCount > 1;
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
</script>
