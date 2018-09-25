import { Component, Vue } from 'vue-property-decorator';
import { FETCH_RELATED_POSTS_OF_CATEGORY, FETCH_RELATED_POSTS_OF_TAG } from '@/store/types';
import { IContext } from '@/store';
import { Post } from '@/models/post';

declare const window: Window;

@Component({
  async beforeRouteUpdate(to, _, next) {
    const { asyncData } = this.$options as any;
    if (asyncData) {
      try {
        this.$nprogress.start();
        this.$data.search = '';
        await asyncData({ store: this.$store, route: to });
        this.$nprogress.done();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  },
})
export default class RelatedPostsPage extends Vue {
  get displayPosts(): Post[] {
    const search = this.$data.search;
    return search.length
      ? this.posts.filter((post: Post) => post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      : this.posts;
  }

  private get format(): string {
    return this.$state.meta.hexoConfig.dateTimeFormat.date_format;
  }

  private get posts(): Post[] {
    const { type } = this.$route.params;
    if (type === 'category') {
      return this.$state.categories.oneCategoryPosts.postlist;
    } else if (type === 'tag') {
      return this.$state.tags.oneTagPosts.postlist;
    }
    return [];
  }

  private get type(): string {
    return this.$route.params.type;
  }

  private search: string = '';

  private async fetch({ store, route }: IContext) {
    const { type, slug } = route.params;
    try {
      if (type === 'category') {
        await store.dispatch(`categories/${FETCH_RELATED_POSTS_OF_CATEGORY}`, { slug });
      } else if (type === 'tag') {
        await store.dispatch(`tags/${FETCH_RELATED_POSTS_OF_TAG}`, { slug });
      }
    } catch (e) {
      /* tslint:disable:no-console */
      console.error(e);
    }
  }

  private back() {
    const { type } = this.$route.params;
    if (type === 'category') {
      this.$router.push({ name: 'categories-page' });
    } else if (type === 'tag') {
      this.$router.push({ name: 'tags-page' });
    } else {
      this.$router.go(-1);
    }
  }

  private mounted() {
    const { type, slug } = this.$route.params;
    window.document.title = `${this.$t(type)}${slug} | ${this.$site.title}`;
  }
}
