<script setup>
import ReferenceImage from '../ui/ReferenceImage.vue';
import ShopIcon from '../ui/ShopIcon.vue';
import { formatPrice } from '../../data/products';
import { productSlug } from '../../data/productDetails';
defineProps({ product: Object });
defineEmits(['preview', 'add']);
</script>
<template>
    <article class="product-card overflow-hidden rounded-lg bg-neutral-50">
        <RouterLink :to="{ name: 'product', params: { slug: productSlug(product) } }" class="product-image-button group relative block w-full" :aria-label="'View ' + product.name">
            <ReferenceImage v-bind="product.image" :alt="product.name" class="transition-transform duration-300" />
            <img v-if="product.hoverImage" :src="product.hoverImage" alt="" aria-hidden="true" loading="lazy" decoding="async" class="product-hover-image absolute inset-0 h-full w-full bg-neutral-950 object-contain opacity-0 transition-opacity duration-200" />
            <span class="absolute top-3 left-3 rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-2.5 py-1 product-badge font-bold text-white">{{ product.badge }}</span>
            <span class="absolute top-3 right-3 rounded-full bg-orange-100 px-2 py-1 product-badge font-semibold text-orange-600">Save {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%</span>
        </RouterLink>
        <div class="product-details flex flex-col">
            <h3 class="product-title font-bold"><RouterLink :to="{ name: 'product', params: { slug: productSlug(product) } }" class="hover:text-blue-600">{{ product.name }}</RouterLink></h3>
            <p class="product-description leading-relaxed text-neutral-500">{{ product.description }}</p>
            <div class="flex flex-wrap gap-1.5"><span v-for="spec in product.specs" :key="spec" class="rounded-sm bg-blue-50 px-2 py-1 product-spec font-medium text-blue-600">{{ spec }}</span></div>
            <div class="flex items-center gap-2 py-1"><span class="product-price font-bold text-orange-600">{{ formatPrice(product.price) }}</span><del class="text-xs text-neutral-500">{{ formatPrice(product.originalPrice) }}</del></div>
            <button type="button" class="shop-button w-full gap-2 text-xs" @click="$emit('add', product)"><ShopIcon name="cart" class="size-4" /> SHOP NOW</button>
        </div>
    </article>
</template>
