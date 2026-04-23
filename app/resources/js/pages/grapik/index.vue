<script setup>
// Jika menggunakan Nuxt, ApexCharts biasanya perlu di-load sebagai client-side component
import { ref, onMounted } from 'vue';

const series = ref([{
  name: 'Data Penjualan',
  data: [31, 40, 28, 51, 42, 109, 100]
}]);

const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: { show: false },
  },
  colors: ['#0061A7'], // Sesuaikan dengan warna primary Anda
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  xaxis: {
    categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
  },
  tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Analisis Grafik</h1>
        <p class="text-slate-500 text-sm">Pantau performa data Anda secara real-time.</p>
      </div>
      
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm hover:bg-slate-50 transition-all">
          <span class="material-symbols-outlined text-lg">calendar_today</span>
          7 Hari Terakhir
        </button>
        <button class="bg-primary text-white p-2 rounded-lg hover:opacity-90">
          <span class="material-symbols-outlined">download</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <p class="text-slate-500 text-xs font-medium uppercase">Total Revenue</p>
        <h3 class="text-xl font-bold mt-1">Rp 12.500.000</h3>
        <span class="text-green-500 text-xs font-bold flex items-center mt-2">
          <span class="material-symbols-outlined text-sm">trending_up</span> +12%
        </span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-slate-700">Statistik Mingguan</h2>
        <span class="material-symbols-outlined text-slate-400 cursor-pointer">more_horiz</span>
      </div>
      
      <ClientOnly>
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </ClientOnly>
    </div>
  </div>
</template>