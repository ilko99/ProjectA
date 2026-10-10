<script setup>
import ReferenceImage from '../ui/ReferenceImage.vue';
import { featureImage } from '../../data/productDetails';
const motionImage = featureImage('motion', [209, 150, 810, 553], [2048, 905]);
const colorImage = featureImage('color', [450, 135, 1140, 794], [2048, 936]);
const modesImage = featureImage('modes', [215, 63, 565, 786], [2048, 877]);
</script>
<template>
    <section class="bg-neutral-900 py-14 text-white md:py-20">
        <div class="shop-container">
            <h2 class="product-story-title">180Hz. Smoother in Every Move.</h2>
            <p class="product-story-copy">Smooth, responsive visuals for gaming, scrolling, video, and everyday work.</p>
            <div class="mt-9 grid gap-5 md:grid-cols-2">
                <figure class="overflow-hidden rounded-xl bg-black"><ReferenceImage v-bind="motionImage" alt="Racing scene with a softer display preview" class="blur-[1.5px]" /><figcaption class="p-5 text-lg font-semibold">Standard 60Hz Display</figcaption></figure>
                <figure class="overflow-hidden rounded-xl bg-black"><ReferenceImage v-bind="motionImage" alt="Racing scene showing the Z3FC display preview" /><figcaption class="p-5 text-lg font-semibold">Arzopa Z3FC 180Hz</figcaption></figure>
            </div>
            <p class="mt-3 text-center text-[11px] text-neutral-500">Illustrative static comparison from the supplied reference.</p>
            <h2 class="product-story-title mt-16">2.5K QHD. See Every Detail.</h2><p class="product-story-copy">2560 × 1440 resolution delivers sharper text and finer detail for work, creativity, and entertainment.</p>
            <div class="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl"><img src="/images/home/arzopa-z3fc-gray.webp" alt="Z3FC 2.5K display highlights" class="w-full" loading="lazy" /></div>
        </div>
    </section>
    <section class="bg-black py-14 text-white md:py-20">
        <div class="shop-container"><h2 class="product-story-title">107% sRGB. More Color. More Life.</h2><p class="product-story-copy">Richer, more vibrant colors bring every image to life.</p><ReferenceImage v-bind="colorImage" alt="Colorful hot air balloons on the Z3FC display" class="mx-auto mt-9 max-w-6xl" /></div>
    </section>
    <section class="bg-gradient-to-r from-black to-slate-950 py-14 text-white md:py-20">
        <div class="shop-container grid items-center gap-10 md:grid-cols-2">
            <ReferenceImage v-bind="modesImage" alt="Portrait, landscape, mirror, and extended display modes" class="mx-auto max-w-xl" />
            <div><h2 class="text-3xl font-semibold tracking-tight text-sky-300 md:text-4xl">Flexible Modes.<br />Ready for Every Setup.</h2><p class="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">Extend your workspace, mirror your laptop, or switch between landscape and portrait viewing. Z3FC adapts to multitasking, presentations, creative work, and entertainment.</p></div>
        </div>
    </section>
</template>
