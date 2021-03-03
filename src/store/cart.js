import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
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
    addProd(state, prod) {
      state.items.push({ ...prod, cnt: Math.max(1, prod.cnt) });
    },
    setCnt(state, { idx, newCnt }) {
      state.items[idx].cnt = Math.max(1, newCnt);
    },
    // changeCnt(state, { idx, addCnt }) {
    //   state.items[idx].cnt = Math.max(1, state.items[idx].cnt + addCnt);
    // },
    remove(state, id) {
      state.items = state.items.filter((pr) => pr.id !== id);
    },
    setCart(state, cart) {
      state.items = [...cart];
    },
  },
  actions: {
    async add(ctx, info) {
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
    async toRemoteCart(ctx, prod) {
      if (ctx.rootGetters['user/hasLogin']) {
        try {
          axios.patch(
            `https://vue-store-ad75d-default-rtdb.firebaseio.com/users/${ctx.rootGetters['user/userID']}/cart/${prod.id}.json`,
            {
              cnt: prod.cnt,
              title: prod.title,
              price: prod.price,
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    async remove(ctx, id) {
      if (ctx.rootGetters['user/hasLogin']) {
        try {
          await axios.delete(
            `https://vue-store-ad75d-default-rtdb.firebaseio.com/users/${ctx.rootGetters['user/userID']}/cart/${id}.json`
          );
        } catch (e) {
          console.log(e);
        }
      }
      ctx.commit('remove', id);
    },
    async compileCart(ctx, userID) {
      try {
        const resp = await axios.get(
          `https://vue-store-ad75d-default-rtdb.firebaseio.com/users/${userID}/cart.json`
        );
        const cart = resp.data;
        if (cart) {
          const newCart = [
            ...ctx.state.items,
            ...Object.keys(cart)
              .filter((key) => ctx.getters.findProdIdx(key) === -1)
              .map((key) => ({ ...cart[key], id: key })),
          ];
          ctx.commit('setCart', newCart);
        }
        axios.put(
          `https://vue-store-ad75d-default-rtdb.firebaseio.com/users/${userID}/cart.json`,
          ctx.getters.itemsToSending
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
