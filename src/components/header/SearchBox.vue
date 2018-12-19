<template lang="pug">
  transition(name="fade", mode="out-in")
    fa-icon.text-muted.cursor-pointer(v-if="!showSearchBox", icon="search", @click="showSearchBox = true")
    b-form(v-else, @submit.prevent)
      b-input-group(size="sm")
        b-form-input(v-model="query", type="text", autofocus="autofocus", autocomplete="off", spellcheck="false", :placeholder="$t('search')", @keyup.enter.native="go(focusIndex)", @keyup.down.native="onDown", @keyup.up.native="onUp")
          b-input-group-append
            b-btn(variant="outline-success") {{ $t('search') }}
      transition(name="fade")
        b-card.suggestions.box-shadow(no-body, v-show="showSuggestions")
          h5.font-italic(slot="header") {{ $t('result') }}
          b-list-group(flush, @mouseleave="unfocus")
            b-list-group-item.suggestion(v-for="(s, i) in suggestions", :class="{ focused: i === focusIndex }", :key="`suggestion-${i}`", @mousedown="go(i)", @mouseenter="focus(i)")
              b-link(to="{ name: 'article', params: { slug: s.slug }}", @click.prevent) {{ s.title }}
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { FETCH_HOME_POSTS_LIST } from '@/store/types';
import Post from '@/models/post';

@Component({ name: 'SearchBox' })
export default class SearchBox extends Vue {
  private focused: boolean = false;
  private focusIndex: number = 0;
  private posts: Post[] = [];
  private query: string = '';
  private showSearchBox: boolean = false;

  @Prop({ type: String, default: 'build-in' })
  private engine?: string;

  @Prop({ type: Number, default: 5 })
  private max?: number;

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
    const posts = this.$store.state.home.posts.data;
    const matches = (item: Post) => (
      item.title &&
      item.title.toLowerCase().indexOf(query) > -1
    );
    const res = [];
    for (const p of posts) {
      if (res.length >= this.max!) {
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
    this.$router.push({ name: 'article', params: { slug: this.suggestions[i].slug } });
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
  private async onFocusedChanged(focused: boolean) {
    if (focused) {
      if (this.$store.state.home.posts.data.length < 1) {
        await this.$store.dispatch(`home/${FETCH_HOME_POSTS_LIST}`, { page: 1 });
      }
    }
  }

  @Watch('$store.state.home.posts')
  private onPostsFetched({ data }: { data: Post[] }) {
    this.posts = data;
  }
}
</script>
