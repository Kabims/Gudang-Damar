<?php

use App\Http\Controllers\MobileApi\AuthMobileApiController;
use App\Http\Controllers\MobileApi\AktivitasMobileApiController; // 1. UBAH IMPORT KE CONTROLLER BARU
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
    
    // 2. DI SINI KITA ARAHKAN KE CONTROLLER MOBILE BARU
    Route::get('/riwayat', [AktivitasMobileApiController::class, 'index']);
});