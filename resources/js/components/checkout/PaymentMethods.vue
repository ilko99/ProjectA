<script setup>
defineProps({ modelValue: String });
defineEmits(['update:modelValue']);

function formatCardInput(event, kind) {
    if (event.isComposing) return;
    const input = event.target;
    const raw = input.value;
    const cursor = input.selectionStart ?? raw.length;
    const digitsBeforeCursor = raw.slice(0, cursor).replace(/\D/g, '').length;
    const digits = raw.replace(/\D/g, '').slice(0, kind === 'number' ? 19 : 4);
    const formatted = kind === 'number'
        ? (digits.match(/.{1,4}/g) || []).join(' ')
        : digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
    input.value = formatted;

    let nextCursor = 0;
    let digitCount = 0;
    while (nextCursor < formatted.length && digitCount < digitsBeforeCursor) {
        if (/\d/.test(formatted[nextCursor])) digitCount++;
        nextCursor++;
    }
    input.setSelectionRange(nextCursor, nextCursor);
}
</script>
<template>
    <fieldset>
        <legend class="mb-4 text-xl font-semibold">Payment</legend>
        <div class="overflow-hidden rounded-xl border border-neutral-200">
            <div class="border-b border-neutral-200">
                <label :class="['flex cursor-pointer items-start gap-3 p-5', modelValue === 'card' ? 'bg-blue-50' : 'bg-white']">
                    <input type="radio" name="payment" value="card" :checked="modelValue === 'card'" aria-controls="card-details" :aria-expanded="modelValue === 'card'" class="mt-1 accent-blue-600" @change="$emit('update:modelValue', 'card')" />
                    <span class="flex-1"><span class="block text-sm font-semibold">Card</span><span class="mt-1 block text-xs text-neutral-500">Pay by debit or credit card.</span></span>
                    <span aria-hidden="true" :class="['text-neutral-400 transition-transform duration-200', modelValue === 'card' ? 'rotate-180' : '']">&#8964;</span>
                </label>
                <Transition name="card-details">
                    <div v-if="modelValue === 'card'" id="card-details" class="card-details-panel bg-neutral-50">
                        <div class="min-h-0 overflow-hidden">
                            <div class="grid gap-4 border-t border-neutral-200 p-5 sm:grid-cols-2">
                                <p id="card-preview-note" class="text-xs leading-relaxed text-neutral-500 sm:col-span-2">Use test card details only. This preview does not submit or save your card information.</p>
                                <div class="sm:col-span-2">
                                    <label for="card-number" class="checkout-label">Card number</label>
                                    <input id="card-number" type="text" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242" pattern="(?:[0-9][ -]?){12,18}[0-9]" maxlength="23" @input="formatCardInput($event, 'number')" required :disabled="modelValue !== 'card'" aria-describedby="card-preview-note" title="Enter a card number with 13 to 19 digits." class="checkout-input" />
                                </div>
                                <div>
                                    <label for="card-expiry" class="checkout-label">Expiration date</label>
                                    <input id="card-expiry" type="text" inputmode="numeric" autocomplete="off" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\s*/\s*[0-9]{2}" maxlength="5" @input="formatCardInput($event, 'expiry')" required :disabled="modelValue !== 'card'" title="Enter a month and year, such as 08/27." class="checkout-input" />
                                </div>
                                <div>
                                    <label for="card-security" class="checkout-label">Security code</label>
                                    <input id="card-security" type="password" inputmode="numeric" autocomplete="off" placeholder="CVC" pattern="[0-9]{3,4}" maxlength="4" required :disabled="modelValue !== 'card'" title="Enter the 3 or 4 digit security code." class="checkout-input" />
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="card-name" class="checkout-label">Name on card</label>
                                    <input id="card-name" type="text" autocomplete="off" placeholder="Full name" required :disabled="modelValue !== 'card'" class="checkout-input" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
            <label :class="['flex cursor-pointer items-start gap-3 p-5', modelValue === 'cash' ? 'bg-blue-50' : 'bg-white']">
                <input type="radio" name="payment" value="cash" :checked="modelValue === 'cash'" class="mt-1 accent-blue-600" @change="$emit('update:modelValue', 'cash')" />
                <span><span class="block text-sm font-semibold">Cash on delivery</span><span class="mt-1 block text-xs text-neutral-500">Pay when your order arrives.</span></span>
            </label>
        </div>
        <p class="mt-3 text-xs leading-relaxed text-neutral-500">Test checkout only. No payment is taken and no real order is placed.</p>
    </fieldset>
</template>
