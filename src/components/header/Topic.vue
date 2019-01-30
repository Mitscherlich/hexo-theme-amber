<template lang="pug">
  b-row.mb-2.d-none.d-md-flex.d-lg-flex: b-col(md=6, v-for="(t, i) of topic", :key="`tag-${i}`")
    b-card.flex-md-row.mb-4.h-md-250(no-body): transition(name="fade", mode="out-in")
      .overlay(v-if="!ready"): loading(type="ellipsis", variant="muted")
      b-card-body.d-flex.flex-column.align-items-start(v-else)
        strong.d-inline-block.text-capitalize(:class="[ `text-${ i % 2 ? 'success' : 'primary' }` ]") {{ t }}
        h3.topic-title: b-link.text-dark(:to="{ name: 'article', params: { slug: tree[t].slug } }") {{ tree[t].title }}
        .mb-1.text-muted {{ tree[t].date | date('MMM DD') }}
        p.card-text.mb-auto(style="max-height: 6rem; overflow: scroll;") {{ tree[t].text }}
        b-link.font-italic(:to="{ name: 'article', params: { slug: tree[t].slug } }") {{ $t('read_more') }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { fetchPostsByCategory } from '@/api/hexo';
import Tag from '@/models/tag';
import Post from '@/models/post';
import merge from 'lodash.merge';

declare interface ITopicTree {
  [key: string]: Post;
}

@Component({ name: 'Topic' })
export default class Topic extends Vue {
  private ready: boolean = false;
  private tree: ITopicTree = {};

  @Prop({ required: true, type: Array })
  private topic?: string[];

  private async fetchTopicPosts() {
    const posts = (await Promise.all(this.topic!.map(async (_) => {
      const { data } = await fetchPostsByCategory(_);
      return data.posts[0];
    }))).flat();
    const res: ITopicTree = {};
    for (const t of this.topic!) {
      res[ t ] = posts.find((_) => {
        for (const c of _.categories) {
          if (c.slug !== t) {
            continue;
          }
          return true;
        }
        return false;
      });
    }
    merge(this.tree, res);
  }

  private async mounted() {
    await this.fetchTopicPosts();
    this.ready = true;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/style/utils/mixins"

.overlay
  width 100%
  height 100%
  center()

.topic-title
  margin-bottom 0
  display flex
  & > *
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
