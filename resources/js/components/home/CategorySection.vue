<script setup>
import CardCarousel from '../ui/CardCarousel.vue';
import ReferenceImage from '../ui/ReferenceImage.vue';
defineEmits(['browse']);
const categories = [
    { title: 'Portable Monitors', description: 'Expand your view. Work, play, and create anywhere.', category: 'monitors', crop: [223, 332, 791, 438], tone: 'bg-sky-100' },
    { title: 'Digital Photo Frames', description: 'Bring your favorite memories to life, beautifully.', category: 'frames', crop: [1040, 340, 791, 430], tone: 'bg-orange-50' },
    { title: 'Digital Calendars', description: 'A little more harmony for your everyday.', category: null, crop: null, tone: 'bg-violet-50' },
];
</script>
<template>
    <section id="categories" class="category-section shop-container py-12 md:py-16" aria-label="Shop by category">
        <CardCarousel label="collections" variant="categories">
            <article v-for="item in categories" :key="item.title" :class="['overflow-hidden rounded-lg', item.tone]">
                <div class="p-6 pb-4 md:p-8 md:pb-5">
                    <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">{{ item.title }}</h2>
                    <p class="mt-3 text-sm">{{ item.description }}</p>
                    <button v-if="item.category" type="button" class="shop-button mt-5 text-xs" @click="$emit('browse', item.category)">SHOP NOW</button>
                    <span v-else class="mt-5 inline-block rounded-full bg-blue-300 px-6 py-2.5 text-xs font-semibold text-white">COMING SOON</span>
                </div>
                <ReferenceImage v-if="item.crop" source="/images/home/categories.png" :size="[2048, 1029]" :crop="item.crop" :alt="item.title" />
                <div v-else class="grid aspect-[791/450] place-items-center p-8">
                    <div class="w-4/5 rotate-[-5deg] rounded-xl border-8 border-white bg-white p-5 shadow-xl">
                        <p class="mb-4 text-lg font-semibold">A beautiful day ahead.</p>
                        <div class="grid grid-cols-7 gap-2"><span v-for="day in 28" :key="day" :class="['grid aspect-square place-items-center rounded text-xs', day % 5 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-neutral-50']">{{ day }}</span></div>
                    </div>
                </div>
            </article>
        </CardCarousel>
    </section>
</template>
