<template lang="pug">
  component(:is="engine", v-if="enable", :options="options")
  b-alert(v-else, show, v-html="$t('comments_close_msg')")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Comments',
  components: {
    Gitalk: () => import(/* webpackChunkName: "comment" */ './comments/Gitalk'),
    Gitment: () => import(/* webpackChunkName: "comment" */ './comments/Gitment'),
    Valine: () => import(/* webpackChunkName: "comment" */ './comments/Valine'),
  },
})
export default class Comments extends Vue {
  @Prop({ type: Boolean, default: true })
  private comments?: boolean;

  private get enable() {
    return (
      this.themeConfig.comments.enable &&
      this.comments
    );
  }

  private get engine() {
    const { enable, engine } = this.themeConfig.comments;
    return enable ? engine : '';
  }

  private get options() {
    return this.themeConfig.comments.options;
  }
}
</script>

