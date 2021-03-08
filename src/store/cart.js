import { DatabaseUser } from '@/api/';

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
  },
  getters: {
    all(state) {
      return state.items;
    },
    length(state) {
      return state.items.length;
    },
    findProdIdx: (state) => (id) =>
      state.items.findIndex((pr) => pr.id.toString() === id.toString()),

    item: (state, getters) => (id) => state.items[getters.findProdIdx(id)],

    itemsToSending(state) {
      return state.items.reduce((acc, { id, title, price, cnt }) => {
        acc[id] = { title, price, cnt };
        return acc;
      }, {});
    },
  },
  mutations: {
    clearCart(state) {
      state.items = [];
    },
    addProd(state, prod) {
      state.items.push({ ...prod, cnt: Math.max(1, prod.cnt) });
    },
    setCnt(state, { idx, newCnt }) {
      state.items[idx].cnt = Math.max(1, newCnt);
    },
    remove(state, id) {
      state.items = state.items.filter((pr) => pr.id !== id);
    },
    setCart(state, cart) {
      state.items = [...cart];
    },
    startReq(state) {
      state.loading = true;
    },
    endReq(state) {
      state.loading = false;
    },
  },
  actions: {
    add(ctx, info) {
      const idx = ctx.getters.findProdIdx(info.id);
      if (idx === -1) {
        ctx.dispatch('toRemoteCart', info);
        ctx.commit('addProd', info);
      } else ctx.dispatch('set', { ...info, cnt: ctx.getters.all[idx].cnt + info.cnt });
    },
    set(ctx, info) {
      const idx = ctx.getters.findProdIdx(info.id);
      const newCnt = parseInt(info.cnt, 10) || 1;
      ctx.dispatch('toRemoteCart', {
        ...info,
        cnt: newCnt,
      });
      ctx.commit('setCnt', {
        idx,
        newCnt,
      });
    },
    toRemoteCart(ctx, prod) {
      if (ctx.rootGetters['user/hasLogin']) {
        DatabaseUser.editItem(ctx.rootGetters['user/userID'], prod.id, {
          cnt: prod.cnt,
          title: prod.title,
          price: prod.price,
        });
      }
    },
    async remove(ctx, id) {
      if (ctx.rootGetters['user/hasLogin']) {
        await DatabaseUser.removeItem(ctx.rootGetters['user/userID'], id);
      }
      ctx.commit('remove', id);
    },
    async compileCart(ctx, userID) {
      const cart = await ctx.dispatch('doRequest', DatabaseUser.getCart(userID));
      if (cart) {
        const newCart = [
          ...ctx.state.items,
          ...Object.keys(cart)
            .filter((key) => ctx.getters.findProdIdx(key) === -1)
            .map((key) => ({ ...cart[key], id: key })),
        ];
        ctx.commit('setCart', newCart);
      }
      DatabaseUser.setCart(userID, ctx.getters.itemsToSending);
    },
    async toOrder(ctx) {
      await DatabaseUser.toOrder(
        ctx.rootGetters['user/userID'],
        ctx.getters.itemsToSending
      );
      ctx.commit('clearCart');
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
