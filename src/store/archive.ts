import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import day from 'dayjs';
import merge from 'lodash.merge';
import Post from '@/models/post';
import { fetchPosts } from '@/api/hexo';
import { FETCH_ARCHIVES_POSTS_LIST, SET_ARCHIVES_POSTS_LIST, TIME_LINE_LIST } from './types';
import { IPosts } from './home';
import { IRootState } from '.';

interface ITimeLineEntities {
  [ key: string ]: Post[];
}

export interface ITimeLine {
  keys: string[];
  entities: ITimeLineEntities[];
}

export interface IArchiveState {
  posts: IPosts;
  page: number;
}

const state = (): IArchiveState => ({
  posts: { data: [], pageCount: 0, pageSize: 0, total: 0 },
  page: 0,
});

const actions: ActionTree<IArchiveState, IRootState> = {
  async [FETCH_ARCHIVES_POSTS_LIST]({ commit }, { page }) {
    const { data } = await fetchPosts(page);
    commit(SET_ARCHIVES_POSTS_LIST, { data, page });
  },
};

const mutations: MutationTree<IArchiveState> = {
  // tslint:disable:no-shadowed-variable
  [SET_ARCHIVES_POSTS_LIST](state, { data, page }) {
    // FIXME: merge(state, { page, posts: data });
    state.page = page;
    state.posts = data;
  },
};

const getters: GetterTree<IArchiveState, IRootState> = {
  [TIME_LINE_LIST](state) {
    const result: ITimeLineEntities = {};
    for (const post of state.posts.data) {
      const date = day(post.date);
      const yearAndMonth = `${date.year()}-${date.month() + 1}`;
      if (result[ yearAndMonth ]) {
        result[ yearAndMonth ].push(post);
      } else {
        result[ yearAndMonth ] = [ post ];
      }
    }
    return { keys: Object.keys(result), entities: result };
  },
};

export default class ArchiveModule implements Module<IArchiveState, IRootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
