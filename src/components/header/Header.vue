<template lang="pug">
  b-container(tag="header")
    .blog-header
      b-row.flex-nowrap.justify-content-between.align-items-center
        b-col.header-action.d-md-none.d-lg-none
          transition(name="fade", mode="out-in")
            b-btn.mr-2(v-show="!isHome()",
                      variant="light",
                      @click="$router.go(-1)")
              fa-icon(icon="angle-left")
        b-col.header-breadcurmb.d-md-block.d-lg-block
          a.text-muted.cursor-pointer.mr-2(v-if="themeConfig.rss.enable",
                                          :href="themeConfig.rss.path",
                                          target="_blank")
            fa-icon.mr-2(icon="rss")
            | {{ $t('subscribe') }}
        b-col.text-center(cols=4)
          a.blog-header-logo(href="/") {{ site.title }}
        b-col.d-flex.justify-content-end.align-items-center(cols=4)
        //-   SearchBox(v-if="themeConfig.search.enable", :engine="themeConfig.search.engine", :max="themeConfig.search.max")
    Navbar.blog-navbar(:navs="themeConfig.menu")
    Carousel.blog-carousel(v-if="showCarousel")
    Topic.blog-topic(v-if="shouldShowTopic", :topic="topic")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Post from '@/models/post';
import Navbar from './Navbar.vue';
import Carousel from './Carousel.vue';
// import SearchBox from './SearchBox.vue';
import Topic from './Topic.vue';

@Component({
  name: 'Header',
  components: { Navbar, Carousel, /* SearchBox, */ Topic },
})
export default class Header extends Vue {
  private get topic(): string[] {
    return this.themeConfig.topic as string[] || [];
  }

  private get showCarousel(): boolean {
    return (
      this.isHome() &&
      this.themeConfig.slider !== false
    );
  }

  private get shouldShowTopic(): boolean {
    return (
      this.isHome() &&
      this.themeConfig.topic !== false &&
      this.topic &&
      this.topic.length > 0
    );
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/style/variables"

.blog-header
  flex 1
  line-height 1
  border-bottom 1px solid #e5e5e5
  padding .75rem 0
  .header-breadcurmb
    display none
    padding-top .25rem
  .blog-header-logo
    font-family "Playfair Display", Georgia, "Times New Roman", serif
    font-size 2.25rem
    color color-dark
    &:hover
      text-decoration none
.blog-navbar
  padding .25rem 0
  margin .5rem 0
</style>

