<template lang="pug">
  footer.blog-footer
    b-dropdown.mb-2(:text="$t(locale)", variant="link")
      b-dropdown-item(@click="locale = 'zh-CN'") {{ $t('zh-CN') }}
      b-dropdown-item(@click="locale = 'zh-TW'") {{ $t('zh-TW') }}
      b-dropdown-item(@click="locale = 'en'") {{ $t('en') }}
    p(v-html="$t('powered_by_info', themeConfig.poweredBy)")
    p(v-html="$t('theme_info')")
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
