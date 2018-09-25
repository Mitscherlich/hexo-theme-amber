import { Component, Vue } from 'vue-property-decorator';
import store from 'store';

declare module 'vue/types/vue' {
  interface Vue {
    isHome(): boolean;
    isPost(): boolean;
    isArchive(): boolean;
    isCategory(): boolean;
    isTag(): boolean;
    isPage(): boolean;
  }
}

@Component
export default class LayoutMixin extends Vue {
  public isHome() {
    if (this.$route.meta) {
      return this.$route.meta.home || false;
    }
    const root = this.$state.meta.hexoConfig.url.root;
    if (root) {
      return this.$route.path === root;
    } else if (this.$route.path) {
      return this.$route.path === '/';
    }
    return window.location.pathname === '/' || false;
  }

  public isPost() {
    if (this.$route.meta) {
      return this.$route.meta.post || false;
    }
    return false;
  }

  public isArchive() {
    if (this.$route.meta) {
      return this.$route.meta.archive || false;
    }
    return false;
  }

  public isCategory() {
    if (this.$route.meta) {
      return this.$route.meta.category || false;
    }
    return false;
  }

  public isTag() {
    if (this.$route.meta) {
      return this.$route.meta.tag || false;
    }
    return false;
  }

  public isPage() {
    if (this.$route.meta) {
      return this.$route.meta.page || false;
    }
    return false;
  }

  private beforeMount() {
    // setting locale
    const locale = store.get('locale') || this.$i18n.locale || this.$site.language || 'zh_cn';
    this.$i18n.locale = locale;
    // setting title
    let title = 'untitled';
    if (this.$route.meta) {
      if (this.$route.meta.title) {
        title = this.$t(this.$route.meta.title).toString();
        window.document.title = `${title} | ${this.$site.title}`;
      }
    }
  }
}
