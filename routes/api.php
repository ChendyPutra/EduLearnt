<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\KitController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StatistikController;
use App\Http\Middleware\CheckAdminRole;

/*
|--------------------------------------------------------------------------
| Public Routes (User / Siswa)
|--------------------------------------------------------------------------
*/

// Token CSRF untuk React (wajib untuk login via Sanctum)
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

// User Auth
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);
Route::post('/register', [UserAuthController::class, 'register']);



/*
|--------------------------------------------------------------------------
| Admin Auth (SPA)
|--------------------------------------------------------------------------
*/

Route::post('/admin/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::guard('admin')->attempt($credentials)) {
        $request->session()->regenerate();
        return response()->json([
            'message' => 'Login berhasil',
            'role' => Auth::guard('admin')->user()->role
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

// Info admin yang sedang login (dipakai frontend)
Route::middleware(['auth:admin'])->get('/admin/me', function (Request $request) {
    return response()->json($request->user('admin'));
});


/*
|--------------------------------------------------------------------------
| Rute Admin (admin dan superadmin)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:admin'])->group(function () {
    // Info me
    Route::get('/me', function (Request $request) {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'role' => $request->user()->role,
        ]);
    });

    // Course
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    // Module
    Route::get('/modules/{id}', [ModuleController::class, 'show']);
    Route::post('/modules', [ModuleController::class, 'store']);
    Route::put('/modules/{id}', [ModuleController::class, 'update']);
    Route::delete('/modules/{id}', [ModuleController::class, 'destroy']);

    // Quiz
    Route::get('/quizzes', [QuizController::class, 'index']);

    // Kit
    Route::get('/kits', [KitController::class, 'index']);
    Route::get('/kits/{id}', [KitController::class, 'show']);
    Route::post('/kits', [KitController::class, 'store']);
    Route::put('/kits/{id}', [KitController::class, 'update']);
    Route::delete('/kits/{id}', [KitController::class, 'destroy']);

    // Statistik
    Route::get('/stats', [StatistikController::class, 'index']);
});


/*
|--------------------------------------------------------------------------
| Rute Superadmin Only
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:admin', CheckAdminRole::class . ':superadmin'])->group(function () {
    Route::get('/admin/manage-admin', [AdminAuthController::class, 'index']);
    Route::post('/admin/manage-admin', [AdminAuthController::class, 'store']);
    Route::put('/admin/manage-admin/{id}', [AdminAuthController::class, 'update']);
    Route::delete('/admin/manage-admin/{id}', [AdminAuthController::class, 'destroy']);
});
