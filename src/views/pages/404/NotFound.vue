<template>
  <div class="not-found-layout">
    <!-- header -->
    <h4 class="pb-3 mt-0 mb-4 font-italic border-bottom">
      <b-button class="mr-2" variant="light" @click="$router.back()">
          <fa-icon class="mx-1" icon="angle-left" />
        </b-button>
      <span class="align-middle">{{ $t('not_found') }}</span>
    </h4>
    <!-- 404 image -->
    <img src="@/common/assets/images/404.gif" alt="404">
    <!-- game container -->
    <!-- <div class="flappy-bird-container">
      <p>placeholder</p>
    </div> -->
  </div>
</template>
