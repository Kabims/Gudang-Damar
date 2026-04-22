<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import Navbar from '@/components/Navbar.vue';

// Define expected properties from the Inertia page
const props = defineProps({
    transactions: {
        type: Object,
        default: () => ({
            data: [],
            current_page: 1,
            last_page: 1,
            total: 0,
        }),
    },
    stats: {
        type: Object,
        default: () => ({
            total_transaksi: 1284,
            total_barang_terjual: 4592,
            total_pendapatan: 2400000000,
        }),
    },
});

// Format date to locale string
const formatDate = (dateString: string) => {
    if (!dateString) {
return '-';
}

    // Example format: 24 Jan 2024
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

// Format currency IDR
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Determine status based on dates or passed status field
const getStatus = (item: any) => {
    return item.tanggalterkirim ? 'Selesai' : 'Dipesan';
};

// Determine proper icon based on category/bahan
const getIcon = (kategori: string) => {
    const k = kategori ? kategori.toLowerCase() : '';

    if (k.includes('alat')) {
return 'construction';
}

    if (k.includes('material') || k.includes('baja')) {
return 'square_foot';
}

    if (
        k.includes('komponen') ||
        k.includes('electric') ||
        k.includes('galvanis')
    ) {
return 'settings_input_component';
}

    if (k.includes('pipa')) {
return 'plumbing';
}

    return 'inventory';
};

// Default fake items if database data is empty to showcase the design
const displayTransactions = computed(() => {
    if (
        props.transactions &&
        props.transactions.data &&
        props.transactions.data.length > 0
    ) {
        return props.transactions.data;
    }

    // Fallback UI matching the HTML design perfectly
    return [
        {
            id_pesanan: 1,
            nama_barang: 'Excavator Hydraulic Pump',
            bahan: 'Alat Berat',
            jumlah: 2,
            harga_satuan: 45000000,
            tanggalterkirim: '2024-01-24',
            tanggalpemesanan: '2024-01-24',
        },
        {
            id_pesanan: 2,
            nama_barang: 'Baja Profil H-Beam 200',
            bahan: 'Material',
            jumlah: 50,
            harga_satuan: 2150000,
            tanggalterkirim: null, // Still ordered
            tanggalpemesanan: '2024-01-23',
        },
        {
            id_pesanan: 3,
            nama_barang: 'Cable Tray Galvanis 300mm',
            bahan: 'Komponen',
            jumlah: 120,
            harga_satuan: 450000,
            tanggalterkirim: null,
            tanggalpemesanan: '2024-01-22',
        },
        {
            id_pesanan: 4,
            nama_barang: 'Electrical Switchboard G-12',
            bahan: 'Alat Berat',
            jumlah: 5,
            harga_satuan: 12800000,
            tanggalterkirim: '2024-01-21',
            tanggalpemesanan: '2024-01-21',
        },
        {
            id_pesanan: 5,
            nama_barang: 'Pipa Galvanis 4 Inch',
            bahan: 'Material',
            jumlah: 300,
            harga_satuan: 185000,
            tanggalterkirim: '2024-01-20',
            tanggalpemesanan: '2024-01-20',
        },
    ];
});
</script>

<template>
    <div
        style="
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f8f9fa;
        "
    >
        <Head>
            <title>Riwayat Barang - Gudang Damar</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
        </Head>

        <!-- Use Existing Navbar like in Dashboard -->
        <Navbar />

        <!-- Main Content Area -->
        <main
            style="
                flex: 1;
                padding: 40px 20px;
                max-width: 1600px;
                margin: 0 auto;
                width: 100%;
                box-sizing: border-box;
            "
            class="font-body text-[#191c1d]"
        >
            <!-- Header Section -->
            <div class="mb-10">
                <nav
                    class="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase"
                >
                    <a href="/barang">Penyimpanan</a>
                    <span
                        class="material-symbols-outlined text-[14px]"
                        data-icon="chevron_right"
                        >chevron_right</span
                    >
                    <span class="text-[#001e40]">Riwayat Barang</span>
                </nav>
                <div
                    class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
                >
                    <div>
                        <h2
                            class="mb-2 text-4xl font-extrabold tracking-tight text-[#001e40]"
                        >
                            Riwayat Barang
                        </h2>
                        <p class="text-lg text-[#43474f]">
                            Daftar barang yang telah dipesan atau dibeli.
                        </p>
                    </div>
                    <button
                        class="flex items-center gap-2 rounded-lg bg-[#006e25] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#006e25]/20 transition-all hover:opacity-90"
                    >
                        <span
                            class="material-symbols-outlined text-sm"
                            data-icon="file_download"
                            >file_download</span
                        >
                        Export Data
                    </button>
                </div>
            </div>

            <!-- Summary Cards -->
            <div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div
                    class="group rounded-xl bg-white p-6 shadow-[0_12px_40px_rgba(0,30,64,0.04)] transition-all duration-300 hover:shadow-lg"
                >
                    <div class="mb-4 flex items-start justify-between">
                        <div
                            class="rounded-lg bg-[#f3f4f5] p-3 transition-colors group-hover:bg-[#003366] group-hover:text-white"
                        >
                            <span
                                class="material-symbols-outlined"
                                data-icon="receipt_long"
                                >receipt_long</span
                            >
                        </div>
                        <span
                            class="flex items-center gap-1 rounded-full bg-[#80f98b] px-2 py-1 text-xs font-bold text-[#006e25]"
                        >
                            <span
                                class="material-symbols-outlined text-[14px]"
                                data-icon="trending_up"
                                >trending_up</span
                            >
                            +12.5%
                        </span>
                    </div>
                    <p
                        class="mb-1 text-[11px] font-bold tracking-widest text-slate-400 uppercase"
                    >
                        Total Transaksi
                    </p>
                    <h3
                        class="text-3xl font-extrabold tracking-tight text-[#001e40]"
                    >
                        {{ stats.total_transaksi.toLocaleString('id-ID') }}
                    </h3>
                </div>

                <div
                    class="group rounded-xl bg-white p-6 shadow-[0_12px_40px_rgba(0,30,64,0.04)] transition-all duration-300 hover:shadow-lg"
                >
                    <div class="mb-4 flex items-start justify-between">
                        <div
                            class="rounded-lg bg-[#f3f4f5] p-3 transition-colors group-hover:bg-[#003366] group-hover:text-white"
                        >
                            <span
                                class="material-symbols-outlined"
                                data-icon="inventory"
                                >inventory</span
                            >
                        </div>
                        <span
                            class="flex items-center gap-1 rounded-full bg-[#80f98b] px-2 py-1 text-xs font-bold text-[#006e25]"
                        >
                            <span
                                class="material-symbols-outlined text-[14px]"
                                data-icon="trending_up"
                                >trending_up</span
                            >
                            +8.2%
                        </span>
                    </div>
                    <p
                        class="mb-1 text-[11px] font-bold tracking-widest text-slate-400 uppercase"
                    >
                        Total Barang Terjual
                    </p>
                    <h3
                        class="text-3xl font-extrabold tracking-tight text-[#001e40]"
                    >
                        {{ stats.total_barang_terjual.toLocaleString('id-ID') }}
                    </h3>
                </div>

                <div
                    class="group rounded-xl border-l-4 border-[#006e25] bg-white p-6 shadow-[0_12px_40px_rgba(0,30,64,0.04)] transition-all duration-300 hover:shadow-lg"
                >
                    <div class="mb-4 flex items-start justify-between">
                        <div
                            class="rounded-lg bg-[#f3f4f5] p-3 transition-colors group-hover:bg-[#003366] group-hover:text-white"
                        >
                            <span
                                class="material-symbols-outlined"
                                data-icon="payments"
                                >payments</span
                            >
                        </div>
                        <span
                            class="flex items-center gap-1 rounded-full bg-[#80f98b] px-2 py-1 text-xs font-bold text-[#006e25]"
                        >
                            <span
                                class="material-symbols-outlined text-[14px]"
                                data-icon="trending_up"
                                >trending_up</span
                            >
                            +24.0%
                        </span>
                    </div>
                    <p
                        class="mb-1 text-[11px] font-bold tracking-widest text-slate-400 uppercase"
                    >
                        Total Pendapatan
                    </p>
                    <h3
                        class="text-3xl font-extrabold tracking-tight text-[#001e40]"
                    >
                        {{
                            typeof stats.total_pendapatan === 'number' &&
                            stats.total_pendapatan >= 1000000000
                                ? 'Rp ' +
                                  (stats.total_pendapatan / 1000000000).toFixed(
                                      1,
                                  ) +
                                  'B'
                                : formatCurrency(stats.total_pendapatan)
                        }}
                    </h3>
                </div>
            </div>

            <!-- Filter Bar -->
            <div
                class="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-[#f3f4f5] p-5"
            >
                <div class="relative min-w-[250px] flex-1 md:min-w-[300px]">
                    <span
                        class="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                        data-icon="search"
                        >search</span
                    >
                    <input
                        class="w-full rounded-lg border-none bg-white py-3 pr-4 pl-11 text-sm focus:ring-2 focus:ring-[#006e25]/50"
                        placeholder="Cari nama barang..."
                        type="text"
                    />
                </div>
                <div class="flex flex-wrap gap-3">
                    <div
                        class="flex items-center gap-2 rounded-lg border border-transparent bg-white px-3 py-1.5 transition-all focus-within:border-[#006e25]/30"
                    >
                        <span
                            class="material-symbols-outlined text-lg text-slate-400"
                            data-icon="calendar_today"
                            >calendar_today</span
                        >
                        <input
                            class="w-36 border-none bg-transparent p-0 text-sm font-medium focus:ring-0"
                            type="text"
                            value="01 Jan - 31 Jan 2024"
                        />
                    </div>
                    <select
                        class="cursor-pointer rounded-lg border-none bg-white px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#006e25]/50"
                    >
                        <option>Semua Status</option>
                        <option>Dipesan</option>
                        <option>Dibeli</option>
                        <option>Selesai</option>
                    </select>
                    <select
                        class="cursor-pointer rounded-lg border-none bg-white px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#006e25]/50"
                    >
                        <option>Kategori</option>
                        <option>Material</option>
                        <option>Alat Berat</option>
                        <option>Komponen</option>
                    </select>
                    <button
                        class="rounded-lg bg-[#001e40] p-2.5 text-white transition-all hover:opacity-90"
                    >
                        <span class="material-symbols-outlined" data-icon="tune"
                            >tune</span
                        >
                    </button>
                </div>
            </div>

            <!-- Main Table -->
            <div
                class="overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_rgba(0,30,64,0.04)]"
            >
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-left">
                        <thead>
                            <tr
                                class="border-b border-[#c3c6d1]/20 bg-[#f3f4f5]"
                            >
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Nama Barang
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Kategori
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Jumlah
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Harga Satuan
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Total Harga
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-6 py-4 text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Tanggal Transaksi
                                </th>
                                <th
                                    class="px-6 py-4 text-right text-[10px] font-extrabold tracking-[0.15em] text-slate-500 uppercase"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#c3c6d1]/10">
                            <tr
                                v-for="(item, index) in displayTransactions"
                                :key="index"
                                class="transition-colors hover:bg-[#f3f4f5]/60"
                            >
                                <td class="px-6 py-5">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-10 w-10 items-center justify-center rounded bg-[#f3f4f5] text-[#001e40]"
                                        >
                                            <span
                                                class="material-symbols-outlined"
                                                >{{ getIcon(item.bahan) }}</span
                                            >
                                        </div>
                                        <span
                                            class="font-bold text-[#001e40]"
                                            >{{ item.nama_barang }}</span
                                        >
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-5 text-sm font-medium text-[#43474f]"
                                >
                                    {{ item.bahan || '-' }}
                                </td>
                                <td
                                    class="px-6 py-5 text-sm font-bold text-[#001e40]"
                                >
                                    {{ item.jumlah }} Unit
                                </td>
                                <td class="px-6 py-5 text-sm text-[#43474f]">
                                    {{
                                        item.harga_satuan
                                            ? formatCurrency(item.harga_satuan)
                                            : '-'
                                    }}
                                </td>
                                <td
                                    class="px-6 py-5 text-sm font-extrabold text-[#001e40]"
                                >
                                    {{
                                        item.harga_satuan
                                            ? formatCurrency(
                                                  item.jumlah *
                                                      item.harga_satuan,
                                              )
                                            : '-'
                                    }}
                                </td>
                                <td class="px-6 py-5">
                                    <span
                                        v-if="getStatus(item) === 'Selesai'"
                                        class="rounded-full bg-[#80f98b] px-3 py-1 text-[10px] font-extrabold tracking-widest text-[#007327] uppercase"
                                    >
                                        Selesai
                                    </span>
                                    <span
                                        v-else-if="getStatus(item) === 'Dibeli'"
                                        class="rounded-full bg-[#001e40]/10 px-3 py-1 text-[10px] font-extrabold tracking-widest text-[#001e40] uppercase"
                                    >
                                        Dibeli
                                    </span>
                                    <span
                                        v-else
                                        class="rounded-full bg-[#ffdad6] px-3 py-1 text-[10px] font-extrabold tracking-widest text-[#93000a] uppercase"
                                    >
                                        Dipesan
                                    </span>
                                </td>
                                <td class="px-6 py-5 text-sm text-[#43474f]">
                                    {{
                                        formatDate(
                                            item.tanggalpemesanan ||
                                                item.tanggal_transaksi,
                                        )
                                    }}
                                </td>
                                <td class="px-6 py-5 text-right">
                                    <button
                                        class="rounded-lg p-2 text-[#001e40] transition-all hover:bg-[#001e40]/5"
                                    >
                                        <span
                                            class="material-symbols-outlined"
                                            data-icon="visibility"
                                            >visibility</span
                                        >
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="displayTransactions.length === 0">
                                <td
                                    colspan="8"
                                    class="px-6 py-10 text-center text-slate-500"
                                >
                                    Belum ada riwayat transaksi.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Footer -->
                <div
                    class="flex flex-col items-center justify-between gap-4 border-t border-[#c3c6d1]/20 bg-[#f3f4f5]/50 px-6 py-4 md:flex-row"
                >
                    <p
                        class="text-center text-xs font-bold tracking-widest text-slate-500 uppercase md:text-left"
                    >
                        Showing {{ displayTransactions.length }} of
                        {{
                            transactions?.total || stats.total_transaksi
                        }}
                        Transactions
                    </p>
                    <div class="flex items-center gap-2">
                        <button
                            class="p-2 text-slate-400 transition-colors hover:text-[#001e40] disabled:opacity-30"
                            :disabled="transactions?.current_page === 1"
                        >
                            <span
                                class="material-symbols-outlined"
                                data-icon="chevron_left"
                                >chevron_left</span
                            >
                        </button>
                        <div class="flex items-center gap-1">
                            <button
                                class="h-8 w-8 rounded-lg bg-[#001e40] text-xs font-bold text-white shadow-md shadow-[#001e40]/20"
                            >
                                1
                            </button>
                            <button
                                class="h-8 w-8 rounded-lg text-xs font-bold transition-all hover:bg-[#f3f4f5]"
                            >
                                2
                            </button>
                            <button
                                class="h-8 w-8 rounded-lg text-xs font-bold transition-all hover:bg-[#f3f4f5]"
                            >
                                3
                            </button>
                            <span class="px-2 text-slate-400">...</span>
                            <button
                                class="h-8 w-8 rounded-lg text-xs font-bold transition-all hover:bg-[#f3f4f5]"
                            >
                                24
                            </button>
                        </div>
                        <button
                            class="p-2 text-slate-400 transition-colors hover:text-[#001e40]"
                        >
                            <span
                                class="material-symbols-outlined"
                                data-icon="chevron_right"
                                >chevron_right</span
                            >
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <footer>&copy; 2025 GudangDamar. All rights reserved.</footer>
    </div>
</template>

<style scoped>
.font-body {
    font-family: 'Inter', sans-serif;
}
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

footer {
    background-color: #222;
    color: white;
    padding: 12px;
    text-align: center;
    font-size: 14px;
}
</style>
