<template lang="pug">
  .nav-scroller
    .nav.d-flex.justify-content-between
      b-link.nav-item.px-4.py-2.text-muted(v-for="{ text, link } in navs", :key="`nav-${text}`", :to="link") {{ text }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'Navbar' })
export default class Navbar extends Vue {
  @Prop({ default: [] })
  private navs?: [{ text: string, link: string }];
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variables"

.nav-scroller
  position relative
  z-index 2
  height 2.75rem
  overflow-y hidden
  .nav
    display flex
    flex-wrap nowrap
    padding-bottom 1rem
    margin-top -1px
    overflow-x auto
    text-align center
    white-space nowrap
    -ms-overflow-style none
    overflow -moz-scrollbars-none
    &::-webkit-scrollbar
      display none
a.nav-item
  position relative
  line-height 1
  list-style-type none
  text-decoration none
  cursor pointer
  &:before
    content ""
    position absolute
    top 0
    left 100%
    width 0
    height 100%
    border-bottom 2px solid color-muted
    transition .2s all ease-in-out
  &:hover::before
    width 100%
    left 0
  &:hover ~ &::before
    left 0
</style>
