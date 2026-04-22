<script setup>
import { router, Link } from '@inertiajs/vue3';
import { ref, reactive } from 'vue';
import Navbar from '@/components/Navbar.vue';

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
  if (!dateString) {
return '-'
}

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
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
  if (confirm('Tandai pesanan ini sebagai terkirim?')) {
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
      <!-- Header -->
    <div class="pesanan-header">
      <div class="header-text">
        <nav class="breadcrumb">
          <a href="/dashboard">Dashboard</a>
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
            <p class="summary-label">Belum Terkirim</p>
            <h3 class="summary-value">{{ pesananList.filter(p => !p.tanggalterkirim).length }}</h3>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon green">
            <span class="material-symbols-outlined">local_shipping</span>
          </div>
          <div>
            <p class="summary-label">Terkirim</p>
            <h3 class="summary-value">{{ pesananList.filter(p => p.tanggalterkirim).length }}</h3>
          </div>
        </div>
      </div>

      <!-- Order Cards List (Main Section) -->
      <div class="flex flex-col gap-4 mt-6">
        <div v-for="p in pesananList" :key="p.id_pesanan"
             class="bg-white rounded-xl p-4.5 border flex flex-col gap-3.5 shadow-lg relative group transition-colors"
             :class="[
               p.tanggalterkirim ? 'border-outline-variant/15 hover:border-outline-variant/30 opacity-90' : 'border-error-container/50 hover:border-error-container'
             ]">
          
          <div v-if="!p.tanggalterkirim" class="absolute left-0 top-4 bottom-4 w-1 bg-error rounded-r-full"></div>

          <!-- Card Header -->
          <div class="bg-white rounded-xl shadow" :class="{ 'pl-2': !p.tanggalterkirim }">
            <div class="bg-white rounded-t-xl p-2">
              <span class="font-label text-[15px] font-black text-primary tracking-wide">
                {{ String(p.id_pesanan).padStart(6, '0') }} - {{ p.nama_barang }}
              </span>
              <div class="flex items-center gap-1 text-[11px] font-label tracking-wide"
                   :class="!p.tanggalterkirim ? 'text-error font-bold' : 'text-on-surface-variant'">
                <span class="material-symbols-outlined text-[12px]">{{ !p.tanggalterkirim ? 'warning' : 'schedule' }}</span>
                {{ p.tanggalpemesanan ? formatDate(p.tanggalpemesanan) : 'Belum' }}
                <template v-if="p.tanggalterkirim">
                  <span class="mx-1">•</span>
                  <span class="material-symbols-outlined text-[12px]">local_shipping</span>
                  {{ formatDate(p.tanggalterkirim) }}
                </template>
              </div>
            </div>
            <div v-if="!p.tanggalterkirim" class="inline-flex bg-red-100 text-red-700 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[14px]">pending_actions</span>
              BELUM
            </div>
            <div v-else class="inline-flex bg-green-100 text-green-700 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-widest items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined text-[14px]">local_shipping</span>
              TERKIRIM
            </div>
          </div>

          <!-- Card Body (Notes) -->
          <div class="bg-surface-container-low rounded-lg p-3 border border-outline-variant/10" :class="{ 'ml-2': !p.tanggalterkirim }">
            <div class="text-[13px] text-on-surface-variant font-body mb-2">
              <strong>Bahan:</strong> {{ p.bahan }} <span class="mx-2">|</span> <strong>Jumlah:</strong> {{ p.jumlah }}
            </div>
            <p v-if="p.catatan" class="text-[13px] text-on-surface-variant font-body line-clamp-2 leading-relaxed">
              {{ p.catatan }}
            </p>
            <p v-else class="text-[13px] text-on-surface-variant font-body italic opacity-50">
              Tidak ada catatan khusus.
            </p>
          </div>

          <!-- Card Actions -->
          <div class="flex justify-end gap-2 pt-1 border-t border-gray-200 bg-white rounded-b-xl transition-colors">
            <button v-if="!p.tanggalterkirim" class="p-2 rounded-DEFAULT text-secondary bg-surface hover:bg-secondary-container/30 transition-colors flex items-center justify-center group/btn" title="Tandai Terkirim" @click="tandaiTerkirim(p.id_pesanan)">
              <span class="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">check_circle</span>
            </button>
            <Link :href="`/pesanan/${p.id_pesanan}/edit`" class="p-2 rounded-DEFAULT text-on-surface-variant bg-surface hover:bg-surface-container transition-colors flex items-center justify-center group/btn" title="Edit">
              <span class="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">edit_square</span>
            </Link>
            <button class="p-2 rounded-DEFAULT text-error bg-surface hover:bg-error-container/30 transition-colors flex items-center justify-center group/btn" title="Hapus" @click="hapusPesanan(p.id_pesanan)">
              <span class="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">delete</span>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="pesananList.length === 0" class="text-center p-10 text-on-surface-variant opacity-50 border border-dashed border-outline-variant/30 rounded-xl">
          <span class="material-symbols-outlined text-4xl mb-2">inbox</span>
          <p>Belum ada data pesanan.</p>
        </div>
      </div>
    </main>

    <!-- ── Modal Tambah / Edit ─────────────────────────────── -->
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
.bc-arrow { font-size: 14px !important; }
.bc-active { color: #001e40; }
.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #001e40;
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
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.summary-icon.blue   { background: #dbeafe; color: #2563eb; }
.summary-icon.orange { background: #ffedd5; color: #ea580c; }
.summary-icon.green  { background: #dcfce7; color: #16a34a; }
.summary-icon .material-symbols-outlined { font-size: 24px; }
.summary-label {
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: .12em;
  color: #94a3b8; margin: 0 0 4px;
}
.summary-value {
  font-size: 1.75rem; font-weight: 800;
  color: #001e40; margin: 0;
}

/* ── Table ────────────────────────────────────────────────── */
.table-wrapper {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,30,64,.05);
}
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead tr { background: #f8fafc; border-bottom: 2px solid #e2e8f0; }
th {
  padding: 14px 18px;
  font-size: 10px; font-weight: 800;
  letter-spacing: .14em; text-transform: uppercase;
  color: #64748b; text-align: left; white-space: nowrap;
}
.th-aksi { text-align: center; }
tbody tr { border-bottom: 1px solid #f1f5f9; transition: background .15s; }
tbody tr:hover { background: #f8fafc; }
td {
  padding: 16px 18px;
  font-size: 14px; color: #334155;
  vertical-align: middle;
}
.td-no { font-weight: 700; color: #94a3b8; width: 50px; }
.td-jumlah { font-weight: 700; color: #001e40; }
.td-catatan { max-width: 200px; }
.catatan-text { color: #475569; font-size: 13px; }
.td-empty-val { color: #cbd5e1; }

.nama-cell { display: flex; align-items: center; gap: 10px; }
.nama-icon {
  width: 36px; height: 36px;
  border-radius: 8px; background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  color: #475569; flex-shrink: 0;
}
.nama-icon .material-symbols-outlined { font-size: 18px; }
.td-nama span { font-weight: 600; color: #001e40; }

.belum-tag {
  font-size: 12px;
  color: #94a3b8;
  font-style: italic;
}

/* ── Badge ────────────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 11px; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  white-space: nowrap;
}
.badge-terkirim { background: #dcfce7; color: #15803d; }
.badge-pending  { background: #fef3c7; color: #b45309; }

/* ── Action Buttons ───────────────────────────────────────── */
.aksi-group { display: flex; justify-content: center; gap: 6px; }
.btn-aksi {
  width: 34px; height: 34px;
  border-radius: 8px; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform .15s, box-shadow .15s;
}
.btn-aksi:hover { transform: scale(1.1); }
.btn-aksi .material-symbols-outlined { font-size: 18px; }
.btn-kirim { background: #dcfce7; color: #16a34a; }
.btn-kirim:hover { box-shadow: 0 4px 12px rgba(22,163,74,.3); }
.btn-edit  { background: #dbeafe; color: #2563eb; }
.btn-edit:hover { box-shadow: 0 4px 12px rgba(37,99,235,.3); }
.btn-hapus { background: #fee2e2; color: #dc2626; }
.btn-hapus:hover { box-shadow: 0 4px 12px rgba(220,38,38,.3); }

.td-empty {
  text-align: center;
  padding: 60px 20px !important;
  color: #94a3b8;
}
.empty-icon { font-size: 48px !important; margin-bottom: 8px; display: block; }
.td-empty p { margin: 8px 0 0; font-size: 15px; }

/* ── Modal ────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn .2s ease;
}
.modal-card {
  background: #fff; border-radius: 20px;
  width: 540px; max-width: 92vw; max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,.18);
  animation: slideUp .25s ease;
}
@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }

.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px 0;
}
.modal-header h2 {
  font-size: 1.25rem; font-weight: 800; color: #001e40; margin: 0;
}
.modal-close {
  background: #f1f5f9; border: none; border-radius: 10px;
  width: 36px; height: 36px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #64748b; transition: background .15s;
}
.modal-close:hover { background: #e2e8f0; }
.modal-form { padding: 24px 28px 28px; }

.form-group { margin-bottom: 18px; }
.form-group label {
  display: block; font-size: 12px; font-weight: 700;
  color: #475569; margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: .06em;
}
.label-opt { font-weight: 400; text-transform: none; font-size: 11px; color: #94a3b8; }
.form-group input,
.form-group textarea {
  width: 100%; padding: 12px 14px;
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

.modal-actions {
  display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;
}
.btn-batal {
  padding: 12px 24px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; background: #fff;
  color: #64748b; font-weight: 600; font-size: 14px;
  cursor: pointer; transition: background .15s;
}
.btn-batal:hover { background: #f1f5f9; }
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

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 768px) {
  .summary-row    { grid-template-columns: 1fr; }
  .pesanan-header { flex-direction: column; align-items: flex-start; }
  .form-row       { grid-template-columns: 1fr; }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>