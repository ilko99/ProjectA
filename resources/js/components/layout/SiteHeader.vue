<script setup>
import { ref } from 'vue';
import ShopIcon from '../ui/ShopIcon.vue';
defineProps({ cartCount: Number });
const emit = defineEmits(['search', 'cart']);
const searchOpen = ref(false);
const query = ref('');
function submit() { emit('search', query.value); searchOpen.value = false; }
</script>
<template>
    <header id="top" class="border-b border-neutral-100 bg-white">
        <div class="shop-container flex min-h-18 items-center justify-between gap-4">
            <RouterLink :to="{ name: 'home' }" class="flex items-center gap-5" aria-label="ProjectA home">
                <span class="brand-logo">Project<span class="text-blue-600">A</span></span>
                <span class="hidden border-l border-neutral-300 pl-5 text-[11px] font-bold tracking-wide sm:block">PORTABLE DISPLAY LEADER</span>
            </RouterLink>
            <div class="flex items-center gap-2 sm:gap-4">
                <span class="hidden items-center gap-1 text-xs text-neutral-500 md:flex"><ShopIcon name="globe" class="size-4 text-blue-600" /> EU · EUR</span>
                <button type="button" aria-label="Search products" :aria-expanded="searchOpen" class="icon-button" @click="searchOpen = !searchOpen"><ShopIcon name="search" class="size-5" /></button>
                <button type="button" aria-label="Open shopping bag" class="icon-button relative" @click="$emit('cart')"><ShopIcon name="cart" class="size-6" /><span v-if="cartCount" class="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-blue-600 text-[10px] text-white">{{ cartCount }}</span></button>
            </div>
        </div>
        <form v-if="searchOpen" class="shop-container flex gap-3 pb-4" role="search" @submit.prevent="submit">
            <label for="product-search" class="sr-only">Search products</label>
            <input id="product-search" v-model="query" autofocus type="search" placeholder="Search monitors, photo frames, OLED…" class="min-w-0 flex-1 rounded-lg border border-neutral-300 px-4 py-3" />
            <button type="submit" class="shop-button">Search</button>
        </form>
    </header>
</template>

