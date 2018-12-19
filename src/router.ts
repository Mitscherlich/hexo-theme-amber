import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './pages/home.vue'),
      meta: { title: 'home', home: true },
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import(/* webpackChunkName: "archives" */ './pages/archives.vue'),
      meta: { title: 'archives' },
    },
    {
      path: '/related',
      name: 'related',
      component: () => import(/* webpackChunkName: "related" */ './pages/related.vue'),
      meta: { title: 'search' },
    },
    {
      path: '/articles/:slug',
      name: 'article',
      component: () => import(/* webpackChunkName: "articles" */ './pages/articles/_slug.vue'),
      //  .then((m) => m.createDetailablePage()),
      meta: { post: true },
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "not-found" */ './pages/404.vue'),
      meta: {
        title: 'not_found',
      },
    },
    {
      path: '/:slug',
      name: 'page',
      component: () => import(/* webpackChunkName: "pages" */ './pages/_slug.vue'),
      meta: { page: true },
    },
  ],
});
