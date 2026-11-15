<script setup>
import { computed, ref } from "vue";

const categories = [
  "Fiksi",
  "Nonfiksi",
  "Teknologi",
  "Pendidikan",
  "Biografi",
];

const books = ref([]);
const title = ref("");
const category = ref(categories[0]);
const isRead = ref(false);
const completedCount = computed(
  () => books.value.filter((book) => book.isRead).length,
);

function addBook() {
  const trimmedTitle = title.value.trim();

  if (!trimmedTitle) return;

  books.value.push({
    id: crypto.randomUUID(),
    title: trimmedTitle,
    category: category.value,
    isRead: isRead.value,
  });

  title.value = "";
  category.value = categories[0];
  isRead.value = false;
}

function removeBook(id) {
  books.value = books.value.filter((book) => book.id !== id);
}
</script>

<template>
  <main class="page-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Buku Catatan, beranda">
        <span class="brand-mark" aria-hidden="true">B</span>
        <span>buku<span class="brand-light">catatan</span></span>
      </a>
      <span class="topbar-note">RUANG KECIL UNTUK CERITA BESAR</span>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="eyebrow-line"></span> PERPUSTAKAAN PRIBADI</p>
      <h1 id="page-title">Setiap buku punya<br /><em>tempatnya.</em></h1>
      <p class="intro-copy">
        Simpan buku yang ingin kamu baca, lalu tandai saat ceritanya selesai.
      </p>
    </section>

    <section class="dashboard" aria-label="Ringkasan bacaan">
      <div class="summary-card">
        <span class="summary-label">KOLEKSI BUKU</span>
        <span class="summary-value">{{ books.length }}</span>
        <span class="summary-caption">buku tersimpan</span>
      </div>
      <div class="summary-card summary-card-accent">
        <span class="summary-label">SELESAI DIBACA</span>
        <span class="summary-value">{{ completedCount }}</span>
        <span class="summary-caption">cerita dituntaskan</span>
      </div>
      <div class="summary-illustration" aria-hidden="true">
        <span class="book-shape book-shape-one"></span>
        <span class="book-shape book-shape-two"></span>
        <span class="book-shape book-shape-three"></span>
        <span class="sun-shape"></span>
      </div>
    </section>

    <section class="content-grid">
      <form class="add-card" @submit.prevent="addBook">
        <div class="section-heading">
          <span class="step-number">01</span>
          <div>
            <h2>Tambahkan buku</h2>
            <p>Mulai isi rak bacaanmu.</p>
          </div>
        </div>

        <label class="field-label" for="book-title">Judul buku</label>
        <input
          id="book-title"
          v-model="title"
          class="text-input"
          type="text"
          placeholder="Contoh: Laskar Pelangi"
          maxlength="100"
          required
        />

        <label class="field-label" for="book-category">Kategori</label>
        <select id="book-category" v-model="category" class="text-input">
          <option v-for="item in categories" :key="item" :value="item">
            {{ item }}
          </option>
        </select>

        <label class="read-toggle" for="book-read">
          <input id="book-read" v-model="isRead" type="checkbox" />
          <span class="custom-check" aria-hidden="true"></span>
          <span>Sudah selesai dibaca</span>
        </label>

        <button class="submit-button" type="submit">
          <span>Tambahkan ke rak</span>
          <span aria-hidden="true">+</span>
        </button>
      </form>

      <section class="book-list-section" aria-labelledby="book-list-title">
        <div class="list-heading">
          <div class="section-heading">
            <span class="step-number">02</span>
            <div>
              <h2 id="book-list-title">Rak bacaan</h2>
              <p>Semua cerita yang kamu simpan.</p>
            </div>
          </div>
          <span class="book-count">{{ books.length }} BUKU</span>
        </div>

        <ul v-if="books.length" class="book-list">
          <li v-for="book in books" :key="book.id" class="book-item">
            <label class="book-status" :for="`read-${book.id}`">
              <input
                :id="`read-${book.id}`"
                v-model="book.isRead"
                type="checkbox"
                :aria-label="`Tandai ${book.title} sebagai selesai dibaca`"
              />
              <span class="custom-check" aria-hidden="true"></span>
            </label>
            <div class="book-details">
              <span class="category-tag">{{ book.category }}</span>
              <h3 :class="{ 'book-title-read': book.isRead }">{{ book.title }}</h3>
              <p>{{ book.isRead ? "Selesai dibaca" : "Sedang menunggu dibaca" }}</p>
            </div>
            <button
              class="remove-button"
              type="button"
              :aria-label="`Hapus ${book.title}`"
              @click="removeBook(book.id)"
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        </ul>

        <div v-else class="empty-state">
          <span class="empty-icon" aria-hidden="true">↗</span>
          <h3>Rakmu masih kosong</h3>
          <p>Buku pertamamu menunggu untuk dicatat.</p>
        </div>
      </section>
    </section>

    <footer class="footer">
      <span>DIBUAT UNTUK MENEMANI WAKTU MEMBACAMU</span>
      <span>SELALU ADA HALAMAN BERIKUTNYA <span aria-hidden="true">↗</span></span>
    </footer>
  </main>
</template>
