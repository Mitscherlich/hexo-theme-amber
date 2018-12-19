import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateElement, RenderContext, VNode } from 'vue';
import merge from 'lodash.merge';

@Component({
  name: 'Valine',
})
export default class Valine extends Vue {
  @Prop({ required: true })
  private options?: any;

  private initialize(valineOptions: any) {
    Promise.all([
      import(/* webpackChunkName: "valine" */ 'valine'),
      import(/* webpackChunkName: "leancloud-storage" */ 'leancloud-storage'),
    ]).then(([ValineConstructor, AV]) => {
      // https://valine.js.org/
      if (window) {
        (window as any).AV = AV.default;
      }
      const valine = new ValineConstructor.default();
      valine.init(merge({}, valineOptions, {
        av: (window as any).AV,
        el: '#valine-container',
      }));
    });
  }

  private mounted() {
    this.initialize(this.options);
  }

  private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
    return (<div id='valine-container'></div>);
  }
}
