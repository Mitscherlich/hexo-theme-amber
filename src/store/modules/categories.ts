import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { fetchAllCategories, fetchPostsListByCategory } from '@/api/hexo';
import { Category, SpecificPostsList } from '@/models/post';
import {
  FETCH_CATEGORIES, SET_CATEGORIES,
  FETCH_RELATED_POSTS_OF_CATEGORY, SET_RELATED_POSTS_OF_CATEGORY,
  CATEGORIES_TREE,
} from '@/store/types';
import { RootState } from '@/store';

/* tslint:disable:max-classes-per-file */

export class CategoriesState {
  public categories: Category[] = [];
  public oneCategoryPosts: SpecificPostsList = new SpecificPostsList();
}

const state = (): CategoriesState => ({
  categories: [],
  oneCategoryPosts: new SpecificPostsList(),
});

const actions: ActionTree<CategoriesState, RootState> = {
  async [ FETCH_CATEGORIES ]({ commit }) {
    const { data } = await fetchAllCategories();
    commit(SET_CATEGORIES, { data });
  },
  async [ FETCH_RELATED_POSTS_OF_CATEGORY ]({ commit }, { slug }) {
    const { data } = await fetchPostsListByCategory(slug);
    commit(SET_RELATED_POSTS_OF_CATEGORY, { data });
  },
};

const mutations: MutationTree<CategoriesState> = {
  /* tslint:disable:no-shadowed-variable */
  [ SET_CATEGORIES ](state, { data }) {
    state.categories = data.map((one: any) => new Category(one));
  },
  [ SET_RELATED_POSTS_OF_CATEGORY ](state, { data }) {
    state.oneCategoryPosts = new SpecificPostsList(data);
  },
};

const getters: GetterTree<CategoriesState, RootState> = {
  [ CATEGORIES_TREE ](state) {
    const categories = state.categories;
    const reducer = reducerFactory(categories);
    const getParent = getParentFactory(categories);
    let accumulation = categories.reduce(reducer, {} as ICategoriesTree);
    while (Object.keys(accumulation).some((slug: string) => slug.includes('/'))) {
      accumulation = Object.keys(accumulation)
        .map((key: string) => accumulation[ key ])
        .reduce(reducer, {} as ICategoriesTree);
    }
    return Object.keys(accumulation).map((key: string) => accumulation[ key ]);
  },
};

export class CategoryTree extends Category {
  public children = [];

  constructor(raw?: any) {
    super(raw);
    if (raw) {
      for (const key of Object.keys(this)) {
        if (raw.hasOwnProperty(key)) {
          Object.assign(this, { [ key ]: raw[ key ] });
        }
      }
    }
  }
}

declare interface ICategoriesTree {
  [ name: string ]: CategoryTree;
}

function getParentFactory(categories: Category[]) {
  return function getParent(parentName: string) {
    return categories.find(({ slug }) => slug === parentName);
  };
}

function reducerFactory(categories: Category[]) {
  const getParent = getParentFactory(categories);
  return function reducer(accumulation: ICategoriesTree, item: Category): ICategoriesTree {
    if (item.parent.length) {
      const parent = new CategoryTree(getParent(item.parent));
      return {
        ...accumulation,
        [ parent.slug ]: new CategoryTree({
          ...parent,
          children: [
            ...parent.children,
            new CategoryTree(item),
          ],
        }),
      };
    } else {
      accumulation[ item.slug ] = new CategoryTree(item);
      return accumulation;
    }
  };
}

export class CategoriesModule implements Module<CategoriesState, RootState>  {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
  public getters = getters;
}
