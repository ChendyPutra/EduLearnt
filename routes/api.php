<?php

use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\KitController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\StatistikController;

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
    Route::get('/quizzes', [QuizController::class, 'index']);
    Route::get('/kits', [KitController::class, 'index']);
    Route::get('/stats', [StatistikController::class, 'index']);;
    Route::get('/modules/{id}', [ModuleController::class, 'show']);
    Route::put('/modules/{id}', [ModuleController::class, 'update']);
    Route::get('/kits', [KitController::class, 'index']);
    Route::get('/kits/{id}', [KitController::class, 'show']);
    Route::post('/kits', [KitController::class, 'store']);
    Route::put('/kits/{id}', [KitController::class, 'update']);
    Route::delete('/kits/{id}', [KitController::class, 'destroy']);

});

