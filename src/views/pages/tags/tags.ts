import { Component, Vue } from 'vue-property-decorator';
import { IContext } from '@/store';
import { FETCH_TAGS } from '@/store/types';
import { Tag } from '@/models/post';

@Component
export default class TagsPage extends Vue {
  private search: string = '';

  private get displayTags() {
    const search = this.$data.search.trim();
    return search.length ?
      this.tags.filter((tag: Tag) => tag.slug.toLowerCase().indexOf(search.toLowerCase()) !== -1) : this.tags;
  }

  private get tags(): Tag[] {
    return this.$store.state.tags.tags;
  }

  public async fetch({ store }: IContext) {
    await store.dispatch(`tags/${FETCH_TAGS}`);
  }

  public nodeClick(tag?: Tag) {
    if (!tag) {
      return;
    }
    this.$router.push({ name: 'related-posts-page', params: { type: 'tag', slug: tag.slug } });
  }
}
