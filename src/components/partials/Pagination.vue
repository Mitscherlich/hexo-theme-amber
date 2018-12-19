<template lang="pug">
  b-pagination(v-model="page", :align="align", :total-rows="total", :per-page="pageSize")
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({ name: 'Pagination' })
export default class Pagination extends Vue {
  @Prop({ type: Number, default: 0 })
  private currentPage?: number;

  @Prop({ type: Number, default: 0 })
  private total?: number;

  @Prop({ type: Number, default: 0 })
  private pageSize?: number;

  @Prop({ type: String, default: 'left' })
  private align?: string;

  private page: number = this.currentPage || 0;

  @Watch('page')
  private onCurrentPageChanged(page: number) {
    this.$emit('current-change', page);
  }
}
</script>
