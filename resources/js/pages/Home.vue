<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from '../components/layout/SiteHeader.vue';
import SiteNav from '../components/layout/SiteNav.vue';
import SiteFooter from '../components/layout/SiteFooter.vue';
import HeroSection from '../components/home/HeroSection.vue';
import BenefitsBar from '../components/home/BenefitsBar.vue';
import BestSellers from '../components/home/BestSellers.vue';
import BrandStats from '../components/home/BrandStats.vue';
import CategorySection from '../components/home/CategorySection.vue';
import ScenarioSection from '../components/home/ScenarioSection.vue';
import ComparisonBanner from '../components/home/ComparisonBanner.vue';
import CustomerReviews from '../components/home/CustomerReviews.vue';
import ShopDialog from '../components/home/ShopDialog.vue';
import CartDrawer from '../components/home/CartDrawer.vue';
import { products } from '../data/products';
import { useScrollReveal } from '../composables/useScrollReveal';
import { useCart } from '../composables/useCart';

const page = ref(null);
useScrollReveal(page);

const route = useRoute();
const category = ref(route.query.category === 'frames' ? 'frames' : 'monitors');
const search = ref(typeof route.query.search === 'string' ? route.query.search : '');
const selectedProduct = ref(null);
const dialog = ref(null);
const { cart, cartCount, addItem, changeQuantity, removeItem } = useCart();
const cartOpen = ref(false);
const visibleProducts = computed(() => products.filter(product => product.category === category.value && `${product.name} ${product.description} ${product.specs.join(' ')}`.toLowerCase().includes(search.value.toLowerCase().trim())));

function browse(value = 'monitors') {
    category.value = value;
    search.value = '';
    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
}
function preview(product) {
    selectedProduct.value = product;
    dialog.value = 'product';
}
function addToCart(product) {
    addItem(product);
    dialog.value = null;
    cartOpen.value = true;
}
function searchProducts(value) {
    search.value = value;
    if (!visibleProducts.value.length) category.value = category.value === 'monitors' ? 'frames' : 'monitors';
    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
}
onMounted(() => {
    if (search.value) searchProducts(search.value);
    else if (route.query.category) document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
    <div ref="page" class="bg-white text-neutral-950">
        <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        <SiteHeader :cart-count="cartCount" @search="searchProducts" @cart="cartOpen = true" />
        <SiteNav @browse="browse" />
        <main id="main">
            <HeroSection @browse="browse" />
            <BenefitsBar />
            <BestSellers v-model:category="category" :products="visibleProducts" :search="search" @preview="preview" @add="addToCart" @clear-search="search = ''" />
            <BrandStats />
            <CategorySection @browse="browse" />
            <ScenarioSection @browse="browse" />
            <ComparisonBanner @compare="dialog = 'compare'" />
            <CustomerReviews />
        </main>
        <SiteFooter @browse="browse" />
        <ShopDialog :mode="dialog" :product="selectedProduct" @close="dialog = null" @add="addToCart" />
        <CartDrawer :open="cartOpen" :cart="cart" @close="cartOpen = false" @add="addToCart" @quantity="changeQuantity" @remove="removeItem" />
        <a href="#top" aria-label="Back to top" class="fixed right-5 bottom-5 z-20 grid size-11 place-items-center rounded-full border border-blue-200 bg-white text-xl text-blue-600 shadow-lg">↑</a>
    </div>
</template>
