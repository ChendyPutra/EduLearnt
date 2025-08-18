<?php

namespace Database\Seeders;

use App\Models\Quizzes;
use App\Models\QuizQuestion;
use App\Models\Modules;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $modules = Modules::all();
        
        foreach ($modules as $module) {
            $quiz = Quizzes::firstOrCreate(
                ['module_id' => $module->id],
                [
                    'title' => 'Quiz: ' . $module->title,
                    'description' => 'Test your knowledge on ' . $module->title,
                    'time_limit' => 15,
                    'is_active' => true
                ]
            );

            // Sample questions
            $questions = [
                [
                    'question' => 'What is the main concept of ' . $module->title . '?',
                    'options' => ['Basic understanding', 'Advanced concept', 'Practical application', 'All of the above'],
                    'correct_answer' => 'All of the above',
                    'points' => 10
                ],
                [
                    'question' => 'Which approach is best for learning ' . $module->title . '?',
                    'options' => ['Theory only', 'Practice only', 'Theory and practice', 'None'],
                    'correct_answer' => 'Theory and practice',
                    'points' => 10
                ],
                [
                    'question' => 'What is the expected outcome after completing ' . $module->title . '?',
                    'options' => ['Basic knowledge', 'Practical skills', 'Problem solving', 'All skills combined'],
                    'correct_answer' => 'All skills combined',
                    'points' => 10
                ]
            ];

            foreach ($questions as $questionData) {
                QuizQuestion::firstOrCreate(
                    [
                        'quiz_id' => $quiz->id,
                        'question' => $questionData['question']
                    ],
                    $questionData
                );
            }
        }
    }
}