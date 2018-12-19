import { ActionTree, MutationTree, Module } from 'vuex';
import merge from 'lodash.merge';
import Tag from '@/models/tag';
import Post from '@/models/post';
import { fetchTags, fetchPostsByTag } from '@/api/hexo';
import { FETCH_TAGS, SET_TAGS, FETCH_RELATED_POSTS_OF_TAG, SET_RELATED_POSTS_OF_TAG } from './types';
import { IRootState } from '.';

export interface ITagState {
  tags: Tag[];
  posts: { data: Post[] };
}

const state = (): ITagState => ({
  tags: [],
  posts: { data: [] },
});

const actions: ActionTree<ITagState, IRootState> = {
  async [FETCH_TAGS]({ commit }) {
    const { data } = await fetchTags();
    commit(SET_TAGS, { data });
  },
  async [FETCH_RELATED_POSTS_OF_TAG]({ commit }, { slug }) {
    const { data } = await fetchPostsByTag(slug);
    commit(SET_RELATED_POSTS_OF_TAG, { data });
  },
};

const mutations: MutationTree<ITagState> = {
  // tslint:disable:no-shadowed-variable
  [SET_TAGS](state, { data }) {
    state.tags = data.map((_: any) => new Tag(_));
  },
  [SET_RELATED_POSTS_OF_TAG](state, { data }) {
    merge(state.posts, { data: data.posts });
  },
};

export default class TagModule implements Module<ITagState, IRootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
}
