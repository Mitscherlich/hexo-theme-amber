<template lang="pug">
  .lds-grid
    - for (let i = 0; i < 9; i++)
      div(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsGrid' })
export default class LdsGrid extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/grid.styl"></style>
