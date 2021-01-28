import { createStore } from 'vuex';

import products from './products';
import cart from './cart';

export default createStore({
  modules: {
    products,
    cart,
  },
  strict: process.env.NODE_ENV !== 'production',
});

// eslint-disable-next-line import/first
import 'bootstrap/dist/css/bootstrap.css';
