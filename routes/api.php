<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentAuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OfflineProgramController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\SuperAdminController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\TeamController;

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
Route::get('/company-profile', [CompanyController::class, 'profile']);
Route::get('/team', [CompanyController::class, 'team']);
Route::get('/stats', [StatsController::class, 'index']);
Route::get('/banners/active', [BannerController::class, 'getActiveBanners']);
Route::get('/courses/{courseId}/quizzes', [QuizController::class, 'getCourseQuizzes']);
Route::get('/courses/{courseId}/modules', [ModuleController::class, 'getCourseModules']);

// ===== STUDENT AREA =====
Route::middleware(['auth:sanctum', 'role:student,teacher,parent'])->group(function () {
    Route::post('/logout', [StudentAuthController::class, 'logout']);
    Route::get('/me', [StudentAuthController::class, 'me']);
    
    // Progress tracking
    Route::post('/courses/{courseId}/enroll', [ProgressController::class, 'enroll']);
    Route::put('/courses/{courseId}/progress', [ProgressController::class, 'updateProgress']);
    Route::put('/modules/{moduleId}/progress', [ProgressController::class, 'updateModuleProgress']);
    Route::get('/my-progress', [ProgressController::class, 'getUserProgress']);
    Route::get('/courses/{courseId}/my-progress', [ProgressController::class, 'getCourseProgress']);
    Route::get('/my-certificates', [ProgressController::class, 'getUserCertificates']);
    Route::get('/certificates/{id}/download', [ProgressController::class, 'downloadCertificate']);
    
    // Quiz taking
    Route::get('/quizzes', [QuizController::class, 'index']);
    Route::get('/quizzes/{id}/take', [QuizController::class, 'takeQuiz']);
    Route::post('/quizzes/{id}/submit', [QuizController::class, 'submitQuiz']);
    Route::get('/my-quiz-attempts', [QuizController::class, 'getUserAttempts']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'getUserNotifications']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'getUnreadCount']);
});

// ===== ADMIN AREA =====
Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin,super_admin'])->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/me', [AdminAuthController::class, 'me']);

    // CRUD resources
    Route::apiResource('users', StudentAuthController::class);
    Route::apiResource('products', ProductController::class)->except(['index']);
    Route::apiResource('offline-programs', OfflineProgramController::class)->except(['index']);
    Route::apiResource('courses', CourseController::class)->except(['index', 'show']);
    Route::apiResource('modules', ModuleController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('quizzes', QuizController::class);
    Route::apiResource('banners', BannerController::class);
    Route::apiResource('notifications', NotificationController::class)->except(['show', 'update']);
    Route::apiResource('team', TeamController::class);
    
    // Company management
    Route::put('/company-profile', [CompanyController::class, 'updateProfile']);
    
    // Feedback management
    Route::get('/feedback', [FeedbackController::class, 'index']);
    Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']);
    
    // Admin statistics
    Route::get('/admin-stats', [StatsController::class, 'adminStats']);
    
    // Super admin only
    Route::middleware('role:super_admin')->group(function () {
        Route::apiResource('admins', AdminUserController::class);
    });
});