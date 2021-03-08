import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationTriangle,
  faSpinner,
  faCheckCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';

library.add(faExclamationTriangle, faSpinner, faCheckCircle, faShoppingCart);

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
