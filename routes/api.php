<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login-student', [AuthController::class, 'loginStudent']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // protected admin routes example
    Route::middleware('role:admin,super_admin')->group(function () {
        Route::get('/admin-only', function () {
            return response()->json(['ok' => true]);
        });
    });
});
