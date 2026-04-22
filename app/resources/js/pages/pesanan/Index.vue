<script setup>
import { router, Link } from '@inertiajs/vue3'
import { ref, reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'

const props = defineProps({
  pesananList: {
    type: Array,
    default: () => []
  }
})

// ── State modal ──────────────────────────────────────────────
const showModal = ref(false)

const form = reactive({
  nama_barang: '',
  bahan:       '',
  jumlah:      1,
  catatan:     '',
})

// ── Helpers ──────────────────────────────────────────────────
const resetForm = () => {
  form.nama_barang = ''
  form.bahan       = ''
  form.jumlah      = 1
  form.catatan     = ''
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes}`
}

// ── Modal ────────────────────────────────────────────────────
const openTambah = () => {
  resetForm()
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

// ── Submit ───────────────────────────────────────────────────
const submitForm = () => {
  router.post('/pesanan', { ...form }, {
    onSuccess: () => closeModal()
  })
}

// ── Actions ──────────────────────────────────────────────────
const tandaiTerkirim = (id) => {
  if (confirm('Tandai pesanan ini sebagai Selesai?')) {
    router.post(`/pesanan/${id}/selesai`)
  }
}

const hapusPesanan = (id) => {
  if (confirm('Yakin ingin menghapus data ini?')) {
    router.delete(`/pesanan/${id}`)
  }
}
</script>

<template>
  <div class="pesanan-page">
    <Navbar />

    <main class="pesanan-main">
      <!-- Header -->
      <div class="pesanan-header">
        <div class="header-text">
          <nav class="breadcrumb">
            <a href="/barang">Penyimpanan</a>
            <span class="bc-sep">/</span>
            <span class="bc-active">Data Pesanan</span>
          </nav>
          <h1 class="page-title">Data Pesanan</h1>
          <p class="page-subtitle">Menampilkan seluruh data pesanan barang gudang.</p>
        </div>
        <button class="btn-tambah-header" @click="openTambah">
          <span class="material-symbols-outlined btn-icon">add_circle</span>
          Tambah Pesanan
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="summary-row">
        <div class="summary-card">
          <div class="summary-icon blue">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <div>
            <p class="summary-label">Total Pesanan</p>
            <h3 class="summary-value">{{ pesananList.length }}</h3>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon orange">
            <span class="material-symbols-outlined">hourglass_empty</span>
          </div>
          <div>
            <p class="summary-label">Belum Selesai</p>
            <h3 class="summary-value">{{ pesananList.filter(p => !p.tanggalterkirim).length }}</h3>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon green">
            <span class="material-symbols-outlined">local_shipping</span>
          </div>
          <div>
            <p class="summary-label">Selesai</p>
            <h3 class="summary-value">{{ pesananList.filter(p => p.tanggalterkirim).length }}</h3>
          </div>
        </div>
      </div>

      <!-- List Pesanan (Card-based) -->
      <div class="pesanan-list">
        <div
          v-for="p in pesananList"
          :key="p.id_pesanan"
          class="pesanan-card"
          :class="{ 'is-pending': !p.tanggalterkirim }"
        >
          <!-- Left indicator bar untuk pending -->
          <div v-if="!p.tanggalterkirim" class="indicator-bar"></div>

          <!-- Card Header -->
          <div class="card-header">
            <div class="card-title-group">
              <span class="card-id">{{ String(p.id_pesanan).padStart(6, '0') }}</span>
              <span class="card-sep">•</span>
              <span class="card-title">{{ p.nama_barang }}</span>
            </div>

            <!-- Status badge -->
            <div v-if="!p.tanggalterkirim" class="status-badge badge-pending">
              <span class="material-symbols-outlined">pending_actions</span>
              BELUM SELESAI
            </div>
            <div v-else class="status-badge badge-terkirim">
              <span class="material-symbols-outlined">local_shipping</span>
              Selesai
            </div>
          </div>

          <!-- Timeline -->
          <div class="timeline">
            <div class="timeline-item">
              <span class="material-symbols-outlined">schedule</span>
              <span class="timeline-label">Dipesan:</span>
              <span class="timeline-date">{{ formatDate(p.tanggalpemesanan) }}</span>
            </div>
            <div v-if="p.tanggalterkirim" class="timeline-item">
              <span class="material-symbols-outlined">check_circle</span>
              <span class="timeline-label">Terkirim:</span>
              <span class="timeline-date">{{ formatDate(p.tanggalterkirim) }}</span>
            </div>
          </div>

          <!-- Info Box -->
          <div class="info-box">
            <div class="info-row">
              <div class="info-item">
                <span class="info-label">Bahan</span>
                <span class="info-value">{{ p.bahan }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Jumlah</span>
                <span class="info-value">{{ p.jumlah }}</span>
              </div>
            </div>

            <div class="catatan-section">
              <span class="info-label">Catatan</span>
              <p v-if="p.catatan" class="catatan-text">{{ p.catatan }}</p>
              <p v-else class="catatan-empty">Tidak ada catatan khusus.</p>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="card-actions">
            <button
              v-if="!p.tanggalterkirim"
              class="btn-action btn-kirim"
              title="Tandai Terkirim"
              @click="tandaiTerkirim(p.id_pesanan)"
            >
              <span class="material-symbols-outlined">check_circle</span>
              Tandai Selesai
            </button>
            <Link
              :href="`/pesanan/${p.id_pesanan}/edit`"
              class="btn-action btn-edit"
              title="Edit"
            >
              <span class="material-symbols-outlined">edit_square</span>
              Edit
            </Link>
            <button
              class="btn-action btn-hapus"
              title="Hapus"
              @click="hapusPesanan(p.id_pesanan)"
            >
              <span class="material-symbols-outlined">delete</span>
              Hapus
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="pesananList.length === 0" class="empty-state">
          <span class="material-symbols-outlined empty-icon">inbox</span>
          <p>Belum ada data pesanan.</p>
        </div>
      </div>
    </main>

    <!-- ── Modal Tambah ───────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-card" @click.stop>

          <div class="modal-header">
            <h2>Tambah Pesanan Baru</h2>
            <button class="modal-close" @click="closeModal">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="modal-form">
            <div class="form-group">
              <label>Nama Barang</label>
              <input
                v-model="form.nama_barang"
                type="text"
                required
                placeholder="Contoh: Piring"
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
                rows="3"
                placeholder="Tambahkan catatan khusus untuk pesanan ini…"
              ></textarea>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn-batal" @click="closeModal">Batal</button>
              <button type="submit" class="btn-simpan">
                <span class="material-symbols-outlined">add</span>
                Tambah Pesanan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <footer>&copy; 2025 GudangDamar. All rights reserved.</footer>
  </div>
</template>

<style scoped>
/* ── Page ─────────────────────────────────────────────────── */
.pesanan-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  font-family: 'Inter', sans-serif;
  color: #000;
}

.pesanan-main {
  flex: 1;
  padding: 36px 28px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* ── Header ───────────────────────────────────────────────── */
.pesanan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #94a3b8;
  margin-bottom: 8px;
}
.breadcrumb a { color: #94a3b8; text-decoration: none; transition: color .2s; }
.breadcrumb a:hover { color: #001e40; }
.bc-sep { color: #94a3b8; padding: 0 4px; }
.bc-active { color: #001e40; }

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #000;
  letter-spacing: -0.02em;
  margin: 0;
}
.page-subtitle {
  color: #64748b;
  font-size: 1rem;
  margin: 4px 0 0;
}

.btn-tambah-header {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #006e25, #00a63e);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,110,37,.25);
  transition: transform .2s, box-shadow .2s;
}
.btn-tambah-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,110,37,.35);
}

/* ── Summary Cards ────────────────────────────────────────── */
.summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.summary-card {
  background: #fff;
  border-radius: 14px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 4px 24px rgba(0,30,64,.05);
  transition: box-shadow .3s;
}
.summary-card:hover { box-shadow: 0 8px 32px rgba(0,30,64,.1); }

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.summary-icon.blue   { background: #dbeafe; color: #2563eb; }
.summary-icon.orange { background: #ffedd5; color: #ea580c; }
.summary-icon.green  { background: #dcfce7; color: #16a34a; }
.summary-icon .material-symbols-outlined { font-size: 24px; }

.summary-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: #64748b;
  margin: 0 0 4px;
}
.summary-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #000;
  margin: 0;
}

/* ── Pesanan List ─────────────────────────────────────────── */
.pesanan-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pesanan-card {
  position: relative;
  background: #fff;
  border-radius: 14px;
  padding: 20px 22px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
  transition: box-shadow .2s, border-color .2s;
}
.pesanan-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}
.pesanan-card.is-pending {
  border-color: #fecaca;
  padding-left: 26px;
}

.indicator-bar {
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 20px;
  width: 4px;
  background: #dc2626;
  border-radius: 0 4px 4px 0;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.card-title-group {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.card-id {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: .04em;
  font-family: 'Consolas', monospace;
}

.card-sep {
  color: #cbd5e1;
  font-weight: 700;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  white-space: nowrap;
}
.status-badge .material-symbols-outlined {
  font-size: 14px;
}
.badge-pending {
  background: #fee2e2;
  color: #991b1b;
}
.badge-terkirim {
  background: #dcfce7;
  color: #166534;
}

/* Timeline */
.timeline {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px dashed #e5e7eb;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #000;
}
.timeline-item .material-symbols-outlined {
  font-size: 16px;
  color: #64748b;
}

.timeline-label {
  font-weight: 600;
  color: #64748b;
}

.timeline-date {
  color: #000;
  font-weight: 500;
}

/* Info Box */
.info-box {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 14px;
}

.info-row {
  display: flex;
  gap: 28px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #64748b;
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.catatan-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.catatan-text {
  margin: 0;
  font-size: 13px;
  color: #000;
  line-height: 1.6;
  white-space: pre-wrap;
}

.catatan-empty {
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  font-style: italic;
}

/* Card Actions */
.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1.5px solid transparent;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: transform .15s, box-shadow .15s, background .15s;
}
.btn-action .material-symbols-outlined {
  font-size: 16px;
}
.btn-action:hover {
  transform: translateY(-1px);
}

.btn-kirim {
  background: #dcfce7;
  color: #166534;
  border-color: #bbf7d0;
}
.btn-kirim:hover {
  background: #bbf7d0;
  box-shadow: 0 4px 10px rgba(22,163,74,.2);
}

.btn-edit {
  background: #dbeafe;
  color: #1e40af;
  border-color: #bfdbfe;
}
.btn-edit:hover {
  background: #bfdbfe;
  box-shadow: 0 4px 10px rgba(37,99,235,.2);
}

.btn-hapus {
  background: #fee2e2;
  color: #991b1b;
  border-color: #fecaca;
}
.btn-hapus:hover {
  background: #fecaca;
  box-shadow: 0 4px 10px rgba(220,38,38,.2);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
  background: #fff;
  border: 2px dashed #e5e7eb;
  border-radius: 14px;
}
.empty-icon {
  font-size: 48px !important;
  margin-bottom: 8px;
  display: block;
}
.empty-state p {
  margin: 8px 0 0;
  font-size: 15px;
}

/* ── Modal ────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn .2s ease;
}

.modal-card {
  background: #fff;
  border-radius: 20px;
  width: 540px;
  max-width: 92vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,.18);
  animation: slideUp .25s ease;
  color: #000;
}

@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px 0;
}
.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  margin: 0;
}
.modal-close {
  background: #f1f5f9;
  border: none;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: background .15s;
}
.modal-close:hover { background: #e2e8f0; }

.modal-form { padding: 24px 28px 28px; }

.form-group { margin-bottom: 18px; }
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.label-opt {
  font-weight: 400;
  text-transform: none;
  font-size: 11px;
  color: #94a3b8;
}

.form-group input,
.form-group textarea {
  color: #000;
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  background: #f8fafc;
  resize: vertical;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-batal {
  padding: 12px 24px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background .15s;
}
.btn-batal:hover { background: #f1f5f9; }

.btn-simpan {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #006e25, #00a63e);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0,110,37,.2);
  transition: transform .15s, box-shadow .15s;
}
.btn-simpan:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,110,37,.3);
}
.btn-simpan .material-symbols-outlined { font-size: 18px; }

/* ── Footer ───────────────────────────────────────────────── */
footer {
  background-color: #222;
  color: white;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 768px) {
  .summary-row    { grid-template-columns: 1fr; }
  .pesanan-header { flex-direction: column; align-items: flex-start; }
  .form-row       { grid-template-columns: 1fr; }
  .info-row       { gap: 14px; }
  .card-actions   { justify-content: stretch; }
  .btn-action     { flex: 1; justify-content: center; }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>