<script setup>
defineEmits(['compare']);
</script>
<template>
    <section class="comparison-banner relative overflow-hidden bg-neutral-950 text-white">
        <div class="shop-container relative z-10 py-14 md:py-20">
            <div class="max-w-lg">
                <p class="mb-4 text-xs font-semibold tracking-[.15em] text-blue-200">FIND YOUR PERFECT MATCH</p>
                <h2 class="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">Which Portable Monitor<br class="hidden sm:block" /> Is Right for You?</h2>
                <p class="mt-4 text-sm text-neutral-300">From everyday productivity to next-level play.</p>
                <button type="button" class="shop-button mt-7 text-xs" @click="$emit('compare')">COMPARE NOW</button>
            </div>
        </div>
        <div class="comparison-ribbon" aria-hidden="true"></div>
    </section>
</template>

