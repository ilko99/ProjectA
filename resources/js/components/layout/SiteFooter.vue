<script setup>
import ShopIcon from '../ui/ShopIcon.vue';
defineEmits(['browse']);
</script>
<template>
    <footer id="footer" class="bg-neutral-950 text-white">
        <div class="shop-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div><a href="#top" class="brand-logo">ARZ<span class="text-blue-400">O</span>PA</a><p class="mt-5 max-w-xs text-sm leading-relaxed text-neutral-400">A bigger view of what matters.<br />Portable displays for work, play, and the moments in between.</p><div class="mt-6 flex items-center gap-2 text-xs text-neutral-400"><ShopIcon name="globe" class="size-4" /> Europe · EUR €</div></div>
            <div><h2 class="mb-5 text-sm font-semibold">Shop</h2><ul class="footer-links"><li><button type="button" @click="$emit('browse', 'monitors')">Portable Monitors</button></li><li><button type="button" @click="$emit('browse', 'frames')">Digital Photo Frames</button></li><li><button type="button" @click="$emit('browse', 'monitors')">Best Sellers</button></li><li><RouterLink :to="{ name: 'home', hash: '#categories' }">Explore Collections</RouterLink></li></ul></div>
            <div><h2 class="mb-5 text-sm font-semibold">Discover</h2><ul class="footer-links"><li><RouterLink :to="{ name: 'home', hash: '#main' }">Our Displays</RouterLink></li><li><RouterLink :to="{ name: 'home', hash: '#reviews' }">Customer Stories</RouterLink></li><li><RouterLink :to="{ name: 'home', hash: '#best-sellers' }">Find Your Monitor</RouterLink></li><li><RouterLink :to="{ name: 'home', hash: '#categories' }">For Home & Family</RouterLink></li></ul></div>
            <div><h2 class="mb-5 text-sm font-semibold">Here to help</h2><p class="text-sm leading-relaxed text-neutral-400">Questions about your next display?<br />Our support section is coming soon.</p><p class="mt-5 text-xs leading-relaxed text-neutral-500">Shipping, returns, warranty and policy pages will be added as the shop takes shape.</p></div>
        </div>
        <div class="border-t border-neutral-800"><div class="shop-container flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-neutral-500"><p>© {{ new Date().getFullYear() }} ARZOPA. Storefront concept.</p><p>VISA &nbsp; Mastercard &nbsp; PayPal</p></div></div>
    </footer>
</template>

