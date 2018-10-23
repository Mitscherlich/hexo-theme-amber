<template>
  <main class="blog-home-layout">
    <h3 class="pb-3 mb-4 font-italic border-bottom">
      <transition name="fade">
        <b-btn class="mr-2" variant="light" v-show="page !== 1" @click="onPage(1)">
          <i class="fas fa-angle-left mx-1"></i>
        </b-btn>
      </transition>
      <span class="align-middle">EL PSY CONGROO</span>
    </h3>
    <!-- article group -->
    <transition name="fade" mode="out-in">
      <article-group
        v-if="posts.length > 0"
        id="blog-archives"
        :posts="posts"
        :format="format" />
      <b-alert v-else variant="info" :show="posts.length < 1">{{ $t('no_posts') }}</b-alert>
    </transition>
    <!-- pagination -->
    <transition name="fade">
      <pagination
        v-if="shouldPage"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="page"
        @current-change="onPage" />
    </transition>
  </main>
</template>

<script src="./home.ts" lang="ts"></script>
