<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ShopIcon from '../ui/ShopIcon.vue';
import ReferenceImage from '../ui/ReferenceImage.vue';
import { products, formatPrice } from '../../data/products';

const props = defineProps({ open: Boolean, cart: Array });
const emit = defineEmits(['close', 'add', 'remove', 'quantity']);
const router = useRouter();
function checkout() {
    if (!props.cart.length) return;
    emit('close');
    router.push({ name: 'checkout' });
}
const element = ref(null);
const visible = ref(false);
const recommendationIndex = ref(0);
const total = computed(() => props.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
const count = computed(() => props.cart.reduce((sum, item) => sum + item.quantity, 0));
const recommendations = computed(() => products.filter(product => !props.cart.some(item => item.product.id === product.id)).slice(0, 5));
const recommendation = computed(() => recommendations.value[recommendationIndex.value % recommendations.value.length]);
let previousFocus;
let closeTimer;
let animationFrame;

watch(() => recommendations.value.length, () => { recommendationIndex.value = 0; });
watch(() => props.open, async open => {
    clearTimeout(closeTimer);
    cancelAnimationFrame(animationFrame);
    await nextTick();
    if (open) {
        if (!element.value.open) {
            previousFocus = document.activeElement;
            element.value.showModal();
        }
        document.body.style.overflow = 'hidden';
        animationFrame = requestAnimationFrame(() => { visible.value = true; });
        element.value.querySelector('[aria-label="Close cart"]')?.focus();
    } else {
        visible.value = false;
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280;
        closeTimer = setTimeout(() => {
            element.value?.close();
            document.body.style.overflow = '';
            previousFocus?.focus();
        }, delay);
    }
});
onBeforeUnmount(() => {
    clearTimeout(closeTimer);
    cancelAnimationFrame(animationFrame);
    document.body.style.overflow = '';
});
function moveRecommendation(step) {
    const length = recommendations.value.length;
    if (length) recommendationIndex.value = (recommendationIndex.value + step + length) % length;
}
</script>

<template>
    <dialog ref="element" class="cart-drawer" :class="{ 'cart-drawer-visible': visible }" aria-labelledby="cart-title" @cancel.prevent="$emit('close')" @click="event => { if (event.target === element) $emit('close'); }">
        <aside class="cart-drawer-panel">
            <div class="flex shrink-0 items-center justify-center gap-2 bg-orange-700 px-5 py-3 text-xs font-medium text-white"><ShopIcon name="truck" class="size-4" /> Free Shipping & Fast Delivery</div>
            <header class="flex shrink-0 items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2 id="cart-title" class="text-lg font-semibold">Your Cart <span aria-live="polite">({{ count }})</span></h2>
                <button type="button" class="icon-button" aria-label="Close cart" @click="$emit('close')"><ShopIcon name="close" class="size-5" /></button>
            </header>
            <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div class="px-6">
                    <div v-if="!cart.length" class="py-12 text-center"><ShopIcon name="cart" class="mx-auto size-10 text-neutral-300" /><p class="mt-4 font-semibold">Your cart is waiting.</p><p class="mt-2 text-sm text-neutral-500">Find a display you love.</p><button type="button" class="shop-button mt-6" @click="$emit('close')">CONTINUE SHOPPING</button></div>
                    <ul v-else class="divide-y divide-neutral-200">
                        <li v-for="item in cart" :key="item.product.id" class="flex gap-3 py-5">
                            <ReferenceImage v-bind="item.product.image" :alt="item.product.name" class="w-23! self-start shrink-0 rounded-lg bg-neutral-50" />
                            <div class="min-w-0 flex-1">
                                <div class="flex items-start justify-between gap-2"><h3 class="text-sm leading-relaxed font-semibold">{{ item.product.name }}</h3><button type="button" class="grid size-6 shrink-0 place-items-center text-neutral-500 hover:text-neutral-950" :aria-label="'Remove ' + item.product.name" @click="$emit('remove', item.product.id)"><ShopIcon name="close" class="size-4" /></button></div>
                                <p class="mt-2 rounded-full bg-orange-50 px-2 py-1 text-[10px] font-medium text-orange-700">Flash Sale · Save {{ Math.round((1 - item.product.price / item.product.originalPrice) * 100) }}%</p>
                                <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                                    <div class="flex items-center rounded-md border border-neutral-200">
                                        <button type="button" :disabled="item.quantity <= 1" :aria-label="'Decrease quantity of ' + item.product.name" class="size-8 text-lg disabled:text-neutral-300" @click="$emit('quantity', { id: item.product.id, quantity: item.quantity - 1 })">−</button>
                                        <span class="min-w-5 text-center text-xs" aria-live="polite">{{ item.quantity }}</span>
                                        <button type="button" :aria-label="'Increase quantity of ' + item.product.name" class="size-8 text-lg" @click="$emit('quantity', { id: item.product.id, quantity: item.quantity + 1 })">+</button>
                                    </div>
                                    <div class="text-right"><del class="text-[10px] text-neutral-400">{{ formatPrice(item.product.originalPrice * item.quantity) }}</del><p class="text-sm font-semibold text-orange-600">{{ formatPrice(item.product.price * item.quantity) }}</p></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <section v-if="recommendation" class="border-t border-neutral-200 px-6 py-5" aria-label="Recommended products">
                    <div class="mb-4 flex items-center justify-between"><h3 class="text-sm font-semibold">Perfect Match With</h3><div class="flex items-center gap-2"><button type="button" aria-label="Previous recommendation" class="grid size-7 place-items-center" @click="moveRecommendation(-1)"><ShopIcon name="arrow" class="size-4 rotate-180" /></button><span class="text-xs text-neutral-500">{{ recommendationIndex + 1 }}/{{ recommendations.length }}</span><button type="button" aria-label="Next recommendation" class="grid size-7 place-items-center" @click="moveRecommendation(1)"><ShopIcon name="arrow" class="size-4" /></button></div></div>
                    <div class="flex items-center gap-3 rounded-lg bg-neutral-50 p-3"><ReferenceImage v-bind="recommendation.image" :alt="recommendation.name" class="w-16! shrink-0 rounded" /><div class="min-w-0 flex-1"><h4 class="text-xs leading-relaxed font-semibold">{{ recommendation.name }}</h4><p class="mt-2 text-sm font-semibold text-orange-600">{{ formatPrice(recommendation.price) }}</p></div><button type="button" class="shop-button px-3! py-2! text-[11px]!" :aria-label="'Add ' + recommendation.name + ' to cart'" @click="$emit('add', recommendation)">+ ADD</button></div>
                </section>
                <section class="border-t border-neutral-200 px-6 py-5"><h3 class="mb-4 text-sm font-semibold">Policy and Service</h3><div class="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px]"><span class="flex items-center gap-2"><ShopIcon name="truck" class="size-4 shrink-0" /> Fast & Free Shipping</span><span class="flex items-center gap-2"><ShopIcon name="box" class="size-4 shrink-0" /> Up to 3-Year Warranty</span><span class="flex items-center gap-2"><ShopIcon name="globe" class="size-4 shrink-0" /> Worldwide Community</span><span class="flex items-center gap-2"><ShopIcon name="users" class="size-4 shrink-0" /> Customer Support</span></div></section>
            </div>
            <footer class="shrink-0 border-t border-neutral-200 bg-white px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
                <div class="flex justify-between gap-4 text-sm font-semibold"><span>Estimated total</span><span aria-live="polite">{{ formatPrice(total) }} EUR</span></div>
                <button type="button" :disabled="!cart.length" class="mt-5 w-full rounded-full bg-yellow-300 py-3 text-sm font-bold text-neutral-900 disabled:opacity-40" @click="checkout">CHECK OUT</button>
                <p class="mt-3 text-center text-[10px] leading-relaxed text-neutral-500">Preview cart · Shipping and discounts calculated at checkout.</p>
                <p class="mt-2 text-center text-[10px] text-neutral-400">Your cart resets when you reload.</p>
            </footer>
        </aside>
    </dialog>
</template>

