<template>
  <main id="app">
    <!-- #wp-header -->
    <b-header id="wp-header" />

    <!-- #wp-body -->
    <main id="wp-body">
      <div class="container">
        <div class="row">
          <!-- .blog-main -->
          <transition name="fade">
            <div class="blog-main" :class="[ showSidebar ? 'col-md-8' : 'col' ]">
              <!-- content -->
                <transition name="fade" mode="out-in">
                  <keep-alive>
                    <router-view />
                  </keep-alive>
                </transition>
            </div>
          </transition>

          <!-- #wp-sidebar -->
          <transition name="fade">
            <b-sidebar
              id="wp-sidebar"
              class="blog-sidebar col-md-4"
              v-if="showSidebar"
              :sidebar="this.$theme.sidebar" />
          </transition>
        </div>
      </div>
    </main>

    <!-- #wp-footer -->
    <b-footer id="wp-footer" />
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { configMathJax } from '@/common/js/mathjax';
import { IContext } from '@/store';
import { FETCH_META, FETCH_DETAILABLE_TARGET } from '@/store/types';
import { ISidebarItemConfig } from '@/models/theme';
import BHeader from '@/components/header/BHeader.vue';
import BFooter from '@/components/footer/BFooter.vue';
import BSidebar from '@/components/sidebar/BSidebar.vue';

@Component({
  components: { BHeader, BFooter, BSidebar },
})
export default class Layout extends Vue {
  private sidebarReady: boolean = false;

  private showSidebar() {
    return (
      this.sidebarReady &&
      this.$theme.sidebar &&
      this.$theme.sidebar.length
    );
  }

  // fetch initial global data
  private async asyncData({ store }: IContext) {
    await store.dispatch(`meta/${FETCH_META}`);
    /* tslint:disable:no-console */
    console.log('meta fetched');

    // define 404 page
    // const page_404 = store.state.meta.themeConfig.page_404;

    // if (page_404.enable) {
    //   const source = page_404.source_path.replace(/\.md$/, '');
    //   await store.dispatch(`detailable/${FETCH_DETAILABLE_TARGET}`, { isImplicit: true, sourceOrSlug: source });
    // }
  }

  private mounted() {
    this.$nextTick(configMathJax);
  }

  @Watch('$theme.sidebar')
  private onSidebarLoaded(val: ISidebarItemConfig[]|null) {
    if (!val || val.length < 1) {
      return;
    }
    this.sidebarReady = true;
  }
}
</script>

<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style src="@/common/stylus/style.styl" lang="stylus"></style>
