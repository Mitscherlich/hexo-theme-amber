import { Component, Vue } from 'vue-property-decorator';
import { CATEGORIES_TREE, FETCH_CATEGORIES } from '@/store/types';
import { CategoryTree } from '@/store/modules/categories';
import { Category } from '@/models/post';
import { IContext } from '@/store';

@Component
export default class CategoriesPage extends Vue {
  private search: string = '';

  private get categoriesTree() {
    return this.$store.getters[ `categories/${CATEGORIES_TREE}` ];
  }

  private get treeProps() {
    return {
      label: 'name',
      isLeaf: (data: CategoryTree) => !Array.isArray(data) && !data.children.length,
    };
  }

  private get showSuggestions() {
    return (
      this.categoriesTree &&
      this.categoriesTree.length > 0
    );
  }

  private get suggestions(): CategoryTree[] {
    const query = this.search.trim().toLowerCase();
    if (!query) {
      return this.categoriesTree;
    }
    const { categoriesTree } = this;
    const matches = (item: Category) => (
      item.name &&
      item.name.toLowerCase().indexOf(query) > -1
    );
    const res = [];
    for (const category of categoriesTree) {
      if (matches(category)) {
        res.push(category);
      }
    }
    return res;
  }

  private async fetch({ store }: IContext) {
    await store.dispatch(`categories/${FETCH_CATEGORIES}`);
  }
  private filter(search: string, data: CategoryTree): boolean {
    if (!search) {
      return true;
    }
    return data.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }

  private nodeClick(data?: CategoryTree) {
    if (!data) {
      return;
    }
    this.$router.push({
      name: 'related-posts-page',
      params: { type: 'category', slug: data.slug },
    });
  }
}
