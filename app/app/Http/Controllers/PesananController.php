<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PesananController extends Controller
{
    // LIST
    public function index()
    {
        return Inertia::render('pesanan/Index', [
            'pesananList' => Pesanan::orderBy('tanggalpemesanan', 'desc')->get(),
        ]);
    }

    // TAMBAH — semua field wajib diisi dari form
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'bahan'       => 'required|string|max:255',
            'jumlah'      => 'required|integer|min:1',
            'catatan'     => 'nullable|string|max:500',
        ]);

        $data['tanggalpemesanan'] = now();
        $data['tanggalterkirim'] = null;
        $data['id_pesanan'] = (Pesanan::max('id_pesanan') ?? 0) + 1;

        Pesanan::create($data);

        return redirect()->route('pesanan.index')
            ->with('success', 'Pesanan berhasil ditambahkan!');
    }

    // FORM EDIT (halaman terpisah)
    public function edit($id)
    {
        $pesanan = Pesanan::findOrFail($id);

        return Inertia::render('pesanan/Edit', [
            'pesanan' => $pesanan,
        ]);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $pesanan = Pesanan::findOrFail($id);

        $data = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'bahan'       => 'required|string|max:255',
            'jumlah'      => 'required|integer|min:1',
            'catatan'     => 'nullable|string|max:500',
        ]);

        if ($request->is_terkirim && !$pesanan->tanggalterkirim) {
            $data['tanggalterkirim'] = now();
        }

        $pesanan->update($data);

        return redirect()->route('pesanan.index')
            ->with('success', 'Pesanan berhasil diperbarui!');
    }

    // HAPUS
    public function destroy($id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $pesanan->delete();

        return redirect()->route('pesanan.index')
            ->with('success', 'Pesanan berhasil dihapus!');
    }

    // TANDAI TERKIRIM
    public function selesai($id)
    {
        $pesanan = Pesanan::findOrFail($id);

        if (! $pesanan->tanggalterkirim) {
            $pesanan->update(['tanggalterkirim' => now()]);
        }

        return redirect()->route('pesanan.index')
            ->with('success', 'Pesanan ditandai terkirim!');
    }
}