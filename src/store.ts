import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { MetaState, MetaModule } from './store/modules/global';
import { HomeState, HomeModule } from './store/modules/home';
import { ArchivesState, ArchivesModule } from './store/modules/archives';
import { CategoriesState, CategoriesModule } from './store/modules/categories';
import { TagsState, TagsModule } from './store/modules/tag';
import { DetailableState, DetailableModule } from './store/modules/detailable';
import { Route } from 'vue-router';

Vue.use(Vuex);

export interface IContext {
  store: Store<any>;
  route: Route;
}

export class RootState {
  public meta = new MetaState();
  public home = new HomeState();
  public archives = new ArchivesState();
  public categories = new CategoriesState();
  public tags = new TagsState();
  public detailable = new DetailableState();
}

export default new Vuex.Store({
  modules: {
    meta: new MetaModule(),
    home: new HomeModule(),
    archives: new ArchivesModule(),
    categories: new CategoriesModule(),
    tags: new TagsModule(),
    detailable: new DetailableModule(),
  },
});
