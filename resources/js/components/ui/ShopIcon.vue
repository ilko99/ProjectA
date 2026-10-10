<script setup>
defineProps({ name: String });
const paths = {
    search: 'm21 21-5-5 M19 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
    cart: 'M2 3h3l3 13h11l3-10H6 M9 21h.01 M19 21h.01',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
    truck: 'M1 5h13v12H1z M14 9h5l3 4v4h-8 M8 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0 M20 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
    box: 'm12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10 M7 4l9 5',
    users: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 22v-3a8 8 0 0 1 16 0v3 M20 3a4 4 0 0 1 0 8 M23 22v-3a8 8 0 0 0-3-6',
    trophy: 'M7 2h10v8a5 5 0 0 1-10 0z M7 4H3v4a4 4 0 0 0 4 4 M17 4h4v4a4 4 0 0 1-4 4 M12 15v6 M8 22h8',
    building: 'M6 22V2h12v20 M2 22h20 M10 6h4 M10 10h4 M10 14h4 M10 22v-4h4v4',
    arrow: 'm9 5 7 7-7 7',
    menu: 'M3 6h18 M3 12h18 M3 18h18',
    close: 'm6 6 12 12 M6 18 18 6',
};
</script>
<template><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name] || paths.box" /></svg></template>

