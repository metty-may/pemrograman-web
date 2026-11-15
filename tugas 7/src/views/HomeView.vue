<script setup>
import ProductCard from "../components/ProductCard.vue";
import { products } from "../data/products";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> BARANG BAIK, HARI BAIK</p>
        <h1>Temukan hal kecil<br />yang terasa <em>istimewa.</em></h1>
        <p class="hero-description">
          Pilihan sederhana untuk menemani rutinitas dan membuat keseharian
          terasa lebih bermakna.
        </p>
        <a class="hero-link" href="#koleksi">
          Lihat pilihan kami <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-sun"></div>
        <div class="hero-shape hero-shape-back"></div>
        <div class="hero-shape hero-shape-front"></div>
        <div class="hero-vase">
          <span class="vase-stem vase-stem-one"></span>
          <span class="vase-stem vase-stem-two"></span>
          <span class="vase-leaf vase-leaf-one"></span>
          <span class="vase-leaf vase-leaf-two"></span>
        </div>
        <span class="hero-art-label">OBJEK KECIL, CERITA BESAR</span>
      </div>
      <span class="hero-index">01 / 06</span>
    </section>

    <section id="koleksi" class="collection-section">
      <div class="collection-heading">
        <div>
          <p class="eyebrow"><span></span> PILIHAN MINGGU INI</p>
          <h2>Teman untuk <em>sehari-hari.</em></h2>
        </div>
        <p class="collection-note">{{ products.length }} PILIHAN TERKURASI</p>
      </div>

      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add="cart.addToCart"
        />
      </div>
    </section>

    <section class="note-banner">
      <span class="note-mark" aria-hidden="true">“</span>
      <p>
        Bukan tentang memiliki lebih banyak,<br />
        tapi memilih hal yang <em>tepat.</em>
      </p>
      <span class="note-credit">CATATAN RUANG TEMU</span>
    </section>
  </main>
</template>
