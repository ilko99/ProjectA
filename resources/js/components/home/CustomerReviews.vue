<script setup>
import CardCarousel from '../ui/CardCarousel.vue';
const reviews = [
    { name: 'Michael R.', initials: 'MR', title: 'Awesome high-resolution portable monitor.', text: 'It’s thin and lightweight, but feels well built. Color quality and contrast are very good, even at lower brightness levels. The high refresh rate makes it a pleasure to use for gaming or work.', product: 'Arzopa Z3FC 16.1″ 2.5K 180Hz Portable Gaming Monitor', color: 'bg-orange-100' },
    { name: 'Rudy', initials: 'R', title: 'Crisp, vibrant visuals in a slim, lightweight design.', text: 'The screen is crisp, vibrant, and surprisingly bright. Whether I’m working on spreadsheets or streaming video, the color accuracy and sharpness are top-tier. It fits neatly in my laptop bag.', product: 'Arzopa Z1RC 16″ 2.5K Portable Monitor', color: 'bg-blue-100' },
    { name: 'Jonathan', initials: 'J', title: 'Ultra-smooth performance in a portable design.', text: 'An impressive option for gamers and professionals who want great performance wherever they go. The smooth refresh rate makes games feel fluid and responsive, and setup is incredibly simple.', product: 'Arzopa Z1FC Grey 16.1″ 144Hz Portable Monitor', color: 'bg-emerald-100' },
    { name: 'Sarah L.', initials: 'SL', title: 'A second screen that goes everywhere with me.', text: 'A lovely addition to my everyday workspace. Having the extra screen makes travel days easier, and it’s light enough to carry without thinking twice.', product: 'Arzopa A1 Gamut Portable Monitor', color: 'bg-violet-100' },
];
</script>
<template>
    <section id="reviews" class="review-section">
        <div class="shop-container">
        <h2 class="section-title mb-9 text-center">What Our Customers Say</h2>
        <CardCarousel label="customer reviews" variant="reviews">
            <article v-for="review in reviews" :key="review.name" class="review-card flex flex-col">
                <div class="flex items-center gap-3"><span :class="['grid size-12 shrink-0 place-items-center rounded-full text-xs font-semibold', review.color]">{{ review.initials }}</span><div><h3 class="font-semibold">{{ review.name }}</h3><p class="review-caption mt-1 text-neutral-500">{{ review.title }}</p></div></div>
                <p class="mt-5 text-xl tracking-wider text-amber-400" aria-label="5 out of 5 stars">★★★★★</p>
                <p class="review-copy mt-3 flex-1 leading-relaxed">{{ review.text }}</p>
                <p class="review-caption mt-6 border-t border-neutral-200 pt-5 leading-relaxed">{{ review.product }}</p>
            </article>
        </CardCarousel>
        <p class="mt-5 text-center text-[11px] text-neutral-400">Sample reviews for this storefront preview.</p>
        </div>
    </section>
</template>
