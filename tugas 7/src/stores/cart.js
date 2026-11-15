import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const itemCount = computed(() =>
    items.value.reduce((count, item) => count + item.quantity, 0),
  );
  const subtotal = computed(() =>
    items.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );

  function addToCart(product) {
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      return;
    }

    items.value.push({ ...product, quantity: 1 });
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find((entry) => entry.id === productId);

    if (!item) return;

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    item.quantity = quantity;
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
