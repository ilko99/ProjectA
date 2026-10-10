<script setup>
import { ref } from 'vue';
import ShopIcon from '../ui/ShopIcon.vue';
defineEmits(['browse']);
const open = ref(false);
</script>
<template>
    <nav aria-label="Main navigation" class="bg-white">
        <div class="shop-container">
            <button type="button" class="flex items-center gap-2 py-3 text-sm font-semibold md:hidden" :aria-expanded="open" @click="open = !open"><ShopIcon name="menu" class="size-5" /> Explore the shop</button>
            <div :class="['flex flex-col gap-1 pb-3 text-sm font-semibold md:flex-row md:items-center md:gap-8 md:py-3', open ? '' : 'hidden md:flex']">
                <button type="button" class="nav-link" @click="$emit('browse', 'monitors'); open = false">Flash Sale <span class="text-xs">⌄</span></button>
                <button type="button" class="nav-link" @click="$emit('browse', 'monitors'); open = false">Portable Monitors <span class="text-xs">⌄</span></button>
                <button type="button" class="nav-link" @click="$emit('browse', 'frames'); open = false">Digital Photo Frames <span class="text-xs">⌄</span></button>
                <RouterLink :to="{ name: 'home', hash: '#categories' }" class="nav-link" @click="open = false">Explore <span class="text-xs">⌄</span></RouterLink>
                <RouterLink :to="{ name: 'home', hash: '#reviews' }" class="nav-link" @click="open = false">Customer Stories</RouterLink>
                <RouterLink :to="{ name: 'home', hash: '#footer' }" class="nav-link" @click="open = false">Support <span class="text-xs">⌄</span></RouterLink>
            </div>
        </div>
    </nav>
</template>

