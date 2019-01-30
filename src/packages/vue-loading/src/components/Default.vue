<template lang="pug">
  .lds-default
    - for (let i = 0; i < 12; i++)
      div(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsDefault' })
export default class LdsDefault extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/default.styl"></style>
