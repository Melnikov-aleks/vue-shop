import { createStore } from 'vuex';

import products from './products';
import cart from './cart';
import user from './user';

export default createStore({
  modules: {
    products,
    cart,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});
