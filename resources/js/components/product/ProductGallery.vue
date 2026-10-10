<script setup>
import { computed, ref } from 'vue';
import ReferenceImage from '../ui/ReferenceImage.vue';
import ShopIcon from '../ui/ShopIcon.vue';
import { z3Gallery } from '../../data/productDetails';
const props = defineProps({ product: Object });
const active = ref(0);
const gallery = computed(() => props.product.id === 'monitor-0' ? z3Gallery : [
    { ...props.product.image, label: 'Product view' },
    { source: props.product.hoverImage, label: 'Display details' },
]);
const current = computed(() => gallery.value[active.value]);
function move(step) { active.value = (active.value + step + gallery.value.length) % gallery.value.length; }
</script>
<template>
    <section aria-label="Product image gallery" class="min-w-0">
        <div class="relative overflow-hidden rounded-xl bg-neutral-50">
            <div class="product-gallery-stage">
                <ReferenceImage v-if="current.crop" v-bind="current" :alt="product.name + ' — ' + current.label" class="max-h-full" />
                <img v-else :src="current.source" :alt="product.name + ' — ' + current.label" class="h-full w-full object-contain" />
            </div>
            <button type="button" aria-label="Previous product image" class="carousel-arrow product-gallery-arrow left-0" @click="move(-1)"><ShopIcon name="arrow" class="size-5 rotate-180" /></button>
            <button type="button" aria-label="Next product image" class="carousel-arrow product-gallery-arrow right-0" @click="move(1)"><ShopIcon name="arrow" class="size-5" /></button>
            <span class="absolute top-4 right-4 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">Save {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%</span>
            <p class="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs" aria-live="polite">{{ active + 1 }} / {{ gallery.length }}</p>
        </div>
        <div class="mt-4 flex gap-3 overflow-x-auto pb-2" aria-label="Choose product image">
            <button v-for="(image, index) in gallery" :key="image.label" type="button" :aria-label="image.label" :aria-pressed="active === index" :class="['size-20 shrink-0 overflow-hidden rounded-lg border-2 bg-neutral-50 p-1 md:size-24', active === index ? 'border-blue-500' : 'border-transparent hover:border-neutral-300']" @click="active = index">
                <ReferenceImage v-if="image.crop" v-bind="image" alt="" />
                <img v-else :src="image.source" alt="" class="h-full w-full object-contain" loading="lazy" />
            </button>
        </div>
    </section>
</template>
