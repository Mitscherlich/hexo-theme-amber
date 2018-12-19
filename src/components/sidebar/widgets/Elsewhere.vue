<template lang="pug">
  transition(name="fade")
    b-card.mb-3.p-3.border-0(no-body, tag="section", v-if="isHome()")
      h4.font-italic.mb-3 {{ $t('elsewhere') }}
      ol.list-unstyled
        li(v-if="where.facebook")
          a.text-dark(target="_blank", :href="where.facebook")
            fa-icon.mr-2(:icon="['fab', 'facebook']")
            | {{ $t('facebook') }}
        li(v-if="where.github")
          a.text-dark(target="_blank", :href="where.github")
            fa-icon.mr-2(:icon="['fab', 'github-alt']")
            | {{ $t('github') }}
        li(v-if="where.twitter")
          a.text-dark(target="_blank", :href="where.twitter")
            fa-icon.mr-2(:icon="['fab', 'twitter']")
            | {{ $t('twitter') }}
        li(v-if="where.weibo")
          a.text-dark(target="_blank", :href="where.weibo")
            fa-icon.mr-2(:icon="['fab', 'weibo']")
            | {{ $t('weibo') }}
        li(v-for="{ text, link } of where.websites", :key="`website-${text}`")
          a.text-dark(target="_blank", :href="link")
            fa-icon.mr-2(:icon="['fab', 'safari']")
            | {{ text }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'Elsewhere' })
export default class Elsewhere extends Vue {
  @Prop({ required: true })
  private where?: {
    websites: Array<{ text: string; link: string }>;
    [key: string]: Array<{ text: string; link: string }>|string;
  };
}
</script>
