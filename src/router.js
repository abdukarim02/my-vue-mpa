import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Categories from './views/Categories.vue';
import AllProducts from './views/AllProducts.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categories', component: Categories },
  { path: '/allproducts', component: AllProducts } // Removed space
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

