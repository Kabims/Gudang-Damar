<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index()
    {
        return Inertia::render('barang/Index', [
            'barangList' => Barang::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('barang/Create');
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request, true);
        Barang::create($this->mapData($data, Barang::max('id_barang') + 1));

        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan!');
    }

    public function show(string $id)
    {
        return Inertia::render('barang/Detail', ['barang' => Barang::findOrFail($id)]);
    }

    public function edit(string $id)
    {
        return Inertia::render('barang/Edit', ['barang' => Barang::findOrFail($id)]);
    }

    public function update(Request $request, string $id)
{
    $barang = Barang::findOrFail($id);

    $barang->update([
        'nama'       => $request->nama,
        'harga'      => $request->input('harga.harga'),
        'jumlah'     => $request->input('harga.jumlah'),
        'total'      => $request->input('harga.harga') * $request->input('harga.jumlah'),
        'ukuran'     => $request->input('kategori.ukuran'),
        'bentuk'     => $request->input('kategori.bentuk'),
        'ketebalan'  => $request->input('kategori.ketebalan'),
        'bahan'      => $request->input('kategori.bahan'),
        'guna_merek' => $request->input('kategori.merek'),
    ]);

    return redirect()->route('barang.index')
                     ->with('success', 'Barang berhasil diupdate!');
}

    public function destroy(string $id)
    {
        Barang::findOrFail($id)->delete();
        return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus!');
    }

    private function validateData(Request $request, bool $isStore): array
    {
        $rules = [
            'nama'               => 'required|string',
            'harga.harga'        => 'required|integer|min:0',
            'kategori.ukuran'    => 'required|integer',
            'kategori.ketebalan' => 'required|string',
            'kategori.bahan'     => 'required|string',
        ];

        if ($isStore) {
            $rules += [
                'harga.jumlah'    => 'required|integer|min:1',
                'kategori.bentuk' => 'required|string',
                'kategori.merek'  => 'required|string',
            ];
        }

        return $request->validate($rules);
    }

    private function mapData(array $data, int $id): array
    {
        $harga = $data['harga']['harga'];
        $jumlah = $data['harga']['jumlah'];

        return [
            'id_barang'  => $id,
            'nama'       => $data['nama'],
            'harga'      => $harga,
            'jumlah'     => $jumlah,
            'total'      => $harga * $jumlah,
            'ukuran'     => $data['kategori']['ukuran'],
            'bentuk'     => $data['kategori']['bentuk'],
            'ketebalan'  => $data['kategori']['ketebalan'],
            'bahan'      => $data['kategori']['bahan'],
            'guna_merek' => $data['kategori']['merek'],
        ];
    }
}