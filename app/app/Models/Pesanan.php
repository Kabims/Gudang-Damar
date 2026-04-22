<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table      = 'pesanan';
    protected $primaryKey = 'id_pesanan';
    public $incrementing  = false;   // manual increment
    protected $keyType    = 'int';
    public $timestamps    = false;

    protected $fillable = [
        'id_pesanan',
        'id_barang',
        'id_user',
        'nama_barang',
        'bahan',
        'catatan',
        'jumlah',
        'tanggalpemesanan',
        'tanggalterkirim',
    ];

    protected $casts = [
        'tanggalpemesanan' => 'datetime',
        'tanggalterkirim'  => 'datetime',
    ];

    public function barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang', 'id_barang');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function servis()
    {
        return $this->hasOne(Servis::class, 'id_pesanan', 'id_pesanan');
    }
}