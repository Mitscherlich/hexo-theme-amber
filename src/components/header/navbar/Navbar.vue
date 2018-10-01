<template>
  <div class="nav-scroller">
    <div class="nav d-flex justify-content-between">
      <router-link
        class="navbar-item p-2 px-4 text-muted"
        v-for="nav in navs"
        :to="{ path: nav.link }"
        :key="`nav-${nav.text}`">
        <i v-if="nav.icon" :class="['fas', `fa-${nav.icon}`]" class="mr-2"></i>
        {{ nav.text.toTitleCase() }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMenuConfig } from '@/models/theme';

@Component
export default class Navbar extends Vue {
  @Prop({ default: [] })
  private navs?: IMenuConfig[];
}
</script>

<style lang="stylus" scoped>
::-webkit-scrollbar
  display none
</style>
