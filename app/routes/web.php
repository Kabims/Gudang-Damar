<?php

use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use App\Services\DatabaseService;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\BarangController;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'Dashboard')->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

Route::get('/test', function () {
    $databaseService = new DatabaseService();
    $data = $databaseService->testConnection();
    return response()->json($data);
});


Route::resource('barang', BarangController::class);

Route::get('/auth/google/redirect', [SocialiteController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [SocialiteController::class, 'callback'])->name('auth.google.callback');


require __DIR__.'/settings.php';
