<template>
  <div id="gitalk-container"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Gitalk from 'gitalk';
import { mapState } from 'vuex';
import { RootState } from '@/store';

export default Vue.extend({
  computed: {
    ...mapState({
      gitalkConfig: (state: RootState) => state.meta.themeConfig.gitalk,
    }),
  },
  mounted() {
    if (!this.gitalkConfig.enable) {
      return;
    }

    // https://github.com/gitalk/gitalk#usage
    const gitalk = new Gitalk({
      id: this.slugOrSource,
      owner: this.gitalkConfig.owner,
      admin: this.gitalkConfig.admin,
      repo: this.gitalkConfig.repo,
      clientID: this.gitalkConfig.client_id,
      clientSecret: this.gitalkConfig.client_secret,
      title: this.$route.path,
    });

    this.$nextTick(() => {
      gitalk.render('gitalk-container');
    });
  },
  props: {
    isImplicit: {
      required: true,
      type: Boolean,
    },
    slugOrSource: {
      required: true,
      type: String,
    },
  },
});
</script>

<style src="gitalk/dist/gitalk.css"></style>
<style lang="stylus">
@import "~@/common/stylus/variables"

#gitalk-container
  .gt-container
    button.gt-btn
      transition all .2s
      border-radius .25rem
      &.gt-btn-login
        border-color color-primary
        background-color color-white
        color color-primary
        &:hover
          color color-light
          background-color color-primary
      &.gt-btn-public
        border-color color-primary
        background-color color-primary
        color color-light
        &:hover
          border-color color-primary-d
          background-color color-primary-d
      &.gt-btn-preview
        border-color color-success
        color color-success
        &:hover
          color color-light
          background-color color-success
  .gt-no-init
    a
      color color-primary
  .gt-meta
    *
      color color-dark
  .gt-error
    color color-danger
  .gt-header
    .gt-header-comment
      textarea.gt-header-textarea
        color color-dark
        background-color color-white
        border-color #ced4da
        border-radius .25rem
      .gt-header-controls
        .gt-header-controls-tip
          color color-muted
</style>
