import { createRouter, createWebHistory } from 'vue-router';

import Catalog from '@/views/Catalog.vue';
import Cart from '@/views/Cart.vue';
import Product from '@/views/Product.vue';
import Checkout from '@/views/checkout/Base.vue';
import FormMain from '@/views/checkout/Form1.vue';
import FormPayment from '@/views/checkout/FormPayment.vue';

const routes = [
  {
    name: 'catalog',
    path: '/catalog/:category(.*)*',
    component: Catalog,
  },
  { name: 'cart', path: '/cart', component: Cart },
  {
    name: 'checkout',
    path: '/checkout',
    component: Checkout,
    children: [
      { name: 'checkoutStep1', path: '', component: FormMain },
      { name: 'checkoutStepPayment', path: '', component: FormPayment },
    ],
  },
  { name: 'product', path: '/prodict/:id', component: Product },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
