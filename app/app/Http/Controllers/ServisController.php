<?php
// app/Http/Controllers/ServisController.php

namespace App\Http\Controllers;

use App\Models\Servis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServisController extends Controller
{
    public function index()
    {
        $servis = Servis::orderBy('tanggalpemesanan', 'desc')->get();

        return Inertia::render('servis/Index', [
            'servisList' => $servis,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_barang'   => 'required|string|max:255',
            'bahan'         => 'required|string|max:255',
            'jumlah'        => 'nullable|integer|min:1',
            'bentuk_barang' => 'nullable|integer|min:1',
            'catatan'       => 'required|string|max:1000',
        ], [
            'nama_barang.required' => 'Nama barang harus diisi.',
            'bahan.required'       => 'Bahan harus diisi.',
            'catatan.required'     => 'Catatan servis wajib diisi.',
            'catatan.max'          => 'Catatan maksimal 1000 karakter.',
        ]);

        // Default values
        $validated['jumlah']        = $validated['jumlah']        ?? 1;
        $validated['bentuk_barang'] = $validated['bentuk_barang'] ?? 0;

        // Tanggal pemesanan = sekarang
        $validated['tanggalpemesanan'] = now();

        // ✨ tanggalterkirim diisi dengan sentinel date (1970-01-01)
        // untuk menandai "belum selesai" karena kolom NOT NULL
        $validated['tanggalterkirim'] = '1970-01-01 00:00:00';

        Servis::create($validated);

        return redirect()->route('servis.index')
            ->with('success', 'Data servis berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $servis = Servis::findOrFail($id);

        $validated = $request->validate([
            'nama_barang'   => 'required|string|max:255',
            'bahan'         => 'required|string|max:255',
            'jumlah'        => 'nullable|integer|min:1',
            'bentuk_barang' => 'nullable|integer|min:1',
            'catatan'       => 'required|string|max:1000',
        ]);

        $validated['jumlah']        = $validated['jumlah']        ?? 1;
        $validated['bentuk_barang'] = $validated['bentuk_barang'] ?? 0;

        $servis->update($validated);

        return redirect()->route('servis.index')
            ->with('success', 'Data servis berhasil diperbarui.');
    }

    public function selesai($id)
    {
        $servis = Servis::findOrFail($id);

        $servis->update([
            'tanggalterkirim' => now(),
        ]);

        return redirect()->route('servis.index')
            ->with('success', 'Servis berhasil ditandai selesai.');
    }

    public function destroy($id)
    {
        $pesanan = Pesanan::findOrFail($id);

        // Cek apakah ada servis yang terkait
        $servisTerkait = Servis::where('id_pesanan', $id)->exists();
        
        if ($servisTerkait) {
            return redirect()->route('pesanan.index')
                ->with('error', 'Tidak bisa hapus pesanan ini karena masih ada data servis yang terkait.');
        }

        $pesanan->delete();

        return redirect()->route('pesanan.index')
            ->with('success', 'Pesanan berhasil dihapus!');
    }
}