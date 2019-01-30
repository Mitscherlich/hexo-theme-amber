import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import VueRouter, { Route } from 'vue-router';
import merge from 'lodash.merge';

import GoogleAnalytics from '@/plugins/analytics';
import HexoConfig from '@/models/hexo';
import ThemeConfig from '@/models/theme';
import { fetchHexoConfig, fetchSiteData } from '@/api/hexo';
import { FETCH_META, RELOAD_META, SHOULD_PAGINATION, LOAD_GOOGLE_ANALYTICS } from './types';

import HomeModule, { IHomeState } from './home';
import ArchiveModule, { IArchiveState } from './archive';
import CategoryModule, { ICategoryState } from './category';
import TagModule, { ITagState } from './tag';
import DetailableModule, { IDetailableState } from './detailable';

Vue.use(Vuex);

export interface IContext {
  store: Store<any>;
  route: Route;
}

export interface IRootState {
  site: HexoConfig;
  themeConfig: ThemeConfig;
  data: { [key: string]: any; };
  home?: IHomeState;
  archive?: IArchiveState;
  category?: ICategoryState;
  tag?: ITagState;
  detailable?: IDetailableState;
}

export default new Vuex.Store({
  state: {
    site: new HexoConfig(),
    themeConfig: new ThemeConfig(),
    data: {},
  },
  mutations: {
    [RELOAD_META](state, payload) {
      const { siteData, ...siteConfig } = payload;
      merge(state, {
        data: siteData,
        site: new HexoConfig(siteConfig),
        themeConfig: new ThemeConfig(siteConfig),
      });
    },
  },
  actions: {
    async [FETCH_META]({ commit }) {
      const { data: siteConfig } = await fetchHexoConfig();
      const { data: siteData } = await fetchSiteData();
      commit(RELOAD_META, Object.assign({ ...siteConfig }, { siteData }));
    },
    async [LOAD_GOOGLE_ANALYTICS]({ state }, { router }: { router: VueRouter }) {
      const { enable, track_id } = state.themeConfig.ga!;
      if (enable) {
        Vue.use(GoogleAnalytics, { router, track_id });
      }
    },
  },
  getters: {
    [SHOULD_PAGINATION](state) {
      return (
        state.site.pagination &&
        state.site.pagination.per_page !== 0
      );
    },
  },
  modules: {
    home: new HomeModule(),
    archive: new ArchiveModule(),
    category: new CategoryModule(),
    tag: new TagModule(),
    detailable: new DetailableModule(),
  },
});
