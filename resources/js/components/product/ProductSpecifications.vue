<script setup>
defineProps({ details: Object });
</script>
<template>
    <section id="specifications" class="bg-neutral-900 py-14 text-white md:py-20">
        <div class="shop-container">
            <h2 class="mb-8 text-3xl font-semibold tracking-tight">Specifications</h2>
            <dl class="grid gap-x-10 md:grid-cols-2">
                <div v-for="[name, value] in Object.entries(details.specs)" :key="name" class="grid grid-cols-2 gap-4 border-b border-neutral-600 py-4 text-sm"><dt class="font-medium">{{ name }}</dt><dd class="text-neutral-300">{{ value }}</dd></div>
            </dl>
        </div>
    </section>
</template>
