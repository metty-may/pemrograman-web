<script setup>
import { RouterLink } from "vue-router";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <main class="cart-page">
    <div class="cart-heading">
      <p class="eyebrow"><span></span> PILIHANMU</p>
      <h1>Keranjang <em>belanja.</em></h1>
      <p class="cart-intro">
        {{ cart.itemCount }} barang pilihanmu siap menemani hari.
      </p>
    </div>

    <div v-if="cart.items.length" class="cart-layout">
      <section class="cart-items" aria-label="Barang di keranjang">
        <article v-for="item in cart.items" :key="item.id" class="cart-item">
          <div
            class="cart-item-art"
            :class="`art-${item.cover}`"
            aria-hidden="true"
          >
            <span>{{ item.symbol }}</span>
          </div>
          <div class="cart-item-details">
            <span class="cart-item-category">{{ item.category }}</span>
            <h2>{{ item.name }}</h2>
            <p>{{ formatPrice(item.price) }}</p>
          </div>
          <div class="quantity-control" :aria-label="`Jumlah ${item.name}`">
            <button
              type="button"
              :aria-label="`Kurangi jumlah ${item.name}`"
              @click="cart.updateQuantity(item.id, item.quantity - 1)"
            >
              −
            </button>
            <span aria-live="polite">{{ item.quantity }}</span>
            <button
              type="button"
              :aria-label="`Tambah jumlah ${item.name}`"
              @click="cart.updateQuantity(item.id, item.quantity + 1)"
            >
              +
            </button>
          </div>
          <span class="cart-item-total">{{
            formatPrice(item.price * item.quantity)
          }}</span>
          <button
            class="remove-item"
            type="button"
            :aria-label="`Hapus ${item.name} dari keranjang`"
            @click="cart.removeFromCart(item.id)"
          >
            Hapus
          </button>
        </article>
        <RouterLink class="continue-link" to="/">
          <span aria-hidden="true">←</span> Lanjut melihat koleksi
        </RouterLink>
      </section>

      <aside class="order-summary">
        <p class="summary-label">RINGKASAN PESANAN</p>
        <div class="summary-line">
          <span>Jumlah barang</span>
          <span>{{ cart.itemCount }} barang</span>
        </div>
        <div class="summary-line">
          <span>Subtotal</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div class="summary-line">
          <span>Pengiriman</span>
          <span class="shipping-note">Dihitung berikutnya</span>
        </div>
        <div class="summary-total">
          <span>Total sementara</span>
          <strong>{{ formatPrice(cart.subtotal) }}</strong>
        </div>
        <button class="checkout-button" type="button" @click="cart.clearCart">
          Selesaikan pesanan
          <span aria-hidden="true">↗</span>
        </button>
        <p class="checkout-note">
          Demo tugas praktikum — tombol ini mengosongkan keranjang.
        </p>
      </aside>
    </div>

    <section v-else class="cart-empty">
      <span class="empty-symbol" aria-hidden="true">⌁</span>
      <h2>Belum ada yang dipilih.</h2>
      <p>Temukan barang kecil yang terasa istimewa untukmu.</p>
      <RouterLink class="shop-button" to="/">Jelajahi koleksi</RouterLink>
    </section>
  </main>
</template>
