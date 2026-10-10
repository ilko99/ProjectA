<script setup>
import { ref } from 'vue';
import { formatPrice } from '../../data/products';
import ShopIcon from '../ui/ShopIcon.vue';
defineProps({ product: Object, details: Object });
defineEmits(['add', 'buy']);
const quantity = ref(1);
</script>
<template>
    <section aria-label="Product details">
        <span class="rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-3 py-1 text-xs font-semibold text-white">{{ product.badge }}</span>
        <h1 class="mt-4 text-2xl leading-tight font-semibold tracking-tight md:text-3xl xl:text-4xl">{{ details.title }}</h1>
        <a href="#product-reviews" class="mt-5 inline-flex items-center gap-2 text-xs"><span class="text-lg tracking-wide text-amber-400" aria-hidden="true">★★★★★</span> Sample customer reviews</a>
        <div class="mt-5 flex flex-wrap items-center gap-3"><span class="text-3xl font-bold text-orange-600">{{ formatPrice(product.price) }}</span><del class="text-sm text-neutral-500">{{ formatPrice(product.originalPrice) }}</del><span class="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-600">Save {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%</span></div>
        <div class="mt-6 rounded-xl bg-gradient-to-r from-orange-100 to-amber-50 p-5"><p class="text-sm font-bold">Flash Sale</p><p class="mt-1 text-sm text-neutral-700">A bigger view. A better deal.</p><p class="mt-2 text-xs text-neutral-500">Current sample sale price shown above.</p></div>
        <ul class="my-7 space-y-3 text-sm leading-relaxed"><li v-for="[title, description] in details.highlights" :key="title"><span class="font-semibold">{{ title }}:</span> {{ description }}</li></ul>
        <div class="border-t border-neutral-200 pt-6">
            <div class="flex gap-3">
                <div class="flex shrink-0 items-center rounded-lg border border-neutral-200"><button type="button" :disabled="quantity <= 1" aria-label="Decrease product quantity" class="size-11 text-lg disabled:text-neutral-300" @click="quantity--">−</button><input v-model.number="quantity" type="number" min="1" max="99" aria-label="Product quantity" class="w-10 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" @change="quantity = Math.max(1, Math.min(99, Math.floor(Number(quantity) || 1)))" /><button type="button" :disabled="quantity >= 99" aria-label="Increase product quantity" class="size-11 text-lg disabled:text-neutral-300" @click="quantity++">+</button></div>
                <button type="button" class="shop-button flex-1 gap-2" @click="$emit('add', Math.max(1, Math.min(99, Math.floor(Number(quantity) || 1))))"><ShopIcon name="cart" class="size-4" /> ADD TO CART</button>
            </div>
            <button type="button" class="mt-3 w-full rounded-full bg-neutral-950 py-3 text-sm font-semibold text-white hover:bg-neutral-800" @click="$emit('buy', Math.max(1, Math.min(99, Math.floor(Number(quantity) || 1))))">BUY NOW</button>
            <p class="mt-3 text-center text-xs text-neutral-500">Card or cash on delivery at checkout</p>
        </div>
        <div class="mt-7 grid grid-cols-2 gap-4 rounded-xl bg-neutral-50 p-5 text-xs"><span class="flex items-center gap-2"><ShopIcon name="truck" class="size-5 text-blue-500" /> Free & Fast Shipping</span><span class="flex items-center gap-2"><ShopIcon name="box" class="size-5 text-blue-500" /> {{ details.specs.Warranty || 'Up to 3-Year Warranty' }}</span></div>
        <p class="mt-4 text-[11px] text-neutral-400">Storefront preview using sample product information.</p>
    </section>
</template>
