import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Categories from './views/Categories.vue';
import AllProducts from './views/AllProducts.vue';
import ProductsCard from './views/ProductsCard.vue'; // Если это страница, оставляем в views

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/all-products', name: 'allproducts', component: AllProducts }, // Исправленный URL
  { path: '/products-card', name: 'productscard', component: ProductsCard } // Исправленный URL
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


