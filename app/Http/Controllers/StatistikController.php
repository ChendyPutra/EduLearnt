<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class StatistikController extends Controller
{
    public function index(): JsonResponse
    {
        $siswa = User::where('role', 'student')->count(); // asumsi ada kolom role
        $sekolah = 12; // dummy jika belum ada tabel sekolah
        $course = Course::count();
        $quiz = Quiz::count();

        return response()->json([
            'siswa' => $siswa,
            'sekolah' => $sekolah,
            'course' => $course,
            'quiz' => $quiz,
        ]);
    }
}

