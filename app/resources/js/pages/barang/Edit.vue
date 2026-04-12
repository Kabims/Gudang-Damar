<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';

const props = defineProps<{
    barang: {
        id_barang: number;
        nama: string;
        harga: number;
        jumlah: number;
        ukuran: number;
        ketebalan: string;
        bahan: string;
    };
}>();

const form = useForm({
    nama: props.barang.nama,
    harga: { harga: props.barang.harga },
    kategori: {
        ukuran: props.barang.ukuran,
        ketebalan: props.barang.ketebalan,
        bahan: props.barang.bahan,
    },
});

function submit() {
    form.put(`/barang/${props.barang.id_barang}`);
}
</script>

<template>
    <main class="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6">
        <h2 class="text-xl font-bold text-center mb-6 text-gray-800">
            Edit Barang
        </h2>

        <form @submit.prevent="submit">
            <label class="block mb-1 font-semibold text-gray-700">Nama</label>
            <input v-model="form.nama" type="text"
                   class="w-full p-2 mb-4 border rounded-lg" />

            <label class="block mb-1 font-semibold text-gray-700">Ukuran</label>
            <input v-model="form.kategori.ukuran" type="number"
                   class="w-full p-2 mb-4 border rounded-lg" />

            <label class="block mb-1 font-semibold text-gray-700">Ketebalan</label>
            <input v-model="form.kategori.ketebalan" type="text"
                   class="w-full p-2 mb-4 border rounded-lg" />

            <label class="block mb-1 font-semibold text-gray-700">Bahan</label>
            <input v-model="form.kategori.bahan" type="text"
                   class="w-full p-2 mb-4 border rounded-lg" />

            <label class="block mb-1 font-semibold text-gray-700">Harga (Rp)</label>
            <input v-model="form.harga.harga" type="number"
                   class="w-full p-2 mb-4 border rounded-lg" />

            <div class="flex flex-col gap-3 mt-4">
                <button type="submit"
                        class="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-bold shadow">
                    Simpan Perubahan
                </button>
                <Link :href="`/barang/${barang.id_barang}`"
                      class="text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg font-bold">
                    Kembali
                </Link>
            </div>
        </form>
    </main>
</template>