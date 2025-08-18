<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserProgress;
use App\Models\ModuleProgress;
use App\Models\Course;
use App\Models\Modules;
use App\Models\Certificate;

class ProgressController extends Controller
{
    public function enroll(Request $request, $courseId)
    {
        $user = $request->user();
        
        // Check if already enrolled
        $existing = UserProgress::where('user_id', $user->id)
                               ->where('course_id', $courseId)
                               ->first();
        
        if ($existing) {
            return response()->json(['message' => 'Already enrolled in this course']);
        }
        
        // Create enrollment
        UserProgress::create([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'progress_percentage' => 0,
            'completed' => false
        ]);
        
        return response()->json(['message' => 'Successfully enrolled in course']);
    }
    
    public function updateProgress(Request $request, $courseId)
    {
        $validated = $request->validate([
            'progress_percentage' => 'required|integer|min:0|max:100'
        ]);
        
        $user = $request->user();
        
        $progress = UserProgress::where('user_id', $user->id)
                                ->where('course_id', $courseId)
                                ->firstOrFail();
        
        $wasCompleted = $progress->completed;
        
        $progress->update([
            'progress_percentage' => $validated['progress_percentage'],
            'completed' => $validated['progress_percentage'] >= 100,
            'completed_at' => $validated['progress_percentage'] >= 100 ? now() : null
        ]);
        
        // Generate certificate if course just completed
        if (!$wasCompleted && $progress->completed) {
            $this->generateCertificate($user->id, $courseId);
        }
        
        return response()->json($progress);
    }
    
    public function updateModuleProgress(Request $request, $moduleId)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean',
            'time_spent' => 'integer|min:0'
        ]);
        
        $user = $request->user();
        
        $moduleProgress = ModuleProgress::updateOrCreate(
            ['user_id' => $user->id, 'module_id' => $moduleId],
            [
                'completed' => $validated['completed'],
                'time_spent' => ($validated['time_spent'] ?? 0),
                'started_at' => ModuleProgress::where('user_id', $user->id)
                                             ->where('module_id', $moduleId)
                                             ->value('started_at') ?? now(),
                'completed_at' => $validated['completed'] ? now() : null
            ]
        );
        
        // Update course progress
        $module = Modules::findOrFail($moduleId);
        $this->updateCourseProgressFromModules($user->id, $module->course_id);
        
        return response()->json($moduleProgress);
    }
    
    private function updateCourseProgressFromModules($userId, $courseId)
    {
        $course = Course::findOrFail($courseId);
        $percentage = $course->getCompletionPercentage($userId);
        
        $progress = UserProgress::where('user_id', $userId)
                                ->where('course_id', $courseId)
                                ->first();
        
        if ($progress) {
            $wasCompleted = $progress->completed;
            
            $progress->update([
                'progress_percentage' => $percentage,
                'completed' => $percentage >= 100,
                'completed_at' => $percentage >= 100 ? now() : null
            ]);
            
            // Generate certificate if course just completed
            if (!$wasCompleted && $progress->completed) {
                $this->generateCertificate($userId, $courseId);
            }
        }
    }
    
    private function generateCertificate($userId, $courseId)
    {
        $certificateNumber = Certificate::generateCertificateNumber($userId, $courseId);
        
        Certificate::create([
            'user_id' => $userId,
            'course_id' => $courseId,
            'certificate_number' => $certificateNumber,
            'issued_at' => now()
        ]);
    }
    
    public function getUserProgress(Request $request)
    {
        $user = $request->user();
        
        $progress = UserProgress::with('course')
                                ->where('user_id', $user->id)
                                ->get();
        
        return response()->json($progress);
    }
    
    public function getCourseProgress(Request $request, $courseId)
    {
        $user = $request->user();
        
        $progress = UserProgress::with('course')
                                ->where('user_id', $user->id)
                                ->where('course_id', $courseId)
                                ->first();
        
        if (!$progress) {
            return response()->json(['message' => 'Not enrolled in this course'], 404);
        }
        
        return response()->json($progress);
    }
    
    public function getUserCertificates(Request $request)
    {
        $user = $request->user();
        
        $certificates = Certificate::with('course')
                                  ->where('user_id', $user->id)
                                  ->orderBy('issued_at', 'desc')
                                  ->get();
        
        return response()->json($certificates);
    }
    
    public function downloadCertificate(Request $request, $id)
    {
        $user = $request->user();
        
        $certificate = Certificate::with(['course', 'user'])
                                 ->where('id', $id)
                                 ->where('user_id', $user->id)
                                 ->firstOrFail();
        
        // Generate certificate URL or return certificate data
        return response()->json([
            'certificate' => $certificate,
            'download_url' => url("/certificates/{$certificate->certificate_number}.pdf")
        ]);
    }
}