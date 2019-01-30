<template lang="pug">
  .lds-hourglass(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsHourglass' })
export default class LdsHourglass extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/hourglass.styl"></style>
