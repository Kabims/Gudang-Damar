<?php

namespace App\Models;

use Illuminate\Support\Collection;

/**
 * Model Aktivitas
 *
 * Model ini TIDAK terhubung ke tabel fisik di database.
 * Fungsinya sebagai "aggregator" yang menggabungkan 3 sumber data:
 *   1. pesanan  -> jenis: "Pesanan"
 *   2. barang   -> jenis: "Barang"
 *   3. servis   -> jenis: "Servis"
 *
 * Hasil gabungan ini akan ditampilkan di halaman Riwayat/Index.vue
 * dengan format yang seragam.
 */
class Aktivitas
{
    /**
     * Ambil semua aktivitas dari 3 tabel, digabung & diurutkan.
     *
     * @param  array  $filters  ['search' => string, 'jenis' => string, 'status' => string, 'start_date' => ..., 'end_date' => ...]
     * @return Collection
     */
    public static function all(array $filters = []): Collection
    {
        $pesanan = self::fromPesanan($filters);
        $barang  = self::fromBarang($filters);
        $servis  = self::fromServis($filters);

        // Gabungkan ketiganya
        $merged = $pesanan->concat($barang)->concat($servis);

        // Urutkan berdasarkan tanggal terbaru
        return $merged->sortByDesc(function ($item) {
            return $item['tanggalpemesanan'] ?? $item['tanggal_transaksi'] ?? '';
        })->values();
    }

    /**
     * Ambil data dari tabel pesanan (jenis: Pesanan)
     */
    protected static function fromPesanan(array $filters = []): Collection
    {
        $query = Pesanan::query()->with('barang');

        if (!empty($filters['search'])) {
            $query->where('nama_barang', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['start_date'])) {
            $query->whereDate('tanggalpemesanan', '>=', $filters['start_date']);
        }

        if (!empty($filters['end_date'])) {
            $query->whereDate('tanggalpemesanan', '<=', $filters['end_date']);
        }

        return $query->get()->map(function ($row) {
            $hargaSatuan = $row->barang->harga ?? 0;

            return [
                'id'                => $row->id_pesanan,
                'jenis'             => 'Pesanan',
                'nama_barang'       => $row->nama_barang,
                'bahan'             => $row->bahan,
                'kategori'          => $row->bahan,
                'jumlah'            => $row->jumlah,
                'harga_satuan'      => $hargaSatuan,
                'total_harga'       => $hargaSatuan * $row->jumlah,
                'catatan'           => $row->catatan,
                'bentuk'            => $row->bentuk,
                'ukuran'            => $row->ukuran,
                'ketebalan'         => $row->ketebalan,
                'tanggalpemesanan'  => $row->tanggalpemesanan,
                'tanggalterkirim'   => $row->tanggalterkirim,
                'tanggal_transaksi' => $row->tanggalpemesanan,
                'status'            => $row->tanggalterkirim ? 'Selesai' : 'Dipesan',
            ];
        });
    }

    /**
     * Ambil data dari tabel barang (jenis: Barang)
     * Barang biasa = barang yang ada di stok / sudah dibeli.
     */
    protected static function fromBarang(array $filters = []): Collection
    {
        $query = Barang::query();

        if (!empty($filters['search'])) {
            $query->where('nama', 'like', '%' . $filters['search'] . '%');
        }

        return $query->get()->map(function ($row) {
            return [
                'id'                => $row->id_barang,
                'jenis'             => 'Barang',
                'nama_barang'       => $row->nama,
                'bahan'             => $row->bahan,
                'kategori'          => $row->bahan,
                'jumlah'            => $row->jumlah,
                'harga_satuan'      => $row->harga,
                'total_harga'       => $row->total ?? ($row->harga * $row->jumlah),
                'catatan'           => $row->guna_merek,
                'bentuk'            => $row->bentuk,
                'ukuran'            => $row->ukuran,
                'ketebalan'         => $row->ketebalan,
                'tanggalpemesanan'  => null,
                'tanggalterkirim'   => null,
                'tanggal_transaksi' => null,
                'status'            => 'Dibeli',
            ];
        });
    }

    /**
     * Ambil data dari tabel servis (jenis: Servis)
     */
    protected static function fromServis(array $filters = []): Collection
    {
        $query = Servis::query();

        if (!empty($filters['search'])) {
            $query->where('nama_barang', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['start_date'])) {
            $query->whereDate('tanggalpemesanan', '>=', $filters['start_date']);
        }

        if (!empty($filters['end_date'])) {
            $query->whereDate('tanggalpemesanan', '<=', $filters['end_date']);
        }

        return $query->get()->map(function ($row) {
            $isSelesai = !empty($row->tanggalterkirim) && !str_starts_with($row->tanggalterkirim, '1970-01-01') && !str_starts_with($row->tanggalterkirim, '0000-00-00');

            return [
                'id'                => $row->id_pesanan,
                'jenis'             => 'Servis',
                'nama_barang'       => $row->nama_barang,
                'bahan'             => $row->bahan,
                'kategori'          => $row->bahan,
                'jumlah'            => $row->jumlah,
                'harga_satuan'      => 0, // Servis tidak punya harga satuan di tabelnya
                'total_harga'       => 0,
                'catatan'           => $row->catatan,
                'bentuk'            => $row->bentuk_barang,
                'ukuran'            => null,
                'ketebalan'         => null,
                'tanggalpemesanan'  => $row->tanggalpemesanan,
                'tanggalterkirim'   => $row->tanggalterkirim,
                'tanggal_transaksi' => $row->tanggalpemesanan,
                'status'            => $isSelesai ? 'Selesai' : 'Diproses',
            ];
        });
    }

    /**
     * Hitung statistik total untuk ditampilkan di kartu summary.
     */
    public static function stats(): array
    {
        $totalPesanan = Pesanan::count();
        $totalBarang  = Barang::sum('jumlah') ?? 0;
        $totalServis  = Servis::count();

        // Total pendapatan = (harga barang x jumlah di pesanan) + total barang langsung
        $pendapatanPesanan = Pesanan::with('barang')->get()->sum(function ($p) {
            return ($p->barang->harga ?? 0) * $p->jumlah;
        });

        $pendapatanBarang = Barang::sum('total') ?? 0;

        return [
            'total_transaksi'       => $totalPesanan + $totalServis,
            'total_barang_terjual'  => $totalBarang,
            'total_pendapatan'      => $pendapatanPesanan + $pendapatanBarang,
            'total_pesanan'         => $totalPesanan,
            'total_servis'          => $totalServis,
        ];
    }
}