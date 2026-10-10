<script setup>
import ShopIcon from '../ui/ShopIcon.vue';
const stats = [{ icon: 'users', text: 'Millions+ Users Worldwide' }, { icon: 'trophy', text: 'Award-Winning Design & Performance' }, { icon: 'building', text: '10+ Years Display Expertise' }];
</script>
<template><section class="brand-stats bg-neutral-50"><div class="shop-container grid items-center gap-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"><h2 class="text-2xl leading-tight font-semibold tracking-tight md:text-3xl">The Leading Portable<br />Display Brand</h2><div v-for="stat in stats" :key="stat.text" class="flex items-center gap-4 lg:border-l lg:border-neutral-200 lg:pl-6"><ShopIcon :name="stat.icon" class="size-8 shrink-0 text-blue-500" /><p class="text-sm font-semibold">{{ stat.text }}</p></div></div></section></template>
