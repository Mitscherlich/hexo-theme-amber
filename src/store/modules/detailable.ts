import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { fetchImplicitPageBySource, fetchPostBySlug } from '@/api/hexo';
import { Article, Page, IDetailable } from '@/models/article';
import { FETCH_DETAILABLE_TARGET, SET_DETAILABLE_TARGET } from '@/store/types';
import { RootState } from '@/store';

/* tslint:disable:max-classes-per-file */

export class DetailableState {
  public target: IDetailable = new Page();
  public isImplicit: boolean = true;
}

export const state = (): DetailableState => ({
  target: new Page(),
  isImplicit: true,
});

export const actions: ActionTree<DetailableState, RootState> = {
  async [ FETCH_DETAILABLE_TARGET ]({ commit }, { isImplicit, sourceOrSlug }) {
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

export const mutations: MutationTree<DetailableState> = {
  /* tslint:disable:no-shadowed-variable */
  [ SET_DETAILABLE_TARGET ](state, { target, isImplicit }) {
    state.target = (isImplicit ? new Page(target) : new Article(target)) as IDetailable;
    state.isImplicit = isImplicit;
  },
};

export const getters = {};

export class DetailableModule implements Module<DetailableState, RootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
