<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCartStore } from "./stores/cart";

const cart = useCartStore();
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="Ruang Temu, beranda">
        <span class="brand-icon" aria-hidden="true">r.</span>
        <span class="brand-name">ruang temu<span>pilihan sehari-hari</span></span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navigasi utama">
        <RouterLink class="nav-link" to="/">Koleksi</RouterLink>
        <RouterLink class="cart-link" to="/cart">
          Keranjang
          <span class="cart-count">{{ cart.itemCount }}</span>
        </RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <RouterLink class="footer-brand" to="/">ruang temu</RouterLink>
      <span>DIPILIH DENGAN HATI, UNTUK HARI-HARI YANG BERARTI</span>
      <span>© 2026 RUANG TEMU</span>
    </footer>
  </div>
</template>
