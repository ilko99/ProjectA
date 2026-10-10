import { onBeforeUnmount, onMounted } from 'vue';

export function useScrollReveal(root) {
    let observer;
    let motionPreference;
    let sections = [];

    function reveal(section) {
        section.classList.remove('scroll-reveal-pending');
        observer?.unobserve(section);
    }

    function revealAll() {
        sections.forEach(reveal);
    }

    function handleMotionChange(event) {
        if (event.matches) revealAll();
    }

    function handleFocus(event) {
        const section = sections.find(section => section.contains(event.target));
        if (section) reveal(section);
    }

    onMounted(() => {
        motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionPreference.matches || !('IntersectionObserver' in window)) return;

        sections = [...root.value.querySelectorAll('main > *, footer')];
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) reveal(entry.target);
            });
        }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

        sections.forEach(section => {
            const bounds = section.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) return;
            section.classList.add('scroll-reveal', 'scroll-reveal-pending');
            observer.observe(section);
        });

        motionPreference.addEventListener('change', handleMotionChange);
        root.value.addEventListener('focusin', handleFocus);
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        motionPreference?.removeEventListener('change', handleMotionChange);
        root.value?.removeEventListener('focusin', handleFocus);
    });
}
