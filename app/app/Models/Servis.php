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
    public $incrementing = false; 
    protected $keyType = 'int';

    protected $fillable = [
        'id_pesanan',
        'nama_barang',
        'bahan',
        'jumlah',
        'tanggalterkirim',
        'tanggalpemesanan',
        'bentuk_barang',
        'catatan',
    ];

    protected $casts = [
        'tanggalterkirim'  => 'datetime',
        'tanggalpemesanan' => 'datetime',
        'jumlah'           => 'integer',
        'bentuk_barang'    => 'integer',
        'id_pesanan'       => 'integer',
    ];

    protected $appends = ['id_servis'];

    public function getIdServisAttribute()
    {
        return $this->id_pesanan;
    }

    protected static function booted()
    {
        static::creating(function ($servis) {
            if (empty($servis->id_pesanan)) {
                $maxId = static::max('id_pesanan') ?? 0;
                $servis->id_pesanan = $maxId + 1;
            }
        });
    }
}