import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

export default createRouter({
    history: createWebHistory(),
    scrollBehavior: (to, from, savedPosition) => savedPosition || (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0 }),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/products/:slug', name: 'product', component: () => import('./pages/Product.vue') },
        { path: '/checkout', name: 'checkout', component: () => import('./pages/Checkout.vue') },
    ],
});
