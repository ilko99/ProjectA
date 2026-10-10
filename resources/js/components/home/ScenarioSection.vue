<script setup>
import CardCarousel from '../ui/CardCarousel.vue';
import ReferenceImage from '../ui/ReferenceImage.vue';
defineEmits(['browse']);
const scenarios = [
    { title: 'Work Anywhere', description: 'Productivity wherever you go.', x: 207, category: 'monitors' },
    { title: 'Work From Home', description: 'More space. More done.', x: 618, category: 'monitors' },
    { title: 'Gaming', description: 'Play faster. See every move.', x: 1029, category: 'monitors' },
    { title: 'Creative Work', description: 'Create with clarity and color.', x: 1440, category: 'monitors' },
    { title: 'Family Memories', description: 'Keep every memory close.', x: 1851, category: 'frames', width: 197 },
];
</script>
<template>
    <section class="shop-container pb-14 md:pb-18">
        <h2 class="section-title mb-8 text-center">Explore By Scenario</h2>
        <CardCarousel label="scenarios">
            <article v-for="scenario in scenarios" :key="scenario.title" class="overflow-hidden rounded-lg bg-neutral-50">
                <ReferenceImage source="/images/home/scenarios.png" :size="[2048, 986]" :crop="[scenario.x, 107, scenario.width || 387, 385]" :alt="scenario.title" class="aspect-square! [&_img]:object-fill" />
                <div class="p-5 md:p-6">
                    <h3 class="text-lg font-semibold">{{ scenario.title }}</h3>
                    <p class="mt-2 text-sm text-neutral-500">{{ scenario.description }}</p>
                    <button type="button" class="mt-5 border-b border-neutral-700 pb-1 text-xs font-bold transition-colors hover:text-blue-600" @click="$emit('browse', scenario.category)">LEARN MORE</button>
                </div>
            </article>
        </CardCarousel>
    </section>
</template>

