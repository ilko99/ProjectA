<script setup>
import ReferenceImage from '../ui/ReferenceImage.vue';
import { formatPrice } from '../../data/products';
import { useCart } from '../../composables/useCart';
const { cart, subtotal } = useCart();
</script>
<template>
    <section class="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8" aria-label="Order summary">
        <h2 class="mb-6 text-xl font-semibold">Order summary</h2>
        <ul class="flex flex-col gap-6">
            <li v-for="item in cart" :key="item.product.id" class="flex items-center gap-4">
                <div class="relative w-20 shrink-0"><ReferenceImage v-bind="item.product.image" :alt="item.product.name" class="rounded-lg" /><span class="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-neutral-700 text-xs text-white">{{ item.quantity }}</span></div>
                <h3 class="min-w-0 flex-1 text-sm font-medium">{{ item.product.name }}</h3>
                <span class="shrink-0 text-sm">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </li>
        </ul>
        <dl class="mt-7 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm">
            <div class="flex justify-between"><dt>Subtotal</dt><dd>{{ formatPrice(subtotal) }}</dd></div>
            <div class="flex justify-between"><dt>Shipping</dt><dd class="text-blue-600">Free</dd></div>
            <div class="mt-3 flex justify-between border-t border-neutral-200 pt-5 text-xl font-semibold"><dt>Total</dt><dd><span class="mr-2 text-xs font-normal text-neutral-400">EUR</span>{{ formatPrice(subtotal) }}</dd></div>
        </dl>
        <p class="mt-5 text-xs leading-relaxed text-neutral-500">Sample prices and free shipping for this checkout preview.</p>
    </section>
</template>
