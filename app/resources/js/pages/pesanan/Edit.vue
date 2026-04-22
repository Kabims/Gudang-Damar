<script setup>
import { router, Link } from '@inertiajs/vue3'
import { reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'

const props = defineProps({
  pesanan: {
    type: Object,
    required: true
  }
})

const form = reactive({
  nama_barang: props.pesanan.nama_barang ?? '',
  bahan:       props.pesanan.bahan       ?? '',
  jumlah:      props.pesanan.jumlah      ?? 1,
  catatan:     props.pesanan.catatan     ?? '',
})

const submit = () => {
  router.put(`/pesanan/${props.pesanan.id_pesanan}`, { ...form })
}

const tandaiTerkirim = () => {
  if (confirm('Tandai pesanan ini sebagai terkirim?')) {
    router.post(`/pesanan/${props.pesanan.id_pesanan}/selesai`)
  }
}
</script>

<template>
  <div class="edit-page">
    <Navbar />

    <main class="edit-main">
      <!-- Header -->
      <div class="edit-header">
        <nav class="breadcrumb">
          <a href="/dashboard">Dashboard</a>
          <span class="material-symbols-outlined bc-arrow">chevron_right</span>
          <a href="/pesanan">Data Pesanan</a>
          <span class="material-symbols-outlined bc-arrow">chevron_right</span>
          <span class="bc-active">Edit Pesanan</span>
        </nav>
        <h1 class="page-title">Edit Pesanan</h1>
        <p class="page-subtitle">Perbarui data pesanan #{{ pesanan.id_pesanan }}</p>
      </div>

      <!-- Card -->
      <div class="edit-card">
        <div class="card-label">
          <span class="material-symbols-outlined">edit_note</span>
          Detail Pesanan
        </div>

        <form @submit.prevent="submit" class="edit-form">
          <div class="form-group">
            <label>Nama Barang</label>
            <input
              v-model="form.nama_barang"
              type="text"
              required
              placeholder="Contoh: Besi Hollow 4x4"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Bahan</label>
              <input
                v-model="form.bahan"
                type="text"
                required
                placeholder="Contoh: Besi, Kayu, PVC"
              />
            </div>
            <div class="form-group">
              <label>Jumlah</label>
              <input
                v-model.number="form.jumlah"
                type="number"
                min="1"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Catatan <span class="label-opt">(opsional)</span></label>
            <textarea
              v-model="form.catatan"
              rows="4"
              placeholder="Tambahkan catatan khusus untuk pesanan ini…"
            ></textarea>
          </div>

          <div class="form-actions">
            <button
              v-if="!pesanan.tanggalterkirim"
              type="button"
              class="btn-kirim-edit"
              @click="tandaiTerkirim"
            >
              <span class="material-symbols-outlined">local_shipping</span>
              Tandai Pesanan Terkirim
            </button>
            <Link href="/pesanan" class="btn-kembali">
              <span class="material-symbols-outlined">arrow_back</span>
              Kembali
            </Link>
            <button type="submit" class="btn-simpan">
              <span class="material-symbols-outlined">save</span>
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>

    <footer>&copy; 2025 GudangDamar. All rights reserved.</footer>
  </div>
</template>

<style scoped>
.edit-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  font-family: 'Inter', sans-serif;
}
.edit-main {
  flex: 1;
  padding: 36px 28px;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* ── Header ───────────────────────────────────────────────── */
.edit-header { margin-bottom: 28px; }
.breadcrumb {
  display: flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: #94a3b8; margin-bottom: 8px;
}
.breadcrumb a { color: #94a3b8; text-decoration: none; transition: color .2s; }
.breadcrumb a:hover { color: #001e40; }
.bc-arrow { font-size: 14px !important; }
.bc-active { color: #001e40; }
.page-title {
  font-size: 2rem; font-weight: 800;
  color: #001e40; letter-spacing: -0.02em; margin: 0;
}
.page-subtitle { color: #64748b; font-size: 1rem; margin: 4px 0 0; }

/* ── Card ─────────────────────────────────────────────────── */
.edit-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0,30,64,.07);
}
.card-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 800;
  text-transform: uppercase; letter-spacing: .12em;
  color: #94a3b8; margin-bottom: 24px;
}
.card-label .material-symbols-outlined { font-size: 16px; }

/* ── Form ─────────────────────────────────────────────────── */
.edit-form {}
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block; font-size: 12px; font-weight: 700;
  color: #475569; margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: .06em;
}
.label-opt { font-weight: 400; text-transform: none; font-size: 11px; color: #94a3b8; }
.form-group input,
.form-group textarea {
  width: 100%; padding: 13px 15px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-size: 14px; font-family: inherit;
  background: #f8fafc; resize: vertical;
  transition: border-color .2s, box-shadow .2s;
  box-sizing: border-box;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #006e25;
  box-shadow: 0 0 0 3px rgba(0,110,37,.12);
  background: #fff;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.form-actions {
  display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;
}
.btn-kirim-edit {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 10px; border: none;
  background: #dcfce7; color: #15803d; font-weight: 700; font-size: 14px;
  cursor: pointer; box-shadow: 0 6px 16px rgba(21,128,61,.15);
  transition: transform .15s, box-shadow .15s;
}
.btn-kirim-edit:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(21,128,61,.25);
}
.btn-kirim-edit .material-symbols-outlined { font-size: 18px; }
.btn-kembali {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; background: #fff;
  color: #64748b; font-weight: 600; font-size: 14px;
  text-decoration: none; cursor: pointer;
  transition: background .15s;
}
.btn-kembali:hover { background: #f1f5f9; }
.btn-simpan {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #006e25, #00a63e);
  color: #fff; font-weight: 700; font-size: 14px;
  cursor: pointer; box-shadow: 0 6px 16px rgba(0,110,37,.2);
  transition: transform .15s, box-shadow .15s;
}
.btn-simpan:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,110,37,.3);
}
.btn-simpan .material-symbols-outlined { font-size: 18px; }

/* ── Footer ───────────────────────────────────────────────── */
footer {
  background-color: #222; color: white;
  padding: 12px; text-align: center; font-size: 14px;
}

@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
  .edit-card { padding: 20px; }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>