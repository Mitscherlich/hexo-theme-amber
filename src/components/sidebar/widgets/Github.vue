<template lang="pug">
  transition(name="fade")
    .github-card.mb-3(v-if="ready")
      .github-header
      a.user-link(:href="userUrl"): img.github-avatar(:src="avatar")
      h1 {{ name }}
      ul.github-info
        li
          a(target="_blank", :href="repoUrl")
            strong {{ repoNum }}
            | repos
        li
          a(target="_blank", :href="gistsUrl")
            strong {{ gistsNum }}
            | gists
        li
          a(target="_blank", :href="followersUrl")
            strong {{ followersNum }}
            | followers
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getUserInfo, urlMap, blankUserAvatar } from '@/api/github';

@Component({ name: 'GithubCard' })
export default class GithubCard extends Vue {
  private ready: boolean = false;
  private userUrl: string = '';
  private avatar: string = '';
  private repoNum: number = 0;
  private repoUrl: string = '';
  private followersNum: number = 0;
  private followersUrl: string = '';
  private gistsNum: number = 0;
  private gistsUrl: string = '';

  @Prop({ type: String, required: true })
  private name?: string;

  private prepareUserInfo(user: any) {
    const {
      avatar_url,
      name,
      html_url,
      followers,
      public_gists,
      public_repos,
    } = user;
    this.ready = true;
    this.avatar = avatar_url;
    this.userUrl = html_url;
    this.repoNum = public_repos;
    this.repoUrl = `${html_url}${urlMap.repoTab}`;
    this.followersNum = followers;
    this.followersUrl = `${html_url}${urlMap.followersTab}`;
    this.gistsNum = public_gists;
    this.gistsUrl = `https://gist.github.com/${this.name}`;
  }

  private async mounted() {
    try {
      const data = await getUserInfo(this.name!);
      this.prepareUserInfo(data);
    } catch (e) {
      this.ready = true;
      this.avatar = blankUserAvatar;
      this.name = this.$i18n.t('oops').toString();
      this.userUrl = '#';
      this.repoUrl = '#';
      this.followersUrl = '#';
      this.gistsUrl = '#';
    }
  }
}
</script>

<style src="@/common/style/partials/transition.styl" lang="stylus"></style>
<style lang="stylus">
@import '~@/common/style/variables'

.github-card
  text-align center
  // max-width $toolWidth
  background #fff
  overflow hidden
  border-radius 2px
  box-shadow 0 1px 3px rgba(26, 26, 26, 0.1)
  box-sizing border-box
  margin 0 auto
  margin-bottom 10px

  h1
    font-size 24px
    font-weight 500
    text-decoration none

.github-header
  height 148px
  position relative
  padding 0
  margin 0
  background linear-gradient(to right, #eaecc6, #2bc0e4)

.link
  color color-dark
  text-decoration none

.user-link
  display inline-block
  overflow hidden
  background #fff
  border-radius 100%
  box-shadow 0 1px 1px rgba(0, 0, 0, 0.3)
  text-decoration none
  margin-top -43px
  border 3px solid #fff
  position relative

.github-avatar
  display block
  width 5rem
  height 5rem
  transition 0.2s ease-in-out

  &:hover
    transform rotate(45deg)

.github-info
  font-size 12px
  color color-dark
  list-style-type none
  margin 0
  padding 0
  border-top 1px solid #eee
  zoom 1

  a
    color color-dark

    &, &:hover, &:visited
      text-decoration none

  strong
    display block
    color #292f33
    font-size 16px
    line-height 1.6

  li
    width 33.33%
    float left
    font-size 12px
    padding 8px 0
    box-shadow 1px 0 0 #eee
</style>
