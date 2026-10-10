<script setup>
import ShopIcon from '../ui/ShopIcon.vue';
const benefits = [{ icon: 'truck', text: 'Free & Fast Shipping' }, { icon: 'box', text: 'Up to 3-Year Warranty' }, { icon: 'globe', text: 'Trusted in 100+ Countries' }];
</script>
<template><div class="shop-container flex flex-wrap justify-center gap-x-8 gap-y-3 py-6 text-xs font-medium md:gap-x-12 md:text-sm"><div v-for="benefit in benefits" :key="benefit.text" class="flex items-center gap-2"><ShopIcon :name="benefit.icon" class="size-5 text-blue-500" />{{ benefit.text }}</div></div></template>

