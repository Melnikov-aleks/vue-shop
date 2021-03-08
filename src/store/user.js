import { Auth } from '@/api/';

class User {
  constructor(user) {
    this.id = user.localId;
  }
}

export default {
  namespaced: true,
  state: {
    user: {},
    loading: false,
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    hasLogin(state) {
      return !!state.user?.id;
    },
    userID(state) {
      return state.user.id;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = new User(user);
    },
    clearUser(state) {
      state.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    startReq(state) {
      state.loading = true;
    },
    endReq(state) {
      state.loading = false;
    },
  },
  actions: {
    logOut(ctx) {
      ctx.commit('clearUser');
      ctx.commit('cart/clearCart', null, { root: true });
    },
    async register(ctx, { email, password }) {
      if (ctx.getters.isLoading) throw new Error('Not available');
      const user = await ctx.dispatch('doRequest', Auth.register(email, password));
      ctx.dispatch('createUser', user);
    },
    async login(ctx, { email, password }) {
      if (ctx.getters.isLoading) throw new Error('Not available');
      const user = await ctx.dispatch('doRequest', Auth.login(email, password));
      ctx.dispatch('createUser', user);
    },
    createUser(ctx, user) {
      localStorage.setItem('token', user.idToken);
      localStorage.setItem('refreshToken', user.refreshToken);

      ctx.commit('setUser', user);
      ctx.dispatch('cart/compileCart', ctx.getters.userID, { root: true });
    },
    async checkUser(ctx) {
      if (localStorage.getItem('token')) {
        try {
          const user = await ctx.dispatch(
            'doRequest',
            Auth.getUserByToken(localStorage.getItem('token'))
          );
          ctx.commit('setUser', user);
          ctx.dispatch('cart/compileCart', ctx.getters.userID, { root: true });
        } catch (e) {
          ctx.commit('clearUser');
        }
      }
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
