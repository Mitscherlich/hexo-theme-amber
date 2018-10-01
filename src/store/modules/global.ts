import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { fetchSiteData, fetchHexoConfig } from '@/api/hexo';
import { HexoConfig } from '@/models/hexo';
import { Theme } from '@/models/theme';
import { FETCH_META, RELOAD_META, SHOULD_PAGINATION, LOAD_GOOGLE_ANALYTICS } from '@/store/types';
import { RootState } from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import GoogleAnalytics from '@/enhancers/analytics';

/* tslint:disable:max-classes-per-file */

export class MetaState {
  public hexoConfig: HexoConfig = new HexoConfig();
  public themeConfig: Theme = new Theme();
  public siteData: {
    [key: string]: any;
  } = {};
}

const state = (): MetaState  => ({
  hexoConfig: new HexoConfig(),
  themeConfig: new Theme(),
  siteData: {},
});

const actions: ActionTree<MetaState, RootState> = {
  async [ FETCH_META ]({ commit }) {
    const siteData = await fetchSiteData();
    const { data } = await fetchHexoConfig();
    commit(RELOAD_META, Object.assign({}, data, { siteData: siteData.data }));
  },
  /* tslint:disable:no-shadowed-variable */
  async [LOAD_GOOGLE_ANALYTICS]({ state }, { router }: { router: VueRouter }) {
    const google_analytics = state.themeConfig.google_analytics;
    if (google_analytics.enable) {
      const track_id = google_analytics.track_id;
      Vue.use(GoogleAnalytics, { router, track_id });
    }
  },
};

const mutations: MutationTree<MetaState> = {
  /* tslint:disable:no-shadowed-variable */
  [ RELOAD_META ](state, data) {
    state.hexoConfig = new HexoConfig(data);
    state.themeConfig = new Theme(data);
    state.siteData = data.siteData;
  },
};

const getters: GetterTree<MetaState, RootState> = {
  [ SHOULD_PAGINATION ](state) {
    return state.hexoConfig.page.per_page !== 0;
  },
};

export class MetaModule implements Module<MetaState, RootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
