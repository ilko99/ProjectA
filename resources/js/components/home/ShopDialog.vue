<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import ReferenceImage from '../ui/ReferenceImage.vue';
import ShopIcon from '../ui/ShopIcon.vue';
import { products, formatPrice } from '../../data/products';
const props = defineProps({ mode: String, product: Object });
const emit = defineEmits(['close', 'add']);
const element = ref(null);
let previousFocus;
watch(() => props.mode, async mode => {
    await nextTick();
    if (mode && !element.value.open) {
        previousFocus = document.activeElement;
        element.value.showModal();
        element.value.querySelector('button')?.focus();
    } else if (!mode && element.value.open) {
        element.value.close();
        previousFocus?.focus();
    }
    document.body.style.overflow = mode ? 'hidden' : '';
});
onBeforeUnmount(() => { document.body.style.overflow = ''; });
function backdrop(event) { if (event.target === element.value) emit('close'); }
</script>
<template>
    <dialog ref="element" aria-labelledby="shop-dialog-title" class="shop-dialog rounded-2xl bg-white p-0 text-neutral-900 shadow-2xl" @cancel.prevent="$emit('close')" @click="backdrop">
        <div class="p-6 sm:p-8">
            <div class="mb-6 flex items-center justify-between gap-5"><h2 id="shop-dialog-title" class="text-xl font-semibold">{{ mode === 'compare' ? 'Find your perfect display' : 'A closer look' }}</h2><button type="button" aria-label="Close dialog" class="icon-button" @click="$emit('close')"><ShopIcon name="close" class="size-5" /></button></div>
            <template v-if="mode === 'product' && product">
                <div class="grid gap-6 sm:grid-cols-2">
                    <ReferenceImage v-bind="product.image" :alt="product.name" class="rounded-lg bg-neutral-50" />
                    <div class="flex flex-col justify-center"><p class="text-xs font-semibold text-blue-600">{{ product.badge }}</p><h3 class="mt-3 text-2xl font-semibold">{{ product.name }}</h3><p class="mt-4 text-sm leading-relaxed text-neutral-500">{{ product.description }}</p><div class="mt-4 flex flex-wrap gap-2"><span v-for="spec in product.specs" :key="spec" class="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">{{ spec }}</span></div><p class="mt-5 text-2xl font-bold text-orange-600">{{ formatPrice(product.price) }} <del class="text-sm font-normal text-neutral-400">{{ formatPrice(product.originalPrice) }}</del></p><button type="button" class="shop-button mt-6" @click="$emit('add', product)">ADD TO BAG</button></div>
                </div>
            </template>
            <template v-else-if="mode === 'compare'">
                <p class="mb-5 text-sm text-neutral-500">Compare the featured monitors at a glance.</p>
                <div class="overflow-x-auto"><table class="w-full min-w-120 text-left text-sm"><thead><tr class="border-b border-neutral-200"><th class="py-3 pr-4">Display</th><th class="pr-4">Highlights</th><th class="pr-4">Price</th><th><span class="sr-only">Select product</span></th></tr></thead><tbody><tr v-for="item in products.slice(0, 4)" :key="item.id" class="border-b border-neutral-100"><th class="py-4 pr-4 font-medium">{{ item.name }}</th><td class="pr-4 text-xs text-neutral-500">{{ item.specs.join(' · ') }}</td><td class="whitespace-nowrap pr-4">{{ formatPrice(item.price) }}</td><td><button type="button" :aria-label="'Add ' + item.name + ' to bag'" class="text-xs font-semibold text-blue-600" @click="$emit('add', item)">Add to bag</button></td></tr></tbody></table></div>
            </template>
        </div>
    </dialog>
</template>

