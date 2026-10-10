<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SiteHeader from '../components/layout/SiteHeader.vue';
import SiteNav from '../components/layout/SiteNav.vue';
import SiteFooter from '../components/layout/SiteFooter.vue';
import CartDrawer from '../components/home/CartDrawer.vue';
import ProductGallery from '../components/product/ProductGallery.vue';
import ProductPurchase from '../components/product/ProductPurchase.vue';
import ProductFeatures from '../components/product/ProductFeatures.vue';
import ProductDisplayStory from '../components/product/ProductDisplayStory.vue';
import ProductSpecifications from '../components/product/ProductSpecifications.vue';
import ProductComparison from '../components/product/ProductComparison.vue';
import ProductReviews from '../components/product/ProductReviews.vue';
import { products } from '../data/products';
import { getProductDetails, productSlug } from '../data/productDetails';
import { useCart } from '../composables/useCart';
import { useScrollReveal } from '../composables/useScrollReveal';

const route = useRoute();
const router = useRouter();
const product = computed(() => products.find(item => productSlug(item) === route.params.slug));
const details = computed(() => product.value ? getProductDetails(product.value) : null);
const { cart, cartCount, addItem, changeQuantity, removeItem } = useCart();
const cartOpen = ref(false);
const page = ref(null);
useScrollReveal(page);
function browse(category) { router.push({ name: 'home', query: { category } }); }
function addToCart(item, quantity = 1) { addItem(item, quantity); cartOpen.value = true; }
function buyNow(quantity) { addItem(product.value, quantity); router.push({ name: 'checkout' }); }
</script>
<template>
    <div ref="page" class="bg-white text-neutral-950">
        <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        <SiteHeader :cart-count="cartCount" @cart="cartOpen = true" @search="router.push({ name: 'home', query: { search: $event } })" />
        <SiteNav @browse="browse" />
        <main v-if="product" id="main">
            <section class="shop-container py-8 md:py-12">
                <nav aria-label="Breadcrumb" class="mb-8 flex flex-wrap gap-2 text-xs text-neutral-500"><RouterLink :to="{ name: 'home' }" class="hover:text-blue-600">Home</RouterLink><span aria-hidden="true">/</span><button type="button" class="hover:text-blue-600" @click="browse(product.category)">{{ product.category === 'frames' ? 'Digital Photo Frames' : 'Portable Monitors' }}</button><span aria-hidden="true">/</span><span class="text-neutral-900">{{ product.name }}</span></nav>
                <div class="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] xl:gap-12">
                    <ProductGallery :product="product" />
                    <ProductPurchase :product="product" :details="details" @add="addToCart(product, $event)" @buy="buyNow" />
                </div>
            </section>
            <nav class="sticky top-0 z-20 flex flex-wrap justify-center gap-6 border-y border-neutral-200 bg-white/95 px-5 py-4 text-xs font-semibold backdrop-blur" aria-label="Product sections"><a v-if="product.id === 'monitor-0'" href="#product-features">OVERVIEW</a><a href="#specifications">SPECIFICATIONS</a><a v-if="product.category === 'monitors'" href="#model-comparison">COMPARE</a><a href="#product-reviews">REVIEWS</a></nav>
            <div v-if="product.id === 'monitor-0'" id="product-features"><ProductFeatures /><ProductDisplayStory /></div>
            <ProductSpecifications :details="details" />
            <ProductComparison v-if="product.category === 'monitors'" @add="addToCart($event)" />
            <ProductReviews :product="product" />
        </main>
        <main v-else id="main" class="shop-container py-24 text-center"><h1 class="text-3xl font-semibold">Product not found</h1><p class="mt-4 text-neutral-500">This product is not in the sample collection.</p><RouterLink :to="{ name: 'home' }" class="shop-button mt-7">BACK TO SHOP</RouterLink></main>
        <SiteFooter @browse="browse" />
        <CartDrawer :open="cartOpen" :cart="cart" @close="cartOpen = false" @add="addToCart($event)" @quantity="changeQuantity" @remove="removeItem" />
        <a href="#top" aria-label="Back to top" class="fixed right-5 bottom-5 z-20 grid size-11 place-items-center rounded-full border border-blue-200 bg-white text-xl text-blue-600 shadow-lg">&#8593;</a>
    </div>
</template>
