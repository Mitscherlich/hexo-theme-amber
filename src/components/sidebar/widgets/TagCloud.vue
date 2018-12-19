<template lang="pug">
  transition(name="fade")
    b-card.mb-3.p-3.border-0(no-body, tag="section", v-if="isHome()")
      h4.font-italic {{ $t('tagcloud') }}
      .tagcloud(style="mix-height: 180px; min-width: 180px; overflow: scoll")
        b-link.tagcloud-item(v-for="{ name, slug } in tags", :key="`tag-${slug}`", :to="{ name: 'related', query: { tag: slug } }") {{ name }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import merge from 'lodash.merge';

declare interface ITagCloudOptions {
  fontsize?: number;
  radius?: number;
  mspeed?: 'slow'|'normal'|'fast';
  ispeed?: 'slow'|'normal'|'fast';
  direction?: number;
  keep?: boolean;
}

const defaultOptions: ITagCloudOptions = {
  fontsize: 16,       // base font size
  radius: 60,         // rolling radius
  mspeed: 'normal',   // rolling maximum speed
  ispeed: 'normal',   // rolling initialize speed
  direction: 135,     // rolling initialize direction
  keep: false,
};

@Component({ name: 'TagCloud' })
export default class TagCloud extends Vue {
  @Prop({ default: [] })
  private tags?: Array<{ name: string; slug: string; }>;

  @Prop({ default: () => defaultOptions })
  private options?: ITagCloudOptions;

  private async mounted() {
    if (!this.tags || this.tags.length < 1) {
      return;
    }
    if (!window) {
      // ignore this when ssr
      return;
    }
    await import(/* webpackChunkName: "tagcloud" */ 'TagCloud');
    const tagcloud = (window as any).tagcloud;
    const copyOptions = merge({}, defaultOptions, this.options);
    this.$nextTick(() => {
      tagcloud(copyOptions);
    });
  }
}
</script>
