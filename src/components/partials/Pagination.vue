<template>
  <b-pagination
    v-model="page"
    :align="align"
    :total-rows="total"
    :per-page="pageSize" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop({ default: 0 })
  private currentPage?: number;

  @Prop({ default: 0 })
  private total?: number;

  @Prop({ default: 0 })
  private pageSize?: number;

  @Prop({ default: 'left' })
  private align?: string;

  private page: number = this.currentPage || 0;

  @Watch('page')
  private onCurrentPageChanged(val: number) {
    this.$emit('current-change', val);
  }
}
</script>
