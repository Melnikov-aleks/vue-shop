import { DatabaseProducts } from '@/api/';

export default {
  namespaced: true,
  state: {
    items: [],
    categories: [],
    loading: false,
    prodToShow: null,
  },
  getters: {
    all(state) {
      return state.items;
    },
    itemsMap(state) {
      const map = {};
      state.items.forEach((pr, i) => {
        map[pr.id.toString()] = i;
      });
      return map;
    },
    item: (state, getters) => (id) => state.items[getters.itemsMap[id]],
    getCategories(state) {
      return state.categories;
    },
    toShow(state) {
      return state.prodToShow;
    },
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.items = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    startReq(state) {
      state.loading = true;
    },
    endReq(state) {
      state.loading = false;
    },
    setProdToShow(state, prod) {
      state.prodToShow = prod;
    },
  },
  actions: {
    async loadProducts(ctx, cat = null) {
      const products = await ctx.dispatch('doRequest', DatabaseProducts.getProducts(cat));
      const productsArr = Object.keys(products).map((key) => ({
        ...products[key],
        id: key,
      }));
      ctx.commit('setProducts', productsArr);
    },
    async loadProduct(ctx, id) {
      if (ctx.getters.item(id)) {
        ctx.commit('setProdToShow', ctx.getters.item(id));
      } else {
        const prod = await ctx.dispatch('doRequest', DatabaseProducts.getProduct(id));
        ctx.commit('setProdToShow', { ...prod, id });
      }
    },
    async loadCategories(ctx) {
      const categories = await DatabaseProducts.getCategories();
      const categoriesArr = Object.keys(categories);
      ctx.commit('setCategories', categoriesArr);
    },
    async doRequest(ctx, request) {
      try {
        ctx.commit('startReq');
        const resp = await request;
        return resp;
      } finally {
        ctx.commit('endReq');
      }
    },
  },
};
