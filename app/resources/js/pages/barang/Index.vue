<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

interface Barang {
    id_barang: number;
    nama: string;
    guna_merek: string;
    ukuran: number;
    ketebalan: string;
    bentuk: string;
    bahan: string;
    harga: number;
    jumlah: number;
    total: number;
}

const props = defineProps<{
    barangList: Barang[];
}>();

const search = ref('');
const sortBy = ref<keyof Barang>('id_barang');
const sortDir = ref<'asc' | 'desc'>('asc');
const showMenu = ref(false);

const columns = [
    ['id_barang', 'Default (ID)'],
    ['nama', 'Nama'],
    ['guna_merek', 'Merek/Guna'],
    ['ukuran', 'Ukuran'],
    ['ketebalan', 'Ketebalan'],
    ['bentuk', 'Bentuk'],
    ['bahan', 'Bahan'],
    ['harga', 'Harga'],
    ['jumlah', 'Jumlah'],
    ['total', 'Total'],
] as const;

// Filter + Sort di client-side (semua instan, no request ke server)
const filteredList = computed(() => {
    let list = [...props.barangList];

    // Filter
    if (search.value) {
        const s = search.value.toLowerCase();
        list = list.filter(b =>
            b.nama?.toLowerCase().includes(s) ||
            b.guna_merek?.toLowerCase().includes(s) ||
            b.bentuk?.toLowerCase().includes(s) ||
            b.bahan?.toLowerCase().includes(s) ||
            b.ketebalan?.toLowerCase().includes(s)
        );
    }

    // Sort
    const key = sortBy.value;
    const dir = sortDir.value === 'asc' ? 1 : -1;
    return list.sort((a, b) => {
        const va = a[key], vb = b[key];
        if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
        return String(va).localeCompare(String(vb), 'id') * dir;
    });
});

const activeLabel = computed(
    () => columns.find(c => c[0] === sortBy.value)?.[1] ?? 'Sort'
);

const rupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

function hapus(id: number) {
    if (confirm('Yakin ingin menghapus barang ini?')) router.delete(`/barang/${id}`);
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="max-w-7xl mx-auto mt-10 px-4">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                        📦 List Barang
                    </h1>
                    <p class="text-sm text-gray-500">
                        Kelola semua barang dengan mudah
                    </p>
        <h1 class="text-2xl font-bold mb-5">List Barang</h1>

        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
            <Link href="/barang/create"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-fit">
                + Tambah Barang
            </Link>

            <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                <input v-model="search" type="text"
                       placeholder="🔍︎ Cari nama, merek, bahan, bentuk..."
                       class="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-72 text-black" />

                <div class="relative flex gap-1">
                    <button @click="showMenu = !showMenu"
                            class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap text-gray-700">
                        Sort: {{ activeLabel }} <span class="text-xs">▼</span>
                    </button>
                    <button @click="sortDir = sortDir === 'asc' ? 'desc' : 'asc'"
                            class="bg-gray-200 hover:bg-gray-300 px-3 py-2 flex rounded-lg items-center gap-1 text-gray-700">
                        {{ sortDir === 'asc' ? '↑' : '↓' }}
                    </button>

                    <div v-if="showMenu"
                         class="absolute top-full mt-1 bg-white border shadow-lg z-10 w-48 rounded-lg">
                        <button v-for="[key, label] in columns" :key="key"
                                @click="sortBy = key; showMenu = false"
                                class="block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                                :class="{ 'bg-blue-500 text-white ': sortBy === key }">
                            {{ label }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="($page.props.flash as any)?.success"
            class="bg-green-100 text-green-700 p-3 rounded mb-4">
            {{ ($page.props.flash as any).success }}
        </div>

        <div class="overflow-x-auto">
            <table class="w-full bg-white rounded-xl shadow">
                <thead class="bg-gray-200 text-gray-700">
                    <tr>
                        <th v-for="h in ['Nama','Merek/Guna','Ukuran','Ketebalan','Bentuk','Bahan','Harga','Jumlah','Total','Aksi']"
                            :key="h" class="p-3">{{ h }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!filteredList.length">
                        <td colspan="10" class="p-6 text-center text-gray-500">
                            Tidak ada barang ditemukan
                        </td>
                    </tr>
                    <tr v-for="b in filteredList" :key="b.id_barang"
                        class="border-t text-center hover:bg-gray-50 text-black">
                        <td class="p-3">{{ b.nama }}</td>
                        <td class="p-3">{{ b.guna_merek }}</td>
                        <td class="p-3">{{ b.ukuran }}</td>
                        <td class="p-3">{{ b.ketebalan }}</td>
                        <td class="p-3">{{ b.bentuk }}</td>
                        <td class="p-3">{{ b.bahan }}</td>
                        <td class="p-3">{{ rupiah(b.harga) }}</td>
                        <td class="p-3">{{ b.jumlah }}</td>
                        <td class="p-3 font-semibold">{{ rupiah(b.total) }}</td>
                        <td class="p-3 space-x-1 whitespace-nowrap">
                            <Link :href="`/barang/${b.id_barang}`"
                                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Detail</Link>
                            <Link :href="`/barang/${b.id_barang}/edit`"
                                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">Edit</Link>
                            <button @click="hapus(b.id_barang)"
                                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-3 text-sm text-gray-600">
            Total: <span class="font-semibold">{{ filteredList.length }}</span> 
            dari {{ barangList.length }} barang
            <span v-if="search">| Pencarian: "<span class="font-semibold">{{ search }}</span>"</span>
            <span v-if="sortBy !== 'id_barang'">
                | Sort: <span class="font-semibold">{{ activeLabel }}</span>
                ({{ sortDir === 'asc' ? 'A-Z' : 'Z-A' }})
            </span>
        </div>
    </div>
    </div>
</template>