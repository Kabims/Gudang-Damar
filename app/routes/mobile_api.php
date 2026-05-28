<?php

use App\Http\Controllers\MobileApi\AuthMobileApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Mobile API Routes (untuk Flutter mobile app)
|--------------------------------------------------------------------------
|
| Semua route di sini otomatis ber-prefix /mobile-api oleh Laravel
| (lihat konfigurasi di bootstrap/app.php).
|
| Web routes (Inertia/Fortify/Socialite) tetap di routes/web.php
| dan TIDAK diganggu sama sekali.
|
*/

// Public — nggak butuh login
Route::post('/register', [AuthMobileApiController::class, 'register']);
Route::post('/login',    [AuthMobileApiController::class, 'login']);

// Protected — wajib kirim header: Authorization: Bearer <token>
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',      [AuthMobileApiController::class, 'me']);
    Route::post('/logout', [AuthMobileApiController::class, 'logout']);

    // Nanti tambah endpoint fitur lain di sini:
    // Route::apiResource('barang',  BarangMobileApiController::class);
    // Route::apiResource('pesanan', PesananMobileApiController::class);
    // Route::apiResource('servis',  ServisMobileApiController::class);
});