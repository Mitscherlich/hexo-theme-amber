<template lang="pug">
  .lds-ellipsis
    - for (let i = 0; i < 4; i++)
      div(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsEllipsis' })
export default class LdsEllipsis extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/ellipsis.styl"></style>
