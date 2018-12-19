<template lang="pug">
  header.container
    .blog-header.py-3
      b-row.flex-nowrap.justify-content-between.align-items-center
        b-col.header-action.d-md-none.d-lg-none
          transition(name="fade", mode="out-in")
            b-btn.mr-2(variant="light", v-show="!isHome()", @click="$router.go(-1)")
              fa-icon(icon="angle-left")
        b-col.header-breadcurmb.pt-1.d-none.d-md-block.d-lg-block
          a.text-muted.cursor-pointer.mr-2(v-if="themeConfig.rss.enable", :href="themeConfig.rss.path", target="_blank")
            fa-icon.mr-2(icon="rss")
            | {{ $t('subscribe') }}
        b-col.text-center(cols=4)
          a.blog-header-logo.text-dark(href="/") {{ site.title }}
        b-col.d-flex.justify-content-end.align-items-center(cols=4)
        //-   SearchBox(v-if="themeConfig.search.enable", :engine="themeConfig.search.engine", :max="themeConfig.search.max")

    Navbar.blog-navbar.py-1.my-2(:navs="themeConfig.menu")

    Carousel.blog-carousel(v-if="showCarousel" :posts="pinnedArticles")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Post from '@/models/post';
import Navbar from './Navbar.vue';
import Carousel from './Carousel.vue';
// import SearchBox from './SearchBox.vue';

@Component({
  name: 'Header',
  components: { Navbar, Carousel/* , SearchBox */ },
})
export default class Header extends Vue {
  private get showCarousel(): boolean {
    return (
      this.isHome() &&
      this.$store.state.home.posts &&
      this.$store.state.home.posts.data.length > 0
    );
  }

  private get pinnedArticles(): Post[] {
    if (!this.$store.state.home.posts || this.$store.state.home.posts.data.length < 1) {
      return [];
    }
    return this.$store.state.home.posts.data.slice(0, 5);
  }
}
</script>

<style lang="stylus" scoped>
.blog-header
  flex 1
  line-height 1
  border-bottom 1px solid #e5e5e5
  .blog-header-logo
    font-family "Playfair Display", Georgia, "Times New Roman", serif
    font-size 2.25rem
    &:hover
      text-decoration none
</style>

