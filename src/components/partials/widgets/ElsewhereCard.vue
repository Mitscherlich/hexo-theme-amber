<template>
  <section class="card mb-3 p-3 border-0">
    <h4 class="font-italic mb-3">{{ $t('elsewhere') }}</h4>
    <ol class="list-unstyled">
      <li v-for="item in $theme.social" :key="`sidebar-item-social-${item.text}`">
        <a class="text-dark" target="_blank" :href="item.link">
          <i class="fab mx-1" :class="[`fa-${item.icon}`]"></i>
          {{ $t(item.text) }}
        </a>
      </li>
    </ol>
  </section>
</template>
