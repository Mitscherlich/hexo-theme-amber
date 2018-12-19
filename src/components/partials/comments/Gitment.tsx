import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateElement, RenderContext, VNode } from 'vue';
import merge from 'lodash.merge';

@Component({
  name: 'Gitment',
})
export default class Gitment extends Vue {
  @Prop({ required: true })
  private options?: any;

  private initialize(gitmentOptions: any, slug: string) {
    Promise.all([
      import(/* webpackChunkName: "gitment" */ 'gitment'),
      import(/* webpackChunkName: "gitment" */ 'gitment/style/default.css'),
    ]).then(([GitmentConstructor]) => {
      // https://github.com/imsun/gitment
      const gitment = new GitmentConstructor.default(merge({}, gitmentOptions, {
        id: slug,
        title: slug,
      }));
      gitment.render('gitment-container');
    });
  }

  private mounted() {
    this.initialize(this.options, this.$route.params.slug);
  }

  private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
    return (<div id='gitment-container'></div>);
  }
}
