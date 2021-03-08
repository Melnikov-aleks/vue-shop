import { createRouter, createWebHistory } from 'vue-router';

import E404 from '@/views/E404.vue';
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
    path: '/checkout',
    component: Checkout,
    children: [
      { name: 'checkout', path: '', component: FormMain },
      { name: 'checkoutStepPayment', path: 'payment', component: FormPayment },
    ],
  },
  { name: 'product', path: '/prodict/:id', component: Product },
  { path: '/:pathMatch(.*)*', name: 'E404', component: E404 },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
