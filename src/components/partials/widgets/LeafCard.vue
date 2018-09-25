<template>
  <section class="card mb-3 p-3 bg-light border-0">
    <h4 class="font-italic">{{ $t('leaf') }}</h4>
    <p v-html="markdown(leaf)" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LeafCard extends Vue {
  private get leaf() {
    return this.$theme.leaf || '';
  }
}
</script>
