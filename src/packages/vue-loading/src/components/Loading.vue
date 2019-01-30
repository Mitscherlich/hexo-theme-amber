<template lang="pug">
  component(:is="ldsType", :variant="variant")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import LdsDefault from './Default.vue';
import LdsEllipsis from './Ellipsis.vue';
import LdsGrid from './Grid.vue';
import LdsHeart from './Heart.vue';
import LdsHourglass from './Hourglass.vue';
import LdsRipple from './Ripple.vue';

@Component({
  name: 'VueLoading',
  components: { LdsDefault, LdsEllipsis, LdsGrid, LdsHeart, LdsHourglass, LdsRipple },
})
export default class VueLoading extends Vue {
  @Prop({
    type: String,
    default: 'default',
    validator(val: string) {
      return [ 'default', 'ellipsis', 'grid', 'heart', 'hourglass', 'ripple' ].includes(val);
    },
  })
  private type?: string;

  @Prop({
    type: String,
    default: 'primary',
    validator(val: string) {
      return [
        'primary', 'secondary',
        'success', 'danger',
        'warning', 'info',
        'light', 'dark',
        'muted', 'white', 'black',
      ].includes(val);
    },
  })
  private variant?: string;

  private get ldsType() {
    return `lds-${this.type}`;
  }
}
</script>

<style lang="stylus" src="../assets/style.styl"></style>
