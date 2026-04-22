<?php

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
            'servis' => $servis,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_barang'      => 'required|string|max:255',
            'bahan'            => 'required|string|max:255',
            'jumlah'           => 'required|integer|min:1',
            'tanggalpemesanan' => 'required|date',
            'tanggalterkirim'  => 'nullable|date|after_or_equal:tanggalpemesanan',
            'bentuk_barang'    => 'required|integer',
        ], [
            'nama_barang.required'      => 'Nama barang harus diisi.',
            'bahan.required'            => 'Bahan harus diisi.',
            'jumlah.required'           => 'Jumlah harus diisi.',
            'jumlah.min'                => 'Jumlah minimal 1.',
            'tanggalpemesanan.required' => 'Tanggal pemesanan harus diisi.',
            'tanggalterkirim.after_or_equal' => 'Tanggal terkirim tidak boleh sebelum tanggal pemesanan.',
            'bentuk_barang.required'    => 'Bentuk barang harus diisi.',
        ]);

        Servis::create($validated);

        return redirect()->route('servis.index')
            ->with('success', 'Data servis berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $servis = Servis::findOrFail($id);

        $validated = $request->validate([
            'nama_barang'      => 'required|string|max:255',
            'bahan'            => 'required|string|max:255',
            'jumlah'           => 'required|integer|min:1',
            'tanggalpemesanan' => 'required|date',
            'tanggalterkirim'  => 'nullable|date|after_or_equal:tanggalpemesanan',
            'bentuk_barang'    => 'required|integer',
        ]);

        $servis->update($validated);

        return redirect()->route('servis.index')
            ->with('success', 'Data servis berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $servis = Servis::findOrFail($id);
        $servis->delete();

        return redirect()->route('servis.index')
            ->with('success', 'Data servis berhasil dihapus.');
    }
}