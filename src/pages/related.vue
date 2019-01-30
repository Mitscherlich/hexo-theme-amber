<template lang="pug">
  .blog-related
    b-card.mb-3
      h4(slot="header") {{ $t('you_may_want') }}
      b-btn.m-1(:pressed="slug === search", :key="`suggestion-${slug}`", v-for="{ name, slug, parent } of suggestions", variant="light", @click="updateQuery(typeof parent !== 'undefined' ? 'category' : 'tag', slug)") {{ name }}
    b-card.mb-5(no-body)
      h4(slot="header") {{ $t('result') }}
      b-container(style="min-height: 12.5rem;")
        transition(name="fade", mode="out-in")
          ul.timeline(v-if="displayPosts.length")
            li.cursor-pointer(:key="`result-${slug}`", v-for="{ date, slug, link, title, text } of displayPosts", @click="$router.push({ name: 'article', params: { slug } })")
              b-link(:to="{ name: 'article', params: { slug } }") {{ title }}
              b-link.float-right {{ date | date(format) }}
              p #[small.text-muted {{ text }}]
          b-alert.mt-4(v-else, show) {{ $t('no_posts') }}
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Post from '@/models/post';
import Tag from '@/models/tag';
import { IContext } from '@/store';
import {
  FETCH_TAGS, FETCH_RELATED_POSTS_OF_TAG,
  FETCH_CATEGORIES, FETCH_RELATED_POSTS_OF_CATEGORY,
} from '@/store/types';

@Component({
  name: 'Related',
})
export default class RelatedPage extends Vue {
  private get format(): string {
    return this.site.format!.date_format;
  }

  private get tags() {
    return this.$store.state.tag.tags || [];
  }

  private get categories() {
    return this.$store.state.category.categories || [];
  }

  private get suggestions() {
    return [...new Set([...this.tags, ...this.categories])];
  }

  private get search() {
    if (!this.$route.query) {
      return '';
    }
    const { tag, category } = this.$route.query;
    if (tag) {
      if (tag.indexOf(',') !== -1) {
        // use tag[0]
        return (tag as string).split(',')[0];
      } else {
        // use tag
        return tag as string;
      }
    }
    if (category) {
      if (category.indexOf(',') !== -1) {
        // use category[0]
        return (category as string).split(',')[0];
      } else {
        // use category
        return category as string;
      }
    }
    return '';
  }

  private get posts() {
    const relatedTagPosts = this.$store.state.tag.posts.data || [];
    const relatedCatePosts = this.$store.state.category.posts.data || [];
    return [...relatedTagPosts, ...relatedCatePosts];
  }

  private get displayPosts() {
    if (!this.search || this.search === 'all') {
      return [];
    }
    return this.posts.filter((post) => {
      for (const { slug } of post.tags) {
        if (slug.indexOf(this.search) !== -1) {
          return true;
        }
      }
      for (const { slug } of post.categories) {
        if (slug.indexOf(this.search) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  private updateQuery(type: string, slug: string) {
    this.$router.push({ name: 'related', query: { [type]: slug } });
  }

  private async fetch({ store, route }: IContext) {
    const { tag, category } = route.query;
    if (!route.query || tag === 'all' || category === 'all') {
      await store.dispatch(`tag/${FETCH_TAGS}`);
      await store.dispatch(`category/${FETCH_CATEGORIES}`);
    }
    if (tag) {
      if (tag.indexOf(',') !== -1) {
        const tag0 = (tag as string).split(',')[0];
        await store.dispatch(`tag/${FETCH_RELATED_POSTS_OF_TAG}`, { slug: tag0 });
      } else {
        await store.dispatch(`tag/${FETCH_RELATED_POSTS_OF_TAG}`, { slug: tag });
      }
    } else if (category) {
      if (category.indexOf(',') !== -1) {
        const cate0 = (category as string).split(',')[0];
        await store.dispatch(`category/${FETCH_RELATED_POSTS_OF_CATEGORY}`, { slug: cate0 });
      } else {
        await store.dispatch(`category/${FETCH_RELATED_POSTS_OF_CATEGORY}`, { slug: category });
      }
    }
  }

  @Watch('$route.query')
  private async onQueryChanged(query: any) {
    const { tag, category } = this.$route.query;
    if (!this.$route.query || tag === 'all' || category === 'all') {
      await this.$store.dispatch(`tag/${FETCH_TAGS}`);
      await this.$store.dispatch(`category/${FETCH_CATEGORIES}`);
    } else if (tag) {
      if (tag.indexOf(',') !== -1) {
        const tag0 = (tag as string).split(',')[0];
        await this.$store.dispatch(`tag/${FETCH_RELATED_POSTS_OF_TAG}`, { slug: tag0 });
      } else {
        await this.$store.dispatch(`tag/${FETCH_RELATED_POSTS_OF_TAG}`, { slug: tag });
      }
    } else if (category) {
      if (category.indexOf(',') !== -1) {
        const cate0 = (category as string).split(',')[0];
        await this.$store.dispatch(`category/${FETCH_RELATED_POSTS_OF_CATEGORY}`, { slug: cate0 });
      } else {
        await this.$store.dispatch(`category/${FETCH_RELATED_POSTS_OF_CATEGORY}`, { slug: category });
      }
    }
  }
}
</script>
