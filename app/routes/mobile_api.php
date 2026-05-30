<?php

use App\Http\Controllers\MobileApi\AuthMobileApiController;
use App\Http\Controllers\MobileApi\AktivitasMobileApiController;
use App\Http\Controllers\MobileApi\BarangMobileApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Mobile API Routes (untuk Flutter mobile app)
|--------------------------------------------------------------------------
*/

// Public — nggak butuh login
Route::post('/register',     [AuthMobileApiController::class, 'register']);
Route::post('/login',        [AuthMobileApiController::class, 'login']);
Route::post('/auth/google',  [AuthMobileApiController::class, 'googleLogin']);

// Protected — wajib membawa token Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me',      [AuthMobileApiController::class, 'me']);
    Route::post('/logout', [AuthMobileApiController::class, 'logout']);
    
    // Fitur Barang
    Route::get('/barang',            [BarangMobileApiController::class, 'index']);
    Route::post('/barang',           [BarangMobileApiController::class, 'store']);
    Route::get('/barang/{id}',       [BarangMobileApiController::class, 'show']);
    Route::put('/barang/{id}',       [BarangMobileApiController::class, 'update']);
    Route::delete('/barang/{id}',    [BarangMobileApiController::class, 'destroy']);

    // Fitur Riwayat Aktivitas
    Route::get('/riwayat', [AktivitasMobileApiController::class, 'index']);
    Route::get('/riwayat/export', [AktivitasMobileApiController::class, 'export']);
});