<template lang="pug">
  footer.blog-footer
    b-dropdown.mb-2(:text="$t(locale)", variant="link")
      b-dropdown-item(@click="locale = 'cn'") {{ $t('cn') }}
      b-dropdown-item(@click="locale = 'tw'") {{ $t('tw') }}
      b-dropdown-item(@click="locale = 'en'") {{ $t('en') }}
    p Made by #[a(target="_blank", :href="themeConfig.poweredBy.link") {{ themeConfig.poweredBy.author }}] with ❤️ and Powered by #[a(href="https://hexo.io/", target="_blank", title="Hexo") Hexo]
    p Theme 🚧 #[a(target="_blank", href="https://github.com/Mitscherlich/hexo-theme-amber") Amber]
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import store from 'store';

@Component({ name: 'Footer' })
export default class Footer extends Vue {
  private locale: string = '';

  private beforeMount() {
    this.locale = store.get('locale', 'en');
  }

  @Watch('locale')
  private onLocaleChanged(l: string) {
    store.set('locale', l);
    this.$i18n.locale = l;
  }
}
</script>

<style lang="stylus" scoped>
.blog-footer
  line-height .75
  font-size .75rem
  padding 1rem 0
  color #999
  text-align center
  background-color #f9f9f9
  border-top .05rem solid #e5e5e5

.blog-footer p:last-child
  margin-bottom 0
</style>
