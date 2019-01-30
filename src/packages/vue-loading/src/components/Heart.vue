<template lang="pug">
  .lds-heart: div(:class="ldsVariant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'LdsHeart' })
export default class LdsHeart extends Vue {
  @Prop({ type: String })
  private variant?: string;

  private get ldsVariant() {
    return [ `lds-${this.variant}` ];
  }
}
</script>

<style lang="stylus" src="../assets/heart.styl"></style>
