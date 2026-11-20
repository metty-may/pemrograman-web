<script setup>
import { computed, ref, watch } from "vue";

const storageKey = "hari-rapi-tasks";
const categories = ["Pribadi", "Kuliah", "Pekerjaan"];
const filters = [
  { label: "Semua", value: "all" },
  { label: "Belum selesai", value: "active" },
  { label: "Selesai", value: "done" },
];
const starterTasks = [
  {
    id: "starter-plan",
    title: "Susun rencana untuk hari ini",
    category: "Pribadi",
    completed: true,
  },
  {
    id: "starter-reading",
    title: "Baca materi pemrograman web",
    category: "Kuliah",
    completed: false,
  },
  {
    id: "starter-walk",
    title: "Luangkan waktu untuk jalan sore",
    category: "Pribadi",
    completed: false,
  },
];

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey);

  if (!savedTasks) return starterTasks;

  try {
    const parsedTasks = JSON.parse(savedTasks);
    if (
      Array.isArray(parsedTasks) &&
      parsedTasks.every(
        (task) =>
          typeof task.id === "string" &&
          typeof task.title === "string" &&
          categories.includes(task.category) &&
          typeof task.completed === "boolean",
      )
    ) {
      return parsedTasks;
    }
  } catch (error) {
    console.error("Daftar tugas tersimpan tidak dapat dibaca:", error);
  }

  return starterTasks;
}

const tasks = ref(loadTasks());
const newTaskTitle = ref("");
const newTaskCategory = ref(categories[0]);
const activeFilter = ref("all");
const completedCount = computed(
  () => tasks.value.filter((task) => task.completed).length,
);
const remainingCount = computed(() => tasks.value.length - completedCount.value);
const progress = computed(() =>
  tasks.value.length
    ? Math.round((completedCount.value / tasks.value.length) * 100)
    : 0,
);
const filteredTasks = computed(() =>
  tasks.value.filter((task) => {
    if (activeFilter.value === "active") return !task.completed;
    if (activeFilter.value === "done") return task.completed;
    return true;
  }),
);
const today = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

watch(
  tasks,
  (updatedTasks) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  },
  { deep: true },
);

function addTask() {
  const title = newTaskTitle.value.trim();
  if (!title) return;

  tasks.value.unshift({
    id: crypto.randomUUID(),
    title,
    category: newTaskCategory.value,
    completed: false,
  });
  newTaskTitle.value = "";
  activeFilter.value = "all";
}

function removeTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}
</script>

<template>
  <main class="page-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Hari Rapi, beranda">
        <span class="brand-mark" aria-hidden="true">h.</span>
        <span class="brand-name">hari<span>rapi</span></span>
      </a>
      <span class="topbar-date">{{ today }}</span>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="eyebrow-line"></span> RUANG UNTUK FOKUS</p>
      <h1 id="page-title">Satu langkah kecil,<br /><em>hari yang lebih baik.</em></h1>
      <p class="intro-copy">
        Atur yang perlu dilakukan. Sisakan ruang untuk menikmati prosesnya.
      </p>
    </section>

    <section class="overview" aria-label="Ringkasan tugas hari ini">
      <div class="overview-copy">
        <span class="summary-label">PROGRES HARI INI</span>
        <p class="progress-number">{{ progress }}<span>%</span></p>
        <p class="progress-caption">
          {{ completedCount }} dari {{ tasks.length }} tugas sudah selesai
        </p>
        <div
          class="progress-track"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Progres tugas hari ini"
        >
          <span :style="{ width: `${progress}%` }"></span>
        </div>
      </div>
      <div class="overview-note">
        <span class="sun-icon" aria-hidden="true">✳</span>
        <p v-if="remainingCount">
          Kamu masih punya <strong>{{ remainingCount }} hal</strong> untuk
          diselesaikan. Pelan-pelan saja.
        </p>
        <p v-else>
          <strong>Hebat, semua beres!</strong> Semoga harimu terasa lebih ringan.
        </p>
        <span class="note-signature">— HARI INI, VERSI TERBAIKMU</span>
      </div>
    </section>

    <section class="content-grid">
      <form class="add-card" @submit.prevent="addTask">
        <div class="section-heading">
          <span class="step-number">01</span>
          <div>
            <h2>Tambahkan tugas</h2>
            <p>Mulai dari satu hal yang penting.</p>
          </div>
        </div>

        <label class="field-label" for="task-title">Nama tugas</label>
        <input
          id="task-title"
          v-model="newTaskTitle"
          class="text-input"
          type="text"
          placeholder="Contoh: Selesaikan tugas kuliah"
          maxlength="100"
          required
        />

        <label class="field-label" for="task-category">Kategori</label>
        <select id="task-category" v-model="newTaskCategory" class="text-input">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <button class="submit-button" type="submit">
          <span>Tambahkan ke daftar</span>
          <span aria-hidden="true">+</span>
        </button>
        <p class="form-note">Tugasmu tersimpan otomatis di perangkat ini.</p>
      </form>

      <section class="task-section" aria-labelledby="task-list-title">
        <div class="list-heading">
          <div class="section-heading">
            <span class="step-number">02</span>
            <div>
              <h2 id="task-list-title">Daftar hari ini</h2>
              <p>Pilih satu, lalu mulai dari sana.</p>
            </div>
          </div>
          <span class="task-count">{{ remainingCount }} TERSISA</span>
        </div>

        <div class="filter-tabs" aria-label="Filter daftar tugas">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            :class="{ 'filter-active': activeFilter === filter.value }"
            :aria-pressed="activeFilter === filter.value"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <ul v-if="filteredTasks.length" class="task-list">
          <li
            v-for="task in filteredTasks"
            :key="task.id"
            class="task-item"
            :class="{ 'task-item-done': task.completed }"
          >
            <label class="task-check" :for="`task-${task.id}`">
              <input
                :id="`task-${task.id}`"
                v-model="task.completed"
                type="checkbox"
                :aria-label="`Tandai ${task.title} sebagai ${task.completed ? 'belum selesai' : 'selesai'}`"
              />
              <span class="custom-check" aria-hidden="true"></span>
            </label>
            <div class="task-details">
              <span class="category-tag" :class="`tag-${task.category.toLowerCase()}`">
                {{ task.category }}
              </span>
              <h3>{{ task.title }}</h3>
            </div>
            <button
              class="remove-button"
              type="button"
              :aria-label="`Hapus tugas: ${task.title}`"
              @click="removeTask(task.id)"
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        </ul>

        <div v-else class="empty-state">
          <span class="empty-icon" aria-hidden="true">✓</span>
          <h3>{{ tasks.length ? "Tidak ada tugas di sini" : "Daftarmu masih kosong" }}</h3>
          <p>
            {{
              tasks.length
                ? "Coba pilih filter lain untuk melihat tugas."
                : "Tambahkan satu hal yang ingin kamu selesaikan hari ini."
            }}
          </p>
        </div>
      </section>
    </section>

    <footer class="footer">
      <span>LEBIH TERATUR, LEBIH TENANG</span>
      <span>LANGKAH KECIL TETAP BERARTI <span aria-hidden="true">↗</span></span>
    </footer>
  </main>
</template>
