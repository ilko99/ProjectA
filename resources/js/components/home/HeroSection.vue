<script setup>
import { ref } from 'vue';
import ShopIcon from '../ui/ShopIcon.vue';
defineEmits(['browse']);
const active = ref(0);
const slides = [
    { eyebrow: '24-HOUR FLASH SALE', title: 'Prime Displays.\nUnbeatable Flash Deals.', description: 'A bigger view. A better everyday.', category: 'monitors', theme: 'warm' },
    { eyebrow: 'YOUR WORKSPACE, ANYWHERE', title: 'More Space.\nMore Possibilities.', description: 'Make room for your best ideas.', category: 'monitors', theme: 'cool' },
    { eyebrow: 'FOR HOME & FAMILY', title: 'Little Moments.\nBeautifully Shared.', description: 'Keep your favorite memories close.', category: 'frames', theme: 'rose' },
];
function move(step) { active.value = (active.value + step + slides.length) % slides.length; }
</script>
<template>
    <section :class="['hero-section', 'hero-' + slides[active].theme]" aria-label="Featured collections" aria-roledescription="carousel">
        <div class="shop-container relative z-10 grid items-center gap-8 py-12 md:grid-cols-[.85fr_1.15fr] md:py-16">
            <div :key="active" class="hero-copy">
                <p class="mb-5 text-xs font-bold tracking-[.12em] md:text-sm">{{ slides[active].eyebrow }}</p>
                <h1 class="whitespace-pre-line leading-[1.12] font-semibold tracking-tight">{{ slides[active].title }}</h1>
                <p class="mt-5 text-base text-neutral-700">{{ slides[active].description }}</p>
                <button type="button" class="shop-button mt-7" @click="$emit('browse', slides[active].category)">SHOP NOW</button>
            </div>
            <div class="hero-art" aria-hidden="true">
                <div class="hero-orbit"></div>
                <div class="hero-plinth"></div>
                <div class="display-device display-back"><div class="display-screen screen-blue"></div><span>ARZOPA</span></div>
                <div class="display-device display-front"><div :class="['display-screen', active === 0 ? 'screen-gold' : active === 1 ? 'screen-blue' : 'screen-rose']"></div><span>ARZOPA</span></div>
                <span class="hero-art-caption">YOUR WORLD. A BIGGER VIEW.</span>
            </div>
        </div>
        <button type="button" aria-label="Previous hero slide" class="hero-arrow left-3" @click="move(-1)"><ShopIcon name="arrow" class="size-5 rotate-180" /></button>
        <button type="button" aria-label="Next hero slide" class="hero-arrow right-3" @click="move(1)"><ShopIcon name="arrow" class="size-5" /></button>
        <div class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-label="Choose hero slide">
            <button v-for="(slide, index) in slides" :key="slide.eyebrow" type="button" :aria-label="'Hero slide ' + (index + 1)" :aria-pressed="active === index" class="flex h-7 items-center px-1" @click="active = index"><span :class="['block h-2 rounded-full transition-all', active === index ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-900/35']"></span></button>
        </div>
    </section>
</template>
