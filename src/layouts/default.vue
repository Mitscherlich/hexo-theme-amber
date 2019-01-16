<template lang="pug">
  #blog-app
    Header#blog-header

    main#blog-body
      b-container.blog-main
        b-row
          b-col(lg=8)
            transition(name="fade", mode="out-in")
              keep-alive
                router-view
          Sidebar#blog-sidebar.col-lg-4

    Footer#blog-footer
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Route } from 'vue-router';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';

@Component({
  name: 'Default',
  components: { Header, Footer, Sidebar },
})
export default class Default extends Vue {
  private beforeUpdate() {
    if (!document) {
      return; // ignore this when ssr
    }
    if (this.$route.meta && this.$route.meta.title) {
      document.title = this.$t(this.$route.meta.title) + ' | ' + this.site.title;
    }
  }
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.min.css"></style>
<style src="dplayer/dist/DPlayer.min.css"></style>
<style src="katex/dist/katex.min.css"></style>
<style lang="stylus" src="@/common/stylus/style.styl"></style>
<style lang="stylus" scoped>
#blog-sidebar
  position relative
</style>
