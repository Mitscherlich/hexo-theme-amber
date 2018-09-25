import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { fetchPostsList } from '@/api/hexo';
import { PostsList, Post } from '@/models/post';
import { FETCH_ARCHIVES_POSTS_LIST, SET_ARCHIVES_POSTS_LIST, TIME_LINE_LIST } from '@/store/types';
import { RootState } from '@/store';
import moment from 'moment';

/* tslint:disable:max-classes-per-file */

interface ITimeLineEntities {
  [ key: string ]: Post[];
}

export interface ITimeLine {
  keys: string[];
  entities: ITimeLineEntities[];
}

export class ArchivesState {
  public postsList: PostsList = new PostsList();
  public page: number = 0;
}

const state = (): ArchivesState => ({
  postsList: new PostsList(),
  page: 0,
});

const actions: ActionTree<ArchivesState, RootState> = {
  async [ FETCH_ARCHIVES_POSTS_LIST ]({ commit }, { page }) {
    const { data } = await fetchPostsList(page);
    commit(SET_ARCHIVES_POSTS_LIST, { data, page });
  },
};

const mutations: MutationTree<ArchivesState> = {
  /* tslint:disable:no-shadowed-variable */
  [ SET_ARCHIVES_POSTS_LIST ](state, { data, page }) {
    state.postsList = new PostsList(data);
    state.page = page;
  },
};

const getters: GetterTree<ArchivesState, RootState> = {
  [ TIME_LINE_LIST ](state) {
    const result: ITimeLineEntities = {};
    for (const post of state.postsList.data) {
      const date = moment(post.date);
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

export class ArchivesModule implements Module<ArchivesState, RootState> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
