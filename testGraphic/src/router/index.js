import { createRouter, createWebHistory } from 'vue-router';
import { RouterView } from 'vue-router';

import Sales from '../pages/Sales.vue';
import Incomes from '../pages/Incomes.vue';
import Orders from '../pages/Orders.vue';
import Stocks from '../pages/Stocks.vue';

const routes = [
  { path: '/', component: Sales },
  { path: '/incomes', component: Incomes },
  { path: '/orders', component: Orders },
  { path: '/stocks', component: Stocks },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;