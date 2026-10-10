<script setup>
import ReferenceImage from '../ui/ReferenceImage.vue';
import { comparisonProducts, getProductDetails, productSlug } from '../../data/productDetails';
import { formatPrice } from '../../data/products';
defineEmits(['add']);
const models = comparisonProducts.map(product => ({ product, details: getProductDetails(product) }));
const rows = ['Screen size', 'Panel type', 'Resolution', 'Aspect ratio', 'Refresh rate', 'FreeSync', 'Color gamut', 'Stand', 'Built-in speakers', 'Low blue light', 'Material'];
</script>
<template>
    <section id="model-comparison" class="bg-neutral-900 py-14 text-white md:py-20">
        <div class="shop-container">
            <h2 class="section-title mb-10 text-center">Compare the Related Models</h2>
            <div class="overflow-x-auto rounded-xl border border-neutral-800">
                <table class="w-full min-w-180 table-fixed text-left text-sm">
                    <caption class="sr-only">Compare display specifications and prices</caption>
                    <thead><tr><th scope="col" class="w-1/5 p-5 align-bottom text-neutral-400">Find your display</th><th v-for="model in models" :key="model.product.id" scope="col" class="p-5 text-center font-normal">
                        <RouterLink :to="{ name: 'product', params: { slug: productSlug(model.product) } }" class="block"><ReferenceImage v-bind="model.product.image" :alt="model.product.name" class="mx-auto max-w-44 rounded-lg" /><span class="mt-4 block text-sm font-semibold hover:text-blue-400">{{ model.product.name }}</span></RouterLink>
                        <p class="mt-4 font-semibold text-orange-500">{{ formatPrice(model.product.price) }}</p><button type="button" class="shop-button mt-4 w-full text-xs" @click="$emit('add', model.product)">SHOP NOW</button>
                    </th></tr></thead>
                    <tbody><tr class="border-t border-neutral-700"><th scope="row" class="p-5 font-medium">Best for</th><td v-for="model in models" :key="model.product.id" class="p-5 text-neutral-400">{{ model.details.bestFor }}</td></tr><tr v-for="row in rows" :key="row" class="border-t border-neutral-700"><th scope="row" class="p-5 font-medium">{{ row }}</th><td v-for="model in models" :key="model.product.id" class="p-5 text-neutral-400">{{ model.details.specs[row] || 'Not specified' }}</td></tr></tbody>
                </table>
            </div>
        </div>
    </section>
</template>
