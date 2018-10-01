<template>
  <div class="related-posts-layout">
    <!-- search box -->
    <b-card class="mb-3">
      <h4 slot="header">
        {{ $t('posts') }}:&nbsp;{{ $t('search') }}
      </h4>
      <b-input-group>
        <b-input-group-text slot="prepend">
          <i v-if="type == 'tag'" class="fas fa-tags text-muted"></i>
          <i v-else-if="type == 'category'" class="fas fa-bookmark text-muted"></i>
          <i v-else class="fas fa-book text-muted"></i>
        </b-input-group-text>
        <b-form-input
          type="text"
          autofocus="autofocus"
          autocomplete="off"
          spellcheck="false"
          v-model="search"
          :placeholder="`${$t('search')}...`"
          @keydown.enter.native="nodeClick(displayPosts[0])" />
        <b-input-group-append>
          <b-btn variant="outline-success" @click="nodeClick(displayPosts[0])">{{ $t('search') }}</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-card>
    <!-- result box -->
    <b-card class="mb-5" no-body :header="`<h4>${$t('result')}</h4>`">
      <b-list-group flush>
        <b-list-group-item
          v-if="displayPosts.length"
          v-for="(p, i) of displayPosts"
          :key="`suggestion-post-${i}`">
          <div class="d-flex w-100 justify-content-between">
            <b-link :to="{ name: 'post-page', params: { slug: p.slug }}">
              <h5 class="mb-1">{{ p.title }}</h5>
            </b-link>
            <small>{{ p.date | date('ll') }}</small>
          </div>
          <p class="mb-1">
            {{ p.text }}
          </p>
          <small class="text-muted">
            <i class="fas fa-user-edit"></i>
            {{ p.author || $site.author }}
          </small>
        </b-list-group-item>
        <!-- bo related posts -->
        <b-list-group-item v-else>
          {{ $t('no_posts') }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script src="./related-posts.ts" lang="ts"></script>
