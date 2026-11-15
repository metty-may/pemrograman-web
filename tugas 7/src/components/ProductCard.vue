<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(["add"]);

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <article class="product-card">
    <div class="product-art" :class="`art-${product.cover}`" aria-hidden="true">
      <span class="art-sun"></span>
      <span class="art-orbit"></span>
      <span class="art-object">{{ product.symbol }}</span>
      <span class="art-caption">{{ product.color }}</span>
      <span class="art-index">RT — 0{{ product.id }}</span>
    </div>
    <div class="product-info">
      <div class="product-meta">
        <span>{{ product.category }}</span>
        <span class="product-dot" aria-hidden="true"></span>
      </div>
      <div class="product-title-row">
        <h3>{{ product.name }}</h3>
        <span class="product-price">{{ formatPrice(product.price) }}</span>
      </div>
      <p class="product-description">{{ product.description }}</p>
      <button
        class="add-button"
        type="button"
        :aria-label="`Tambahkan ${product.name} ke keranjang`"
        @click="$emit('add', product)"
      >
        <span>Tambah ke keranjang</span>
        <span class="add-icon" aria-hidden="true">+</span>
      </button>
    </div>
  </article>
</template>
