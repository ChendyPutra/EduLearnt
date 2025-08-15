<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentAuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OfflineProgramController;
use App\Http\Controllers\Api\FeedbackController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| 
| Struktur:
| - Auth student & admin terpisah
| - Role middleware untuk batasi akses
| - Prefix "admin" untuk panel admin
|
*/

// ===== AUTH (Public) =====
Route::post('/register', [StudentAuthController::class, 'register']);
Route::post('/login-student', [StudentAuthController::class, 'login']);
Route::post('/login-admin', [AdminAuthController::class, 'login']);

// ===== PUBLIC CONTENT =====
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/offline-programs', [OfflineProgramController::class, 'index']);
Route::post('/feedback', [FeedbackController::class, 'store']);

// ===== STUDENT AREA =====
Route::middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::post('/logout', [StudentAuthController::class, 'logout']);
    Route::get('/me', [StudentAuthController::class, 'me']);
});

// ===== ADMIN AREA =====
Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin,super_admin'])->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/me', [AdminAuthController::class, 'me']);

    // khusus super_admin
    Route::middleware('role:super_admin')->group(function () {
        Route::get('/users', [AdminAuthController::class, 'getUsers']);
    });

    // CRUD umum untuk admin & super_admin
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/offline-programs', [OfflineProgramController::class, 'store']);
    Route::post('/courses', [CourseController::class, 'store']);
});
