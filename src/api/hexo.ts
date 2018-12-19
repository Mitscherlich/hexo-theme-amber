import axios from 'axios';

// GET /api/data.json
export const fetchSiteData = async () => {
  return axios.get('/api/data.json');
};

// GET /api/site.json
export const fetchHexoConfig = async () => {
  return axios.get('/api/site.json');
};

// GET /api/posts/:page.json (default 1.json)
export const fetchPosts = async (currentPage?: number) => {
  currentPage = currentPage || 1;
  return axios.get(`/api/posts/${currentPage}.json`);
};

// GET /api/tags/:tag.json
export const fetchPostsByTag = async (tagName: string) => {
  return axios.get(`/api/tags/${tagName}.json`);
};

// GET /api/categories/:slug.json
export const fetchPostsByCategory = async (categoryName: string) => {
  return axios.get(`/api/categories/${categoryName}.json`);
};

// GET /api/articles/:slug.json
export const fetchPostBySlug = async (slug: string) => {
  return axios.get(`/api/articles/${slug}.json`);
};

// GET /api/tags.json
export const fetchTags = async () => {
  return axios.get('/api/tags.json');
};

// GET /api/categories.json
export const fetchCategories = async () => {
  return axios.get('/api/categories.json');
};

// GET /api/pages/about/index.json
// source : e.g. about/index
export const fetchImplicitPageBySource = async (source: string) => {
  return axios.get(`/api/pages/${source}.json`);
};
