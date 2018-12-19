import { ActionTree, MutationTree, Module } from 'vuex';
import merge from 'lodash.merge';
import IDetailable from '@/models/detailable';
import Article from '@/models/article.ts';
import Page from '@/models/page';
import { fetchImplicitPageBySource, fetchPostBySlug } from '@/api/hexo';
import { FETCH_DETAILABLE_TARGET, SET_DETAILABLE_TARGET } from './types';
import { IRootState } from '.';

export interface IDetailableState {
  target: IDetailable;
  isImplicit: boolean;
}

const state = (): IDetailableState => ({
  target: new Page(),
  isImplicit: false,
});

const actions: ActionTree<IDetailableState, IRootState> = {
  async [FETCH_DETAILABLE_TARGET]({ commit }, { isImplicit, sourceOrSlug }) {
    if (isImplicit) {
      try {
        const { data } = await fetchImplicitPageBySource(sourceOrSlug);
        commit(SET_DETAILABLE_TARGET, { target: data, isImplicit: true });
      } catch (err) {
        const { data } = await fetchImplicitPageBySource(sourceOrSlug.replace(/\/?$/, '/index'));
        commit(SET_DETAILABLE_TARGET, { target: data, isImplicit: true });
      }
    } else {
      const { data } = await fetchPostBySlug(sourceOrSlug);
      commit(SET_DETAILABLE_TARGET, { target: data, isImplicit: false });
    }
  },
};

const mutations: MutationTree<IDetailableState> = {
  // tslint:disable:no-shadowed-variable
  [SET_DETAILABLE_TARGET](state, { target, isImplicit }) {
    const res = isImplicit ? new Page(target) : new Article(target) as IDetailable;
    merge(state, { isImplicit, target: res });
  },
};

export default class DetailableModule implements Module<IDetailableState, IRootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
}
