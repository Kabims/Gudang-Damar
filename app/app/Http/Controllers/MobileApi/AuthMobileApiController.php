<?php

namespace App\Http\Controllers\MobileApi;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * Endpoint Mobile API untuk autentikasi (Flutter app).
 *
 * Bedanya dengan auth web (Fortify/Inertia/Socialite):
 *   - Web pakai session cookie + redirect HTML
 *   - Mobile pakai Sanctum personal access token + JSON response
 *
 * Reuse trait validation dari web (PasswordValidationRules &
 * ProfileValidationRules) supaya aturan password/email konsisten.
 */
class AuthMobileApiController extends Controller
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * POST /mobile-api/register
     *
     * Body  : { name, email, password, password_confirmation, device_name? }
     * 201   : { message, user, token }
     * 422   : { message, errors }
     */
    public function register(Request $request): JsonResponse
    {
        $validated = Validator::make($request->all(), [
            ...$this->profileRules(),
            'password'    => $this->passwordRules(),
            'device_name' => 'nullable|string|max:255',
        ])->validate();

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => $validated['password'],
        ]);

        $deviceName = $validated['device_name'] ?? 'mobile';
        $token      = $user->createToken($deviceName)->plainTextToken;

        return response()->json([
            'message' => 'Akun berhasil dibuat',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /**
     * POST /mobile-api/login
     *
     * Body  : { email, password, device_name? }
     * 200   : { message, user, token }
     * 422   : { message, errors }
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email'       => ['required', 'email'],
            'password'    => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau sandi salah.'],
            ]);
        }

        $deviceName = $validated['device_name'] ?? 'mobile';
        $token      = $user->createToken($deviceName)->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * POST /mobile-api/logout
     * Header: Authorization: Bearer <token>
     *
     * Revoke token yang sedang dipakai saja (single-device logout).
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * GET /mobile-api/me
     * Header: Authorization: Bearer <token>
     *
     * Cek token valid + ambil data user yang sedang login.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}