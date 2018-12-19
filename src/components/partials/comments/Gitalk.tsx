import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateElement, RenderContext, VNode } from 'vue';
import merge from 'lodash.merge';

@Component({
  name: 'Gitalk',
})
export default class Gitalk extends Vue {
  @Prop({ required: true })
  private options?: any;

  private initialize(gitalkOptions: any, slug: string) {
    Promise.all([
      import(/* webpackChunkName: "gitalk" */ 'gitalk'),
      import(/* webpackChunkName: "gitalk" */ 'gitalk/dist/gitalk.css'),
    ]).then(([GitalkConstructor]) => {
      // https://github.com/gitalk/gitalk
      const gitalk = new GitalkConstructor.default(merge({}, gitalkOptions, {
        id: slug,
        title: slug,
      }));
      gitalk.render('gitalk-container');
    });
  }

  private mounted() {
    this.initialize(this.options, this.$route.params.slug);
  }

  private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
    return (<div id='gitalk-container'></div>);
  }
}
