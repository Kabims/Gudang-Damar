<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servis extends Model
{
    use HasFactory;

    protected $table = 'servis';
    protected $primaryKey = 'id_pesanan';
    public $timestamps = false;

    protected $fillable = [
        'nama_barang',
        'bahan',
        'jumlah',
        'tanggalterkirim',
        'tanggalpemesanan',
        'bentuk_barang',
    ];

    protected $casts = [
        'tanggalterkirim' => 'datetime',
        'tanggalpemesanan' => 'datetime',
        'jumlah' => 'integer',
        'bentuk_barang' => 'integer',
    ];
}