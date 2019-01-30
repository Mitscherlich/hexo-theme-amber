<template lang="pug">
  .lds-ripple
    - for (let i = 0; i < 2; i++)
      div(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsRipple' })
export default class LdsRipple extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/ripple.styl"></style>
