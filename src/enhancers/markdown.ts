import { VueConstructor } from 'vue';
import MarkdownIt from 'markdown-it';

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt.MarkdownIt;
    markdown: (str: string) => string;
  }
}

const install = (Vue: VueConstructor) => {
  const md = new MarkdownIt();
  // use `this.$md` as `markdown-it` instance
  Vue.prototype.$md = md;
  // use filter `date` for rendering markdown snippets
  Vue.prototype.markdown = (str: string) => md.render(str);
};

export default { install };
