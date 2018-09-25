<template>
  <aside class="blog-sidebar mb-3">
    <!-- .sidebar-index-only -->
    <div class="sidebar-index-only" v-if="isHome()">
      <component
        v-for="item in indexFixedSidebarItems"
        :key="`sidebar-item-${item.text}`"
        :is="item.component" />
    </div>

    <!-- .sidebar-post-only -->
    <div class="sidebar-post-only" v-if="isPost()">
      <component
        v-for="item in postFixedSidebarItems"
        :key="`sidebar-item-${item.text}`"
        :is="item.component" />
    </div>

    <div class="sidebar-else">
      <component
        v-for="item in elseFixedSidebarItems"
        :key="`sidebar-item-${item.text}`"
        :is="item.component" />
    </div>

    <!-- .position-sticky -->
    <div class="position-sticky mb-3" style="top: 1.2rem;">
      <div class="sidebar-sticky">
        <component
          v-if="isHome()"
          v-for="item in indexStickySidebarItems"
          :key="`sidebar-item-${item.text}`"
          :is="item.component" />

        <component
          v-for="item in elseStickySidebarItems"
          :key="`sidebar-item-${item.text}`"
          :is="item.component" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ISidebarItemConfig } from '@/models/theme';
import ArrayUtil from '@/enhancer/utils/ArrayUtil';

@Component
export default class BSidebar extends Vue {
  @Prop({ default: [] })
  private sidebar?: ISidebarItemConfig[];

  private get fixedSidebarItems() {
    return this.sidebar!.filter((item: ISidebarItemConfig) => item.type === 'fixed') || [];
  }

  private get stickySidebarItems() {
    return this.sidebar!.filter((item: ISidebarItemConfig) => item.type === 'sticky') || [];
  }

  private get indexFixedSidebarItems() {
    return this.fixedSidebarItems.filter((item: ISidebarItemConfig) => item.only === 'index') || [];
  }

  private get postFixedSidebarItems() {
    return this.fixedSidebarItems.filter((item: ISidebarItemConfig) => item.only === 'post') || [];
  }

  private get elseFixedSidebarItems() {
    return ArrayUtil.difference(
      this.fixedSidebarItems,
      this.indexFixedSidebarItems.concat(this.postFixedSidebarItems),
    ) || [];
  }

  private get indexStickySidebarItems() {
    return this.stickySidebarItems.filter((item: ISidebarItemConfig) => item.only === 'index') || [];
  }

  private get elseStickySidebarItems() {
    return ArrayUtil.difference(this.stickySidebarItems, this.indexStickySidebarItems) || [];
  }
}
</script>
