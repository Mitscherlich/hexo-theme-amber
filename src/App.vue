<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarVisible = computed(() => route.meta?.sidebar !== false)
</script>

<template lang="pug">
#blog-app
  Header#blog-header
  main#blog-body
    b-container.blog-main: b-row
      b-col(:lg="sidebarVisible ? 8 : 12"): transition(name="fade", mode="out-in")
        keep-alive
          router-view
      Sidebar#blog-sidebar.col-lg-4(v-if="sidebarVisible")
  Footer#blog-footer
</template>

