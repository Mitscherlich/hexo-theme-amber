import { ActionTree, MutationTree, Module } from 'vuex';
import merge from 'lodash.merge';
import Post from '@/models/post';
import { fetchPosts } from '@/api/hexo';
import { IRootState } from './index';
import { FETCH_HOME_POSTS_LIST, SET_HOME_POSTS_LIST } from './types';

export interface IPosts {
  data: Post[];
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface IHomeState {
  posts: IPosts|null;
  page: number;
}

const state = (): IHomeState => ({
  posts: null,
  page: 0,
});

const actions: ActionTree<IHomeState, IRootState> = {
  async [FETCH_HOME_POSTS_LIST]({ commit }, { page }) {
    const { data } = await fetchPosts(page);
    commit(SET_HOME_POSTS_LIST, { data, page });
  },
};

const mutations: MutationTree<IHomeState> = {
  // tslint:disable:no-shadowed-variable
  [SET_HOME_POSTS_LIST](state, { data, page }) {
    merge(state, { page, posts: data });
  },
};

export default class HomeModule implements Module<IHomeState, IRootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
}
