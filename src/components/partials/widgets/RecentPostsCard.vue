<template>
  <section
    class="card mb-3"
    :class="[isHome()?'p-3 border-0':null]">
    <h4 :class="[isHome()?'font-italic mb-3':'card-header']">{{ $t('recent_posts') }}</h4>
    <div :class="[isHome()?null:'card-body']">
      <transition-group name="staggered-fade" tag="ul" v-if="posts.length > 0">
        <li
          class="mb-1"
          v-for="(p, i) in posts.take(5)"
          :key="`recent-post-${i}-${p.slug}`">
          <b-link :to="{ name: 'post-page', params: { slug: p.slug }}">
            {{ p.title }}
          </b-link>
        </li>
      </transition-group>
      <p v-else class="text-muted font-italic">{{ $t('no_posts') }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { fetchPostsList } from '@/api/hexo';
import { Post } from '@/models/post';

@Component
export default class RecentPostsCard extends Vue {
  private posts: Post[] = [];

  private async created() {
    if (this.posts.length < 1) {
      const { data } = await fetchPostsList();
      this.posts = data.data;
    }
  }
}
</script>
