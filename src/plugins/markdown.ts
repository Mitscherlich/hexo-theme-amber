import { VueConstructor } from 'vue';
import MdIt from 'markdown-it';

declare module 'vue/types/vue' {
  interface Vue {
    $md: MdIt;
    markdown(str: string): string;
  }
}

const install = (Vue: VueConstructor) => {
  const mdIt = new MdIt();
  // use `this.$md` as 'markdown-it' instance
  Vue.prototype.$md = mdIt;
  // Vue.filter('md', (str: string) => mdIt.render(str));
  Vue.prototype.markdown = (str: string) => mdIt.render(str);
};

export default { install };
