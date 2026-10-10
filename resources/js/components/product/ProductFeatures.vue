<script setup>
import ReferenceImage from '../ui/ReferenceImage.vue';
import { featureImage } from '../../data/productDetails';
const tiles = [
    { title: '180Hz performance', image: featureImage('features', [218, 113, 643, 326], [2048, 914]), class: 'md:col-span-2' },
    { title: '2.5K resolution', image: featureImage('features', [868, 113, 317, 326], [2048, 914]), class: '' },
    { title: 'Adjustable integrated stand', image: featureImage('features', [1194, 113, 315, 633], [2048, 914]), class: 'md:row-span-2' },
    { title: 'Dual stereo speakers', image: featureImage('features', [1518, 113, 315, 326], [2048, 914]), class: '' },
    { title: '107% sRGB color', image: featureImage('features', [218, 448, 316, 297], [2048, 914]), class: '' },
    { title: 'Metal body and matte finish', image: featureImage('features', [544, 448, 641, 297], [2048, 914]), class: 'md:col-span-2' },
    { title: 'HDR color and contrast', image: featureImage('features', [1518, 448, 315, 297], [2048, 914]), class: '' },
];
</script>
<template>
    <section class="bg-black py-14 md:py-20" aria-label="Display feature highlights">
        <div class="shop-container grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            <ReferenceImage v-for="tile in tiles" :key="tile.title" v-bind="tile.image" :alt="tile.title" :class="['h-full rounded-xl', tile.class]" />
        </div>
    </section>
</template>
