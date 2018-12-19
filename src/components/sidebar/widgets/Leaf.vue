<template lang="pug">
  transition(name="fade")
    b-card.mb-3.p-3.bg-light.border-0(no-body, tag="section", v-if="isHome()")
      h4.font-italic {{ $t('leaf') }}
      p(v-html="markdown(word)")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'Leaf' })
export default class Leaf extends Vue {
  @Prop({ type: String, default: '' })
  private word?: string;
}
</script>
