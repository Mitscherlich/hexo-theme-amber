import { Vue, Component } from 'vue-property-decorator';
import { SiteConfig } from '@/models/hexo';
import { Theme } from '@/models/theme';
import { RootState } from '@/store';

declare module 'vue/types/vue' {
  interface Vue {
    $state: RootState;
    $site: SiteConfig;
    $siteData: { [key: string]: any };
    $theme: Theme;
  }
}

@Component
export default class SiteMixin extends Vue {
  public get $state() {
    return this.$store.state as RootState;
  }

  public get $site() {
    return this.$state.meta.hexoConfig.site;
  }

  public get $siteData() {
    return this.$state.meta.siteData;
  }

  public get $theme() {
    return this.$state.meta.themeConfig;
  }
}
