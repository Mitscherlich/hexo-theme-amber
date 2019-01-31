<template lang="pug">
  #blog-app
    Header#blog-header
    main#blog-body
      b-container.blog-main: b-row
        b-col(:lg="shouldShowSidebar?8:12"): transition(name="fade", mode="out-in")
          keep-alive
            router-view
        Sidebar#blog-sidebar.col-lg-4(v-if="shouldShowSidebar")
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
export default class DefaultLayout extends Vue {
  private get shouldShowSidebar() {
    return this.$route.meta.sidebar !== false;
  }

  private mounted() {
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
<style lang="stylus" src="@/common/style/style.styl"></style>
<style lang="stylus" scoped>
#blog-app
  overflow-x hidden
#blog-sidebar
  position relative
</style>
