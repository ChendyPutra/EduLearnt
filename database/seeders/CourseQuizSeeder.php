<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Modules;
use App\Models\Quizzes;
use App\Models\QuizQuestion;

class CourseQuizSeeder extends Seeder
{
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            // Create modules for each course first
            $this->createModulesForCourse($course);
            
            // Create quizzes for each course
            $this->createQuizzesForCourse($course);
        }
    }

    private function createModulesForCourse($course)
    {
        $moduleData = $this->getModuleData($course->id);
        
        foreach ($moduleData as $data) {
            Modules::create($data);
        }
    }

    private function createQuizzesForCourse($course)
    {
        $modules = Modules::where('course_id', $course->id)->get();
        
        foreach ($modules as $module) {
            $quiz = Quizzes::create([
                'title' => "Quiz: {$module->title}",
                'description' => "Test your knowledge on {$module->title}",
                'module_id' => $module->id,
                'time_limit' => 15, // 15 minutes
                'passing_score' => 70,
                'is_active' => true
            ]);

            $this->createQuestionsForQuiz($quiz, $course->level);
        }
    }

    private function getModuleData($courseId)
    {
        $modulesByCourse = [
            1 => [ // Python untuk Pemula
                ['title' => 'Pengenalan Python', 'description' => 'Dasar-dasar bahasa Python', 'order_index' => 1, 'estimated_duration' => 30],
                ['title' => 'Variabel dan Tipe Data', 'description' => 'Memahami variabel dan tipe data', 'order_index' => 2, 'estimated_duration' => 25],
                ['title' => 'Control Flow', 'description' => 'If, else, dan loop', 'order_index' => 3, 'estimated_duration' => 35],
            ],
            2 => [ // Scratch Programming
                ['title' => 'Pengenalan Scratch', 'description' => 'Interface dan dasar Scratch', 'order_index' => 1, 'estimated_duration' => 20],
                ['title' => 'Membuat Animasi', 'description' => 'Animasi sederhana dengan Scratch', 'order_index' => 2, 'estimated_duration' => 30],
                ['title' => 'Game Sederhana', 'description' => 'Membuat game dengan Scratch', 'order_index' => 3, 'estimated_duration' => 40],
            ],
            3 => [ // Web Development Dasar
                ['title' => 'HTML Dasar', 'description' => 'Struktur dasar HTML', 'order_index' => 1, 'estimated_duration' => 45],
                ['title' => 'CSS Styling', 'description' => 'Mendesain dengan CSS', 'order_index' => 2, 'estimated_duration' => 50],
                ['title' => 'JavaScript Intro', 'description' => 'Dasar-dasar JavaScript', 'order_index' => 3, 'estimated_duration' => 60],
            ],
            4 => [ // AI untuk Remaja
                ['title' => 'Konsep AI', 'description' => 'Pengenalan Artificial Intelligence', 'order_index' => 1, 'estimated_duration' => 40],
                ['title' => 'Machine Learning', 'description' => 'Dasar Machine Learning', 'order_index' => 2, 'estimated_duration' => 55],
                ['title' => 'AI Tools', 'description' => 'Menggunakan tools AI', 'order_index' => 3, 'estimated_duration' => 45],
            ],
            5 => [ // Arduino Programming
                ['title' => 'Pengenalan Arduino', 'description' => 'Hardware dan software Arduino', 'order_index' => 1, 'estimated_duration' => 35],
                ['title' => 'Sensor dan Aktuator', 'description' => 'Menggunakan sensor dan aktuator', 'order_index' => 2, 'estimated_duration' => 45],
                ['title' => 'Project IoT', 'description' => 'Membuat project IoT sederhana', 'order_index' => 3, 'estimated_duration' => 60],
            ]
        ];

        $modules = $modulesByCourse[$courseId] ?? [];
        
        return array_map(function($module) use ($courseId) {
            return array_merge($module, [
                'course_id' => $courseId,
                'content' => "Konten pembelajaran untuk {$module['title']}. Materi ini akan membahas topik secara mendalam dengan contoh praktis.",
                'is_active' => true
            ]);
        }, $modules);
    }

    private function createQuestionsForQuiz($quiz, $level)
    {
        $questions = $this->getQuestionsData($quiz->title, $level);
        
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

    private function getQuestionsData($quizTitle, $level)
    {
        $questionsByQuiz = [
            'Quiz: Pengenalan Python' => [
                [
                    'question' => 'Apa ekstensi file Python?',
                    'options' => ['.py', '.python', '.pt', '.pyt'],
                    'correct_answer' => '.py'
                ],
                [
                    'question' => 'Siapa yang menciptakan Python?',
                    'options' => ['Guido van Rossum', 'James Gosling', 'Brendan Eich', 'Dennis Ritchie'],
                    'correct_answer' => 'Guido van Rossum'
                ],
                [
                    'question' => 'Python adalah bahasa pemrograman yang?',
                    'options' => ['Compiled', 'Interpreted', 'Assembly', 'Machine'],
                    'correct_answer' => 'Interpreted'
                ]
            ],
            'Quiz: Variabel dan Tipe Data' => [
                [
                    'question' => 'Cara mendeklarasikan variabel di Python?',
                    'options' => ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'],
                    'correct_answer' => 'x = 5'
                ],
                [
                    'question' => 'Tipe data untuk teks di Python?',
                    'options' => ['string', 'str', 'text', 'char'],
                    'correct_answer' => 'str'
                ]
            ],
            'Quiz: Pengenalan Scratch' => [
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
            ],
            'Quiz: HTML Dasar' => [
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
            ],
            'Quiz: Konsep AI' => [
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
            ],
            'Quiz: Pengenalan Arduino' => [
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
            ]
        ];

        // Return questions for the specific quiz, or default questions
        return $questionsByQuiz[$quizTitle] ?? [
            [
                'question' => 'Pertanyaan default untuk ' . $quizTitle,
                'options' => ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
                'correct_answer' => 'Opsi A'
            ]
        ];
    }
}