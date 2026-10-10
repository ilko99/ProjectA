<script setup>
import CardCarousel from '../ui/CardCarousel.vue';
import ProductCard from './ProductCard.vue';
defineProps({ products: Array, category: String, search: String });
defineEmits(['update:category', 'preview', 'add', 'clear-search']);
</script>
<template>
    <section id="best-sellers" class="shop-container scroll-mt-6 py-12 md:pt-14 md:pb-18">
        <h2 class="section-title text-center">BEST SELLERS</h2>
        <div class="mt-5 mb-9 flex justify-center gap-6" role="tablist" aria-label="Product categories">
            <button v-for="tab in [{ id: 'monitors', title: 'PORTABLE MONITORS' }, { id: 'frames', title: 'FOR HOME & FAMILY' }]" :key="tab.id" type="button" role="tab" :aria-selected="category === tab.id" :class="['border-b pb-2 text-xs font-semibold sm:text-sm', category === tab.id ? 'border-neutral-900 text-neutral-950' : 'border-transparent text-neutral-500']" @click="$emit('update:category', tab.id)">{{ tab.title }}</button>
        </div>
        <div v-if="search" class="mb-5 flex items-center justify-center gap-4 text-sm text-neutral-600" aria-live="polite">Results for “{{ search }}” <button type="button" class="text-blue-600 underline" @click="$emit('clear-search')">Clear search</button></div>
        <CardCarousel v-if="products.length" label="best sellers" :reset-key="category + search">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @preview="$emit('preview', $event)" @add="$emit('add', $event)" />
        </CardCarousel>
        <p v-else class="py-16 text-center text-neutral-500">No matching products in this collection. Try the other category or another search.</p>
    </section>
</template>

