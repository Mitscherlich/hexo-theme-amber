<template>
  <div class="tagcloud" style="mix-height: 180px; min-width: 180px;">
    <b-link
      class="tagcloud-item"
      v-for="(t, i) in tags"
      :key="`tag-${i}-${t.name}`"
      @click="$emit('tap', t)">
      {{ t.name }}
    </b-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Tag } from '@/models/post';
import 'TagCloud/dist/tagcloud.js';

declare interface ITagCloudConfig {
  fontsize?: number;
  radius?: number;
  mspeed?: string;
  ispeed?: string;
  direction?: number;
  keep?: boolean;
}

@Component
export default class TagCloud extends Vue {
  @Prop({ default: null })
  private options?: ITagCloudConfig;

  @Prop({ default: [] })
  private tags?: Tag[];

  private get config(): ITagCloudConfig {
    return Object.assign((this.options || {}) as ITagCloudConfig, {
      fontsize: 21,
      radius: 80,
      mspeed: 'normal',
      ispeed: 'normal',
      direction: 135,
      keep: false,
    });
  }

  private mounted() {
    const { config } = this;
    this.$nextTick(() => {
      window.tagcloud(config);
    });
  }
}
</script>

<style src="TagCloud/dist/tagcloud.css"></style>
