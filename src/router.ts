import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: () => import(/* webpackChunkName: "home" */ './views/pages/home/Home.vue'),
      meta: {
        title: 'home',
        home: true,
      },
    },
    {
      path: '/archives',
      name: 'archives-page',
      component: () => import(/* webpackChunkName: "archives" */ '@/views/pages/archives/Archives.vue'),
      meta: {
        title: 'archives',
        archive: true,
      },
    },
    {
      path: '/categories',
      name: 'categories-page',
      component: () => import(/* webpackChunkName: "archives" */ '@/views/pages/categories/Categories.vue'),
      meta: {
        title: 'categories',
        category: true,
      },
    },
    {
      path: '/tags',
      name: 'tags-page',
      component: () => import(/* webpackChunkName: "tags" */ '@/views/pages/tags/Tags.vue'),
      meta: {
        title: 'tags',
        tag: true,
      },
    },
    {
      path: '/related/:type/:slug',
      name: 'related-posts-page',
      component: () => import(/* webpackChunkName: "related" */ '@/views/pages/related-posts/RelatedPosts.vue'),
    },
    {
      path: '/posts/:slug',
      name: 'post-page',
      component: () => import(/* webpackChunkName: "posts" */ '@/views/pages/detailable/create-detailable')
        .then((m) => m.createDetailablePage(false)),
    },
    {
      path: '/pages/*',
      name: 'implicit-post-page',
      component: () => import(/* webpackChunkName: "pages" */ '@/views/pages/detailable/create-detailable')
        .then((m) => m.createDetailablePage(true)),
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/pages/404/NotFound.vue'),
      meta: {
        title: 'not_found',
      },
    },
    {
      path: '/*',
      redirect: { name: '404' },
    },
  ],
});
