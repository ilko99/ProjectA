<script setup>
import { computed, ref } from 'vue';
defineProps({ product: Object });
const reviews = ref([
    { id: 1, name: 'Tomas T', rating: 4, text: 'Looks great. Not heavy. Easy to set up. All cables needed come in the package.' },
    { id: 2, name: 'Davor', rating: 3, text: 'A useful second screen for my everyday setup. Easy to take with me.' },
    { id: 3, name: 'Michael R.', rating: 5, text: 'Thin and lightweight, with lovely color and a smooth display for work and gaming.' },
    { id: 4, name: 'Rudy', rating: 5, text: 'Crisp, vibrant visuals and a tidy workspace. Fits neatly in my laptop bag.' },
]);
const filter = ref('all');
const sort = ref('newest');
const formOpen = ref(false);
const reviewer = ref('');
const rating = ref(5);
const text = ref('');
const notice = ref('');
const average = computed(() => (reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length).toFixed(1));
const visibleReviews = computed(() => {
    const list = reviews.value.filter(review => filter.value === 'all' || review.rating === Number(filter.value));
    return list.sort((a, b) => sort.value === 'highest' ? b.rating - a.rating : sort.value === 'lowest' ? a.rating - b.rating : b.id - a.id);
});
function submitReview() {
    if (!reviewer.value.trim() || text.value.trim().length < 10) return;
    reviews.value.push({ id: Date.now(), name: reviewer.value.trim(), rating: Number(rating.value), text: text.value.trim() });
    reviewer.value = ''; text.value = ''; rating.value = 5;
    formOpen.value = false; filter.value = 'all'; sort.value = 'newest';
    notice.value = 'Your preview review was added for this visit. It is not published or saved.';
}
</script>
<template>
    <section id="product-reviews" class="bg-white py-14 text-neutral-950 md:py-20">
        <div class="shop-container">
            <div class="flex flex-wrap items-center justify-between gap-5"><div><h2 class="text-2xl font-semibold">Customer Reviews</h2><p class="mt-3 flex items-center gap-2 text-sm"><span class="font-bold">{{ average }}</span><span class="text-amber-400" aria-label="Sample review rating">{{ "\u2605".repeat(Math.round(Number(average))) }}{{ "\u2606".repeat(5 - Math.round(Number(average))) }}</span><span class="text-neutral-500">{{ reviews.length }} sample reviews</span></p></div><button type="button" class="shop-button rounded-lg!" :aria-expanded="formOpen" @click="formOpen = !formOpen">{{ formOpen ? 'CANCEL REVIEW' : 'WRITE A REVIEW' }}</button></div>
            <p class="mt-3 text-xs text-neutral-500">Illustrative reviews for this storefront preview.</p>
            <div class="mt-6 flex flex-wrap gap-3"><label class="text-xs"><span class="mr-2">Rating</span><select v-model="filter" class="rounded-lg border border-neutral-200 bg-white p-2"><option value="all">All ratings</option><option v-for="stars in [5, 4, 3, 2, 1]" :key="stars" :value="String(stars)">{{ stars }} stars</option></select></label><label class="text-xs"><span class="mr-2">Sort</span><select v-model="sort" class="rounded-lg border border-neutral-200 bg-white p-2"><option value="newest">Newest first</option><option value="highest">Highest rating</option><option value="lowest">Lowest rating</option></select></label></div>
            <p v-if="notice" class="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-blue-700" role="status">{{ notice }}</p>
            <form v-if="formOpen" class="mt-6 grid max-w-2xl gap-4 rounded-xl border border-neutral-200 p-6" @submit.prevent="submitReview">
                <div><label for="review-name" class="checkout-label">Your name</label><input id="review-name" v-model="reviewer" required maxlength="80" class="checkout-input" /></div>
                <div><label for="review-rating" class="checkout-label">Rating</label><select id="review-rating" v-model="rating" class="checkout-input"><option v-for="stars in [5, 4, 3, 2, 1]" :key="stars" :value="stars">{{ stars }} stars</option></select></div>
                <div><label for="review-text" class="checkout-label">Your review</label><textarea id="review-text" v-model="text" required minlength="10" maxlength="1000" rows="4" class="checkout-input"></textarea></div>
                <button type="submit" class="shop-button justify-self-start">ADD PREVIEW REVIEW</button>
            </form>
            <div class="mt-6 divide-y divide-neutral-200">
                <article v-for="review in visibleReviews" :key="review.id" class="py-7"><p class="text-xl tracking-wider text-amber-400" :aria-label="review.rating + ' out of 5 stars'">{{ '\u2605'.repeat(review.rating) }}{{ '\u2606'.repeat(5 - review.rating) }}</p><div class="mt-3 flex items-center gap-3"><span class="grid size-9 place-items-center rounded-full bg-amber-50 text-xs font-semibold">{{ review.name.charAt(0) }}</span><h3 class="text-sm font-semibold">{{ review.name }}</h3></div><p class="mt-3 text-sm leading-relaxed text-neutral-600">{{ review.text }}</p></article>
                <p v-if="!visibleReviews.length" class="py-10 text-sm text-neutral-500">No reviews match this rating.</p>
            </div>
        </div>
    </section>
</template>
