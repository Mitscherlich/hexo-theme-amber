import { Vue, Component } from 'vue-property-decorator';
import { IRootState } from '@/store';

import HexoConfig from '@/models/hexo';
import ThemeConfig from '@/models/theme';

declare module 'vue/types/vue' {
  interface Vue {
    site: HexoConfig;
    themeConfig: ThemeConfig;
    isHome(): boolean;
    isPost(): boolean;
    isPage(): boolean;
  }
}

@Component({
  name: 'Root',
})
export default class RootMixin extends Vue {
  private get state(): IRootState {
    return this.$store.state as IRootState;
  }

  public get site() {
    return this.state.site;
  }

  public get themeConfig() {
    return this.state.themeConfig;
  }

  public isHome(): boolean {
    return this.$route.meta.home === true;
  }

  public isPost(): boolean {
    return this.$route.meta.post === true;
  }

  public isPage(): boolean {
    return this.$route.meta.page === true;
  }
}
