import axios from 'axios';

const apiKey = 'AIzaSyDoMeHm1iBnf1yBPHlHaHBcp9fnV8wKVkY';

class User {
  constructor(user) {
    this.id = user.localId;
    this.token = user.idToken;
    this.refreshToken = user.refreshToken;
  }
}

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    hasLogin(state) {
      return !!state.user?.token;
    },
    userID(state) {
      return state.user.id;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = {};
    },
    setUserCart(state, cart) {
      state.user.cart = cart;
    },
  },
  actions: {
    logOut(ctx) {
      ctx.commit('clearUser');
    },
    async register(ctx, { email, password }) {
      try {
        const respUsr = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          { email, password, returnSecureToken: true }
        );
        ctx.dispatch('createUser', respUsr.data);
      } catch (e) {
        console.log(e);
      }
    },
    async login(ctx, { email, password }) {
      try {
        const respUsr = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          { email, password, returnSecureToken: true }
        );
        ctx.dispatch('createUser', respUsr.data);
      } catch (e) {
        console.log(e);
      }
    },
    async createUser(ctx, user) {
      ctx.commit('setUser', new User(user));
      ctx.dispatch('cart/compileCart', ctx.getters.userID, { root: true });
    },
  },
};
