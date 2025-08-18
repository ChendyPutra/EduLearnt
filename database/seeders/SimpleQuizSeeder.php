<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Modules;
use App\Models\Quizzes;
use App\Models\QuizQuestion;

class SimpleQuizSeeder extends Seeder
{
    public function run(): void
    {
        // Get all existing modules
        $modules = Modules::with('course')->get();

        foreach ($modules as $module) {
            // Create quiz for each module
            $quiz = Quizzes::create([
                'title' => "Quiz: {$module->title}",
                'description' => "Test your knowledge on {$module->title}",
                'module_id' => $module->id,
                'time_limit' => 15,
                'passing_score' => 70,
                'is_active' => true
            ]);

            // Create questions based on course level and module
            $this->createQuestionsForModule($quiz, $module);
        }
    }

    private function createQuestionsForModule($quiz, $module)
    {
        $questions = $this->getQuestionsForModule($module);
        
        foreach ($questions as $questionData) {
            QuizQuestion::create([
                'quiz_id' => $quiz->id,
                'question' => $questionData['question'],
                'options' => json_encode($questionData['options']),
                'correct_answer' => $questionData['correct_answer'],
                'points' => 10
            ]);
        }
    }

    private function getQuestionsForModule($module)
    {
        $courseTitle = $module->course->title;
        $moduleTitle = $module->title;
        $level = $module->course->level;

        // Questions based on course and module
        if (str_contains($courseTitle, 'Python')) {
            return [
                [
                    'question' => 'Apa ekstensi file Python?',
                    'options' => ['.py', '.python', '.pt', '.pyt'],
                    'correct_answer' => '.py'
                ],
                [
                    'question' => 'Python adalah bahasa pemrograman yang?',
                    'options' => ['Compiled', 'Interpreted', 'Assembly', 'Machine'],
                    'correct_answer' => 'Interpreted'
                ],
                [
                    'question' => 'Cara mendeklarasikan variabel di Python?',
                    'options' => ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
                    'correct_answer' => 'x = 5'
                ]
            ];
        } elseif (str_contains($courseTitle, 'Scratch')) {
            return [
                [
                    'question' => 'Scratch dikembangkan oleh?',
                    'options' => ['MIT', 'Google', 'Microsoft', 'Apple'],
                    'correct_answer' => 'MIT'
                ],
                [
                    'question' => 'Scratch menggunakan konsep?',
                    'options' => ['Text coding', 'Visual blocks', 'Command line', 'Assembly'],
                    'correct_answer' => 'Visual blocks'
                ]
            ];
        } elseif (str_contains($courseTitle, 'Web Development')) {
            return [
                [
                    'question' => 'HTML adalah singkatan dari?',
                    'options' => ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language', 'Hypermedia Text Markup Language'],
                    'correct_answer' => 'HyperText Markup Language'
                ],
                [
                    'question' => 'Tag untuk membuat heading terbesar?',
                    'options' => ['<h1>', '<h6>', '<header>', '<head>'],
                    'correct_answer' => '<h1>'
                ]
            ];
        } elseif (str_contains($courseTitle, 'AI')) {
            return [
                [
                    'question' => 'AI adalah singkatan dari?',
                    'options' => ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Applied Intelligence'],
                    'correct_answer' => 'Artificial Intelligence'
                ],
                [
                    'question' => 'Contoh aplikasi AI dalam kehidupan sehari-hari?',
                    'options' => ['Siri/Google Assistant', 'Microsoft Word', 'Calculator', 'Notepad'],
                    'correct_answer' => 'Siri/Google Assistant'
                ]
            ];
        } elseif (str_contains($courseTitle, 'Arduino')) {
            return [
                [
                    'question' => 'Arduino adalah?',
                    'options' => ['Microcontroller board', 'Programming language', 'Operating system', 'Database'],
                    'correct_answer' => 'Microcontroller board'
                ],
                [
                    'question' => 'Bahasa pemrograman Arduino mirip dengan?',
                    'options' => ['C/C++', 'Python', 'Java', 'JavaScript'],
                    'correct_answer' => 'C/C++'
                ]
            ];
        }

        // Default questions
        return [
            [
                'question' => "Apa yang Anda pelajari dari modul {$moduleTitle}?",
                'options' => ['Konsep dasar', 'Praktik langsung', 'Teori mendalam', 'Semua benar'],
                'correct_answer' => 'Semua benar'
            ],
            [
                'question' => "Tingkat kesulitan materi {$moduleTitle} untuk {$level}?",
                'options' => ['Sangat mudah', 'Mudah', 'Sedang', 'Sulit'],
                'correct_answer' => 'Sedang'
            ]
        ];
    }
}