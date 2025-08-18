<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\OfflineProgram;
use App\Models\UserProgress;

class StatsController extends Controller
{
    public function index()
    {
        $students = User::where('role', 'student')->count();
        $schools = OfflineProgram::distinct('school_name')->count('school_name');
        $courses = Course::count();
        $completedCourses = UserProgress::where('completed', true)->count();
        $rating = 4.8; // Static rating for now
        
        // Add some dummy data if counts are zero
        $students = $students > 0 ? $students : 150;
        $schools = $schools > 0 ? $schools : 25;
        $content_hours = $courses * 8; // Assume 8 hours per course
        
        return response()->json([
            'students' => $students,
            'schools' => $schools,
            'content_hours' => $content_hours,
            'rating' => $rating,
            'courses' => $courses,
            'completed_courses' => $completedCourses
        ]);
    }
    
    // Admin stats with more detailed information
    public function adminStats()
    {
        $totalUsers = User::count();
        $students = User::where('role', 'student')->count();
        $admins = User::where('role', 'admin')->count();
        $courses = Course::count();
        $enrollments = UserProgress::count();
        $completions = UserProgress::where('completed', true)->count();
        
        return response()->json([
            'total_users' => $totalUsers,
            'students' => $students,
            'admins' => $admins,
            'courses' => $courses,
            'enrollments' => $enrollments,
            'completions' => $completions,
            'completion_rate' => $enrollments > 0 ? round(($completions / $enrollments) * 100, 2) : 0
        ]);
    }
}