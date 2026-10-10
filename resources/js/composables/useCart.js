import { computed, ref } from 'vue';

const cart = ref([]);
const cartCount = computed(() => cart.value.reduce((count, item) => count + item.quantity, 0));
const subtotal = computed(() => cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0));

function addItem(product, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1) return;
    const item = cart.value.find(item => item.product.id === product.id);
    if (item) item.quantity += quantity;
    else cart.value.push({ product, quantity });
}

function changeQuantity({ id, quantity }) {
    const item = cart.value.find(item => item.product.id === id);
    if (item && Number.isInteger(quantity) && quantity >= 1) item.quantity = quantity;
}

function removeItem(id) {
    cart.value = cart.value.filter(item => item.product.id !== id);
}

export function useCart() {
    return { cart, cartCount, subtotal, addItem, changeQuantity, removeItem };
}
