export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    all: (state) => state.items,
    findProd: (state) => (id) => state.items.findIndex((pr) => pr.id === id),
  },
  mutations: {
    addProd(state, { id, cnt }) {
      state.items.push({ id, cnt });
    },
    changeCnt(state, { idx, addCnt }) {
      state.items[idx].cnt = Math.max(1, state.items[idx].cnt + addCnt);
    },
  },
  actions: {
    add(ctx, info) {
      const idx = ctx.state.items.findIndex((pr) => pr.id === info.id);
      if (idx !== -1) ctx.commit('changeCnt', { idx, addCnt: info.cnt });
      else ctx.commit('addProd', info);
    },
  },
};
