<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Middleware\CheckAdminRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// ----------------------------
// CSRF COOKIE UNTUK SANCTUM
// ----------------------------
Route::middleware('web')->get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
// ----------------------------
// ROUTE LOGIN SISWA (SPA)
// ----------------------------
Route::middleware('web')->group(function () {
    Route::post('/login', [UserAuthController::class, 'login']);
    Route::post('/logout', [UserAuthController::class, 'logout']);
    Route::post('/register', [UserAuthController::class, 'register']);
});

// ----------------------------
// ROUTE LOGIN ADMIN (SPA)
// ----------------------------
Route::middleware('web')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');

    Route::post('/admin/login', function (Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();

            $admin = Auth::guard('admin')->user();

            return response()->json([
                'message' => 'Login berhasil',
                'role' => $admin->role,
            ]);
        }

        return response()->json(['message' => 'Email atau password salah'], 401);
    });

    Route::post('/admin/logout', function (Request $request) {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout berhasil']);
    });
});

// ----------------------------
// ROUTE SUPERADMIN SAJA
// ----------------------------
Route::middleware(['web', 'auth:admin', CheckAdminRole::class . ':superadmin'])->group(function () {
    Route::get('/admin/manage-admin', [AdminAuthController::class, 'index']);
});
