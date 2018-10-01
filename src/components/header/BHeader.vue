<template>
  <header class="container">
    <!-- .blog-header -->
    <div class="blog-header py-3">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="header-action col d-md-none d-lg-none">
          <transition name="fade" mode="out-in">
            <b-btn class="btn-back mr-2" variant="light" v-show="!isHome()" @click="$router.go(-1)">
              <i class="fas fa-angle-left"></i>
            </b-btn>
          </transition>
        </div>
        <div class="header-breadcurmb col pt-1 d-none d-md-block d-lg-block">
          <a v-if="$theme.rss !== false" class="text-muted cursor-pointer mr-2" :href="$theme.rss">
            <i class="fas fa-rss"></i>
            {{ $t('subscribe') }}
          </a>
        </div>
        <div class="col-4 text-center">
          <a class="blog-header-logo text-dark" href="/">{{ $site.title }}</a>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center">
          <search-box v-if="$theme.search !== false" />
        </div>
      </div>
    </div>

    <!-- .blog-navbar -->
    <navbar class="blog-navbar py-1 mb-2 mt-2" :navs="navigators" />

    <!-- .blog-carousel -->
    <carousel v-if="showCarousel" :posts="posts" />
  </header>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { fetchPostsList } from '@/api/hexo';
import { Post } from '@/models/post';
import { IContext } from '@/store';
import Carousel from './carousel/Carousel.vue';
import Navbar from './navbar/Navbar.vue';
import SearchBox from './SearchBox.vue';

@Component({
  components: { Carousel, Navbar, SearchBox },
})
export default class BHeader extends Vue {
  private get navigators() {
    return this.$theme.menu || [];
  }

  private get showCarousel() {
    return (
      this.isHome() &&
      this.posts &&
      this.posts.length
    );
  }

  private posts: Post[] = [];

  private async created() {
    const { data } = await fetchPostsList();
    this.posts = data.data;
  }
}
</script>
