<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quizzes;
use App\Models\QuizQuestion;
use App\Models\QuizAttempt;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quizzes::with(['module', 'questions'])->get();
        return response()->json($quizzes);
    }

    public function getCourseQuizzes($courseId)
    {
        try {
            $quizzes = Quizzes::with(['module'])
                              ->whereHas('module', function($query) use ($courseId) {
                                  $query->where('course_id', $courseId);
                              })
                              ->where('is_active', true)
                              ->get();
            
            return response()->json($quizzes);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function show($id)
    {
        $quiz = Quizzes::with(['questions', 'module'])->findOrFail($id);
        return response()->json($quiz);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'module_id' => 'required|exists:modules,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit' => 'nullable|integer|min:1',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.correct_answer' => 'required|string',
            'questions.*.points' => 'nullable|integer|min:1'
        ]);

        $quiz = Quizzes::create([
            'module_id' => $validated['module_id'],
            'title' => htmlspecialchars($validated['title'], ENT_QUOTES, 'UTF-8'),
            'description' => htmlspecialchars($validated['description'] ?? '', ENT_QUOTES, 'UTF-8'),
            'time_limit' => $validated['time_limit'],
            'is_active' => true
        ]);

        foreach ($validated['questions'] as $questionData) {
            QuizQuestion::create([
                'quiz_id' => $quiz->id,
                'question' => htmlspecialchars($questionData['question'], ENT_QUOTES, 'UTF-8'),
                'options' => $questionData['options'],
                'correct_answer' => $questionData['correct_answer'],
                'points' => $questionData['points'] ?? 10
            ]);
        }

        return response()->json($quiz->load('questions'), 201);
    }

    public function update(Request $request, $id)
    {
        $quiz = Quizzes::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $quiz->update([
            'title' => htmlspecialchars($validated['title'], ENT_QUOTES, 'UTF-8'),
            'description' => htmlspecialchars($validated['description'] ?? '', ENT_QUOTES, 'UTF-8'),
            'time_limit' => $validated['time_limit'],
            'is_active' => $validated['is_active'] ?? true
        ]);

        return response()->json($quiz);
    }

    public function destroy($id)
    {
        $quiz = Quizzes::findOrFail($id);
        $quiz->delete();
        return response()->json(['message' => 'Quiz deleted successfully']);
    }

    // Student endpoints
    public function takeQuiz(Request $request, $id)
    {
        $quiz = Quizzes::with(['questions', 'module'])->findOrFail($id);
        $user = $request->user();

        // Allow retaking quiz - no restriction

        // Return quiz without correct answers
        $quizData = $quiz->toArray();
        foreach ($quizData['questions'] as &$question) {
            unset($question['correct_answer']);
        }

        return response()->json($quizData);
    }

    public function submitQuiz(Request $request, $id)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'required|string'
        ]);

        $quiz = Quizzes::with('questions')->findOrFail($id);
        $user = $request->user();

        // Calculate score
        $score = 0;
        $totalQuestions = $quiz->questions->count();
        
        foreach ($quiz->questions as $question) {
            $userAnswer = $validated['answers'][$question->id] ?? '';
            if ($userAnswer === $question->correct_answer) {
                $score += $question->points;
            }
        }

        // Save attempt
        $attempt = QuizAttempt::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz->id,
            'answers' => $validated['answers'],
            'score' => $score,
            'total_questions' => $totalQuestions,
            'completed' => true,
            'completed_at' => now()
        ]);

        // Update module progress when quiz is completed (SRS compliance)
        if ($quiz->module_id) {
            \App\Models\ModuleProgress::updateOrCreate(
                ['user_id' => $user->id, 'module_id' => $quiz->module_id],
                [
                    'completed' => true,
                    'started_at' => \App\Models\ModuleProgress::where('user_id', $user->id)
                                                             ->where('module_id', $quiz->module_id)
                                                             ->value('started_at') ?? now(),
                    'completed_at' => now()
                ]
            );
            
            // Update course progress based on modules
            $module = \App\Models\Modules::find($quiz->module_id);
            if ($module) {
                $this->updateCourseProgressFromModules($user->id, $module->course_id);
            }
        }

        return response()->json([
            'score' => $score,
            'total_questions' => $totalQuestions,
            'percentage' => $totalQuestions > 0 ? round(($score / ($totalQuestions * 10)) * 100, 2) : 0,
            'attempt' => $attempt
        ]);
    }

    public function getUserAttempts(Request $request)
    {
        $user = $request->user();
        $attempts = QuizAttempt::with(['quiz.module'])
                              ->where('user_id', $user->id)
                              ->orderBy('created_at', 'desc')
                              ->get();

        return response()->json($attempts);
    }
    
    private function updateCourseProgressFromModules($userId, $courseId)
    {
        $course = \App\Models\Course::findOrFail($courseId);
        $percentage = $course->getCompletionPercentage($userId);
        
        $progress = \App\Models\UserProgress::where('user_id', $userId)
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
        $certificateNumber = \App\Models\Certificate::generateCertificateNumber($userId, $courseId);
        
        \App\Models\Certificate::create([
            'user_id' => $userId,
            'course_id' => $courseId,
            'certificate_number' => $certificateNumber,
            'issued_at' => now()
        ]);
    }
}