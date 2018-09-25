<template>
  <main class="blog-archives-layout">
    <!-- header -->
    <h4 class="pb-3 mt-0 mb-4 font-italic border-bottom">
      <transition name="fade">
        <b-button class="mr-2" variant="light" v-show="page !== 1" @click="onPage(1)">
          <fa-icon class="mx-1" icon="angle-left" />
        </b-button>
      </transition>
      <span class="align-middle">{{ $t('archives') }}</span>
    </h4>
    <!-- timeline -->
    <transition-group name="staggered-fade">
      <div class="timeline card mb-5 p-3 border-0" v-for="key of timeLines.keys" :key="`timeline-key-${key}`">
        <!-- leading -->
        <div class="leading mb-3">
          <fa-icon icon="clock" />
          <span>{{ $moment(key).format('MMM. YYYY') }}</span>
        </div>
        <b-row class="mb-3 d-flex justify-content-between" v-for="one of timeLines.entities[key]" :key="'title-' + one.slug">
          <b-col class="one-time" :cols="3" :offset="1">{{ $moment(one.date).format('Do. MMM') }}</b-col>
          <b-col class="one-title" :cols="8">
            <a v-if="one.link && one.link.length" :href="one.link" target="_blank">
              {{ one.title || $t('untitled') }}
              <i class="fa fa-link external-link" aria-hidden="true"></i>
            </a>
            <b-link v-else :to="{ name: 'post-page', params: { slug: one.slug } }">
              {{ one.title || $t('untitled') }}
            </b-link>
          </b-col>
        </b-row>
      </div>
    </transition-group>
    <!-- pagination -->
    <pagination
      align="center"
      v-if="shouldPage"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :current-page="page"
      @current-change="onPage" />
  </main>
</template>

<script src="./archives.ts" lang="ts"></script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variables.styl"

.blog-archives-layout
  a
    border-bottom 1px solid rgba(0, 0, 0, 0)
    transition all .2s
    &:hover
      border-bottom-color color-dark

  .timeline
    .leading
      text-align center
      font-size 1.3rem
      color color-dark
      & > *
        margin 0 0.2rem

  .one-timeline
    .one-time
      text-align center
      white-space nowrap

    .one-title
      word-break break-all
      .external-link
        font-size 0.8em
</style>
