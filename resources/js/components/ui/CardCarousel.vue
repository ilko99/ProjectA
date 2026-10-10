<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ShopIcon from './ShopIcon.vue';
const props = defineProps({ label: String, variant: { type: String, default: 'products' }, resetKey: [String, Number] });
const track = ref(null);
const canPrevious = ref(false);
const canNext = ref(false);
let observer;
function update() {
    const el = track.value;
    if (!el) return;
    canPrevious.value = el.scrollLeft > 2;
    canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
}
function move(direction) {
    const el = track.value;
    const card = el?.firstElementChild;
    if (card) el.scrollBy({ left: direction * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).gap || 0)), behavior: 'smooth' });
}
watch(() => props.resetKey, async () => {
    await nextTick();
    track.value?.scrollTo({ left: 0, behavior: 'instant' });
    update();
});
onMounted(() => {
    observer = new ResizeObserver(update);
    observer.observe(track.value);
    update();
});
onBeforeUnmount(() => observer?.disconnect());
</script>
<template>
    <div class="relative" role="region" aria-roledescription="carousel" :aria-label="label">
        <div ref="track" :class="['carousel-track', 'carousel-' + variant]" tabindex="0" @scroll.passive="update">
            <slot />
        </div>
        <button type="button" :disabled="!canPrevious" :aria-label="'Previous ' + label" class="carousel-arrow -left-3 md:-left-5" @click="move(-1)"><ShopIcon name="arrow" class="size-5 rotate-180" /></button>
        <button type="button" :disabled="!canNext" :aria-label="'Next ' + label" class="carousel-arrow -right-3 md:-right-5" @click="move(1)"><ShopIcon name="arrow" class="size-5" /></button>
    </div>
</template>

