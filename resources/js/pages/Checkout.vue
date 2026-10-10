<script setup>
import { reactive, ref } from 'vue';
import PaymentMethods from '../components/checkout/PaymentMethods.vue';
import OrderSummary from '../components/checkout/OrderSummary.vue';
import { useCart } from '../composables/useCart';
const { cart } = useCart();
const payment = ref('card');
const reviewed = ref(false);
const customer = reactive({ email: '', firstName: '', lastName: '', country: '', address: '', apartment: '', city: '', postalCode: '', phone: '' });
function reviewOrder() {
    reviewed.value = true;
}
</script>
<template>
    <div class="min-h-screen bg-white text-neutral-950">
        <header class="border-b border-neutral-200"><div class="mx-auto flex max-w-6xl items-center justify-between gap-5 px-6 py-6"><RouterLink :to="{ name: 'home' }" class="brand-logo" aria-label="ProjectA home">Project<span class="text-blue-600">A</span></RouterLink><span class="text-xs text-neutral-500">Checkout preview</span></div></header>
        <main class="mx-auto max-w-6xl px-6 py-10 md:py-14">
            <RouterLink :to="{ name: 'home' }" class="text-sm text-blue-600 hover:underline">? Continue shopping</RouterLink>
            <div v-if="!cart.length" class="py-20 text-center"><h1 class="text-3xl font-semibold">Your cart is empty</h1><p class="mt-4 text-neutral-500">Add a product before checking out.</p><RouterLink :to="{ name: 'home' }" class="shop-button mt-7">EXPLORE THE SHOP</RouterLink></div>
            <div v-else class="mt-8 grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div>
                    <h1 class="mb-8 text-3xl font-semibold tracking-tight">Checkout</h1>
                    <form v-if="!reviewed" class="flex flex-col gap-9" @submit.prevent="reviewOrder">
                        <section><h2 class="mb-4 text-xl font-semibold">Contact</h2><label class="checkout-label" for="email">Email address</label><input id="email" v-model.trim="customer.email" type="email" autocomplete="email" required class="checkout-input" placeholder="you@example.com" /></section>
                        <section>
                            <h2 class="mb-4 text-xl font-semibold">Delivery</h2>
                            <div class="grid gap-4 sm:grid-cols-2">
                                <div><label class="checkout-label" for="first-name">First name</label><input id="first-name" v-model.trim="customer.firstName" autocomplete="given-name" required class="checkout-input" /></div>
                                <div><label class="checkout-label" for="last-name">Last name</label><input id="last-name" v-model.trim="customer.lastName" autocomplete="family-name" required class="checkout-input" /></div>
                                <div class="sm:col-span-2"><label class="checkout-label" for="country">Country / region</label><input id="country" v-model.trim="customer.country" autocomplete="country-name" required class="checkout-input" /></div>
                                <div class="sm:col-span-2"><label class="checkout-label" for="address">Address</label><input id="address" v-model.trim="customer.address" autocomplete="address-line1" required class="checkout-input" /></div>
                                <div class="sm:col-span-2"><label class="checkout-label" for="apartment">Apartment, suite, etc. <span class="text-neutral-400">(optional)</span></label><input id="apartment" v-model.trim="customer.apartment" autocomplete="address-line2" class="checkout-input" /></div>
                                <div><label class="checkout-label" for="city">City</label><input id="city" v-model.trim="customer.city" autocomplete="address-level2" required class="checkout-input" /></div>
                                <div><label class="checkout-label" for="postal-code">Postal code</label><input id="postal-code" v-model.trim="customer.postalCode" autocomplete="postal-code" required class="checkout-input" /></div>
                                <div class="sm:col-span-2"><label class="checkout-label" for="phone">Phone <span class="text-neutral-400">(optional)</span></label><input id="phone" v-model.trim="customer.phone" type="tel" autocomplete="tel" class="checkout-input" /></div>
                            </div>
                        </section>
                        <section><h2 class="mb-4 text-xl font-semibold">Shipping method</h2><div class="flex justify-between gap-5 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm"><span>Standard delivery</span><span class="font-semibold">Free</span></div></section>
                        <PaymentMethods v-model="payment" />
                        <div><button type="submit" class="shop-button w-full rounded-xl! py-4!">REVIEW ORDER</button><p class="mt-3 text-center text-xs leading-relaxed text-neutral-500">Test checkout only. No order is submitted and no payment is taken.</p></div>
                    </form>
                    <section v-else class="rounded-xl border border-blue-200 bg-blue-50 p-6" aria-live="polite">
                        <h2 class="text-xl font-semibold">Order preview</h2>
                        <p class="mt-3 text-sm text-neutral-600">Your checkout form is ready. This is a preview; no real order has been placed.</p>
                        <dl class="mt-6 space-y-4 text-sm"><div><dt class="font-semibold">Contact</dt><dd class="mt-1">{{ customer.email }}</dd></div><div><dt class="font-semibold">Deliver to</dt><dd class="mt-1">{{ customer.firstName }} {{ customer.lastName }}<br />{{ customer.address }} {{ customer.apartment }}<br />{{ customer.city }}, {{ customer.postalCode }}<br />{{ customer.country }}</dd></div><div><dt class="font-semibold">Payment</dt><dd class="mt-1">{{ payment === 'card' ? 'Card' : 'Cash on delivery' }}</dd></div></dl>
                        <button type="button" class="shop-button mt-6" @click="reviewed = false">EDIT DETAILS</button>
                    </section>
                </div>
                <div class="lg:sticky lg:top-8"><OrderSummary /></div>
            </div>
        </main>
    </div>
</template>
