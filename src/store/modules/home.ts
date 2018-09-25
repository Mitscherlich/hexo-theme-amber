import { ActionTree, MutationTree, Module } from 'vuex';
import { fetchPostsList } from '@/api/hexo';
import { PostsList } from '@/models/post';
import { FETCH_HOME_POSTS_LIST, SET_HOME_POSTS_LIST } from '@/store/types';
import { RootState } from '@/store';

/* tslint:disable:max-classes-per-file */

export class HomeState {
  public postsList: PostsList = new PostsList();
  public page: number = 0;
}

const state = (): HomeState => ({
  postsList: new PostsList(),
  page: 0,
});

const actions: ActionTree<HomeState, RootState> = {
  async [ FETCH_HOME_POSTS_LIST ]({ commit }, { page }) {
    const { data } = await fetchPostsList(page);
    commit(SET_HOME_POSTS_LIST, { data, page });
  },
};

const mutations: MutationTree<HomeState> = {
  /* tslint:disable:no-shadowed-variable */
  [ SET_HOME_POSTS_LIST ](state, { data, page }) {
    state.postsList = new PostsList(data);
    state.page = page;
  },
};

const getters = {};

export class HomeModule {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
