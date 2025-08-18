<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use App\Models\Modules;
use App\Models\Quizzes;
use App\Models\QuizQuestion;

class SimpleDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        User::create([
            'name' => 'Admin EduLearnt',
            'email' => 'admin@edulearnt.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        // Create Test Student
        User::create([
            'name' => 'Siswa Test',
            'email' => 'student@test.com',
            'password' => bcrypt('password'),
            'role' => 'student'
        ]);

        // Create Courses with Modules and Quizzes
        $courses = [
            [
                'title' => 'Python untuk Pemula',
                'description' => 'Belajar dasar-dasar pemrograman Python untuk anak-anak',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD',
                'modules' => [
                    ['title' => 'Pengenalan Python', 'duration' => 30],
                    ['title' => 'Variabel dan Tipe Data', 'duration' => 25],
                    ['title' => 'Control Flow', 'duration' => 35]
                ]
            ],
            [
                'title' => 'Scratch Programming',
                'description' => 'Pemrograman visual dengan Scratch untuk anak-anak',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD',
                'modules' => [
                    ['title' => 'Pengenalan Scratch', 'duration' => 20],
                    ['title' => 'Membuat Animasi', 'duration' => 30],
                    ['title' => 'Game Sederhana', 'duration' => 40]
                ]
            ],
            [
                'title' => 'Web Development Dasar',
                'description' => 'Belajar HTML, CSS, dan JavaScript untuk remaja',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMP',
                'modules' => [
                    ['title' => 'HTML Dasar', 'duration' => 45],
                    ['title' => 'CSS Styling', 'duration' => 50],
                    ['title' => 'JavaScript Intro', 'duration' => 60]
                ]
            ]
        ];

        foreach ($courses as $courseData) {
            $modules = $courseData['modules'];
            unset($courseData['modules']);
            
            $course = Course::create($courseData);
            
            foreach ($modules as $index => $moduleData) {
                $module = Modules::create([
                    'course_id' => $course->id,
                    'title' => $moduleData['title'],
                    'description' => "Modul pembelajaran {$moduleData['title']}",
                    'order_index' => $index + 1,
                    'content' => "Konten pembelajaran untuk {$moduleData['title']}",
                    'estimated_duration' => $moduleData['duration'],
                    'is_active' => true
                ]);

                // Create Quiz for each module
                $quiz = Quizzes::create([
                    'module_id' => $module->id,
                    'title' => "Quiz: {$module->title}",
                    'description' => "Uji pemahaman Anda tentang {$module->title}",
                    'time_limit' => 15,
                    'passing_score' => 70,
                    'is_active' => true
                ]);

                // Create sample questions
                $questions = $this->getQuestionsForModule($course->title, $module->title);
                foreach ($questions as $questionData) {
                    QuizQuestion::create([
                        'quiz_id' => $quiz->id,
                        'question' => $questionData['question'],
                        'options' => json_encode($questionData['options']),
                        'correct_answer' => $questionData['answer'],
                        'points' => 10
                    ]);
                }
            }
        }
    }

    private function getQuestionsForModule($courseTitle, $moduleTitle)
    {
        if (str_contains($courseTitle, 'Python')) {
            return [
                ['question' => 'Apa ekstensi file Python?', 'options' => ['.py', '.python', '.pt', '.pyt'], 'answer' => '.py'],
                ['question' => 'Python adalah bahasa pemrograman yang?', 'options' => ['Compiled', 'Interpreted', 'Assembly', 'Machine'], 'answer' => 'Interpreted'],
                ['question' => 'Cara mendeklarasikan variabel di Python?', 'options' => ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'], 'answer' => 'x = 5']
            ];
        } elseif (str_contains($courseTitle, 'Scratch')) {
            return [
                ['question' => 'Scratch dikembangkan oleh?', 'options' => ['MIT', 'Google', 'Microsoft', 'Apple'], 'answer' => 'MIT'],
                ['question' => 'Scratch menggunakan konsep?', 'options' => ['Text coding', 'Visual blocks', 'Command line', 'Assembly'], 'answer' => 'Visual blocks'],
                ['question' => 'Sprite dalam Scratch adalah?', 'options' => ['Karakter/objek', 'Background', 'Sound', 'Variable'], 'answer' => 'Karakter/objek']
            ];
        } elseif (str_contains($courseTitle, 'Web')) {
            return [
                ['question' => 'HTML adalah singkatan dari?', 'options' => ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language', 'Hypermedia Text Markup Language'], 'answer' => 'HyperText Markup Language'],
                ['question' => 'Tag untuk membuat heading terbesar?', 'options' => ['<h1>', '<h6>', '<header>', '<head>'], 'answer' => '<h1>'],
                ['question' => 'CSS digunakan untuk?', 'options' => ['Styling', 'Programming', 'Database', 'Networking'], 'answer' => 'Styling']
            ];
        }

        return [
            ['question' => "Apa yang dipelajari di {$moduleTitle}?", 'options' => ['Konsep dasar', 'Praktik langsung', 'Teori mendalam', 'Semua benar'], 'answer' => 'Semua benar'],
            ['question' => "Manfaat mempelajari {$courseTitle}?", 'options' => ['Meningkatkan logika', 'Memahami teknologi', 'Persiapan masa depan', 'Semua benar'], 'answer' => 'Semua benar']
        ];
    }
}