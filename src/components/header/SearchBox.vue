<template>
  <transition name="fade" mode="out-in">
    <i
      class="text-muted cursor-pointer fas fa-search"
      v-if="!showSearchBox"
      @click="showSearchBox = !showSearchBox"></i>
    <b-form
      @submit.prevent
      v-if="showSearchBox">
      <b-input-group size="sm">
        <b-form-input
          type="text"
          autofocus="autofocus"
          autocomplete="off"
          spellcheck="false"
          v-model="query"
          :placeholder="`${$t('search')}...`"
          @focus.native="focused = true"
          @blur.native="focused = false"
          @keyup.enter.native="go(focusIndex)"
          @keyup.down.native="onDown"
          @keyup.up.native="onUp" />
          <b-input-group-append>
            <b-btn variant="outline-success">{{ $t('search') }}</b-btn>
          </b-input-group-append>
        </b-input-group>

        <!-- search suggestions -->
        <transition name="fade">
          <b-card no-body
            class="suggestions border border-dark box-shadow"
            v-if="showSuggestions">
            <h5 class="font-italic" slot="header">{{ $t('result') }}</h5>
            <b-list-group flush
              @mouseleave="unfocus">
              <b-list-group-item
                v-for="(s, i) in suggestions"
                class="suggestion"
                :class="{ focused: i === focusIndex }"
                :key="`suggestion-${i}`"
                @mousedown="go(i)"
                @mouseenter="focus(i)">
                <b-link :to="{ name: 'post-page', params: { slug: s.slug }}" @click.prevent>
                  {{ s.title }}
                </b-link>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </transition>
      </b-form>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { FETCH_HOME_POSTS_LIST } from '@/store/types';
import { Post, PostsList } from '@/models/post';
import { IContext } from '@/store';

@Component
export default class SearchBox extends Vue {
  private focused: boolean = false;
  private focusIndex: number = 0;
  private posts: Post[] = [];
  private query: string = '';
  private showSearchBox: boolean = false;

  private get showSuggestions() {
    return (
      this.focused &&
      this.suggestions &&
      this.suggestions.length
    );
  }

  private get suggestions() {
    const query = this.query.trim().toLowerCase();
    if (!query) {
      return [];
    }
    const posts = this.$store.state.home.postsList.data;
    const max = this.$theme.search_max || 5;
    const matches = (item: Post) => (
      item.title &&
      item.title.toLowerCase().indexOf(query) > -1
    );
    const res = [];
    for (const p of posts) {
      if (res.length >= max) {
        break;
      }
      if (matches(p)) {
        res.push(p);
      }
    }
    return res;
  }

  private focus(i: number) {
    this.focusIndex = i;
  }

  private go(i: number) {
    if (!this.showSuggestions) {
      return;
    }
    this.$router.push({ name: 'post-page', params: { slug: this.suggestions[i].slug } });
    this.query = '';
    this.focusIndex = 0;
    this.focused = false;
  }

  private onDown() {
    if (this.showSuggestions) {
      if (this.focusIndex < this.suggestions.length - 1) {
        this.focusIndex++;
      } else {
        this.focusIndex = 0;
      }
    }
  }

  private onUp() {
    if (this.showSuggestions) {
      if (this.focusIndex > 0) {
        this.focusIndex--;
      } else {
        this.focusIndex = this.suggestions.length - 1;
      }
    }
  }

  private unfocus() {
    this.focusIndex = -1;
  }

  @Watch('focused')
  private async onFocusedChanged(val: boolean) {
    if (val) {
      if (this.$store.state.home.postsList.data.length < 1) {
        await this.$store.dispatch(`home/${FETCH_HOME_POSTS_LIST}`, { page: 1 });
      }
    }
  }

  @Watch('$store.state.home.postsList')
  private onPostsListsFetched(val: PostsList) {
    this.posts = val.data;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variables"
.suggestions
  position absolute
  top 2.5rem
  right 1rem
  width 20rem
  z-index 99
  .suggestion
    transition all .1s
    line-height 1.4
    cursor pointer
    a
      text-decoration none
      color color-dark
    &.focused
      background-color color-primary
      opacity .8
      a
        color color-light
</style>
