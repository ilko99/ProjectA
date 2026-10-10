<script setup>
import { computed } from 'vue';
const props = defineProps({ source: String, crop: Array, size: Array, alt: String });
const style = computed(() => ({
    width: `${props.size[0] / props.crop[2] * 100}%`,
    height: `${props.size[1] / props.crop[3] * 100}%`,
    left: `${-props.crop[0] / props.crop[2] * 100}%`,
    top: `${-props.crop[1] / props.crop[3] * 100}%`,
}));
</script>
<template>
    <div class="relative w-full overflow-hidden" :style="{ aspectRatio: crop[2] + ' / ' + crop[3] }">
        <img :src="source" :alt="alt" :style="style" class="absolute max-w-none" loading="lazy" decoding="async" />
    </div>
</template>

