import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { Tag, SpecificPostsList } from '@/models/post';
import { FETCH_TAGS, SET_TAGS, FETCH_RELATED_POSTS_OF_TAG, SET_RELATED_POSTS_OF_TAG } from '@/store/types';
import { fetchAllTags, fetchPostsListByTag } from '@/api/hexo';
import { RootState } from '@/store';

/* tslint:disable:max-classes-per-file */

export class TagsState {
  public tags: Tag[] = [];
  public oneTagPosts: SpecificPostsList = new SpecificPostsList();
}

const state = () => ({
  tags: [],
  oneTagPosts: new SpecificPostsList(),
});

const actions: ActionTree<TagsState, RootState> = {
  async [ FETCH_TAGS ]({ commit }) {
    const { data } = await fetchAllTags();
    commit(SET_TAGS, { data });
  },
  async [ FETCH_RELATED_POSTS_OF_TAG ]({ commit }, { slug }) {
    const { data } = await fetchPostsListByTag(slug);
    commit(SET_RELATED_POSTS_OF_TAG, { data });
  },
};

const mutations: MutationTree<TagsState> = {
  /* tslint:disable:no-shadowed-variable */
  [ SET_TAGS ](state, { data }) {
    state.tags = data.map((one: any) => new Tag(one));
  },
  [ SET_RELATED_POSTS_OF_TAG ](state, { data }) {
    state.oneTagPosts = new SpecificPostsList(data);
  },
};

const getters = {};

export class TagsModule implements Module<TagsState, RootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
