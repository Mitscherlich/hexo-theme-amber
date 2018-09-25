<template>
  <div class="blog-tags-layout">
    <!-- search box -->
    <b-card class="mb-3">
      <h4 slot="header">
        {{ $t('tag') }}&nbsp;{{ $t('search') }}
      </h4>
      <b-input-group>
        <b-input-group-text slot="prepend">
          <fa-icon class="text-muted" icon="tags" />
        </b-input-group-text>
        <b-form-input
          type="text"
          autofocus="autofocus"
          autocomplete="off"
          spellcheck="false"
          v-model="search"
          :placeholder="`${$t('search')}...`"
          @keydown.enter.native="nodeClick(displayTags[0])" />
        <b-input-group-append>
          <b-btn variant="outline-success" @click="nodeClick(displayTags[0])">{{ $t('search') }}</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-card>

    <!-- categories box -->
    <transition name="fade">
      <b-card class="mb-3">
        <h4 slot="header">{{ $t('you_may_want') }}</h4>
        <b-btn
          class="mr-2"
          variant="light"
          v-if="displayTags.length"
          v-for="t of displayTags"
          :key="`suggestion-${t.slug}`"
          @click="nodeClick(t)">
          {{ t.name.toTitleCase() }}
        </b-btn>
        <b-alert v-else show variant="warning">{{ $t('no_tags') }}</b-alert>
      </b-card>
    </transition>
  </div>
</template>

<script src="./tags.ts" lang="ts"></script>
