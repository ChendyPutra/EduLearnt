<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use App\Models\Modules;
use App\Models\Categories;
use App\Models\Quizzes;
use App\Models\QuizQuestion;
use App\Models\Product;
use App\Models\OfflineProgram;
use App\Models\CompanyProfile;
use App\Models\TeamMember;
use App\Models\Banner;

class CompleteDataSeeder extends Seeder
{
    public function run(): void
    {

        // Create Categories
        $categories = [
            ['name' => 'Programming', 'description' => 'Kursus pemrograman dan coding', 'is_active' => true],
            ['name' => 'Artificial Intelligence', 'description' => 'Kursus AI dan Machine Learning', 'is_active' => true],
            ['name' => 'Robotics', 'description' => 'Kursus robotika dan IoT', 'is_active' => true],
        ];

        foreach ($categories as $category) {
            Categories::create($category);
        }

        // Create Courses
        $courses = [
            [
                'title' => 'Python untuk Pemula',
                'description' => 'Belajar dasar-dasar pemrograman Python untuk anak-anak',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD'
            ],
            [
                'title' => 'Scratch Programming',
                'description' => 'Pemrograman visual dengan Scratch untuk anak-anak',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD'
            ],
            [
                'title' => 'Web Development Dasar',
                'description' => 'Belajar HTML, CSS, dan JavaScript untuk remaja',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMP'
            ],
            [
                'title' => 'AI untuk Remaja',
                'description' => 'Pengenalan Artificial Intelligence dan Machine Learning',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMA'
            ],
            [
                'title' => 'Arduino Programming',
                'description' => 'Belajar pemrograman Arduino dan IoT',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMP'
            ]
        ];

        foreach ($courses as $courseData) {
            $course = Course::create($courseData);
            $this->createModulesAndQuizzes($course);
        }

        // Create Products
        $products = [
            [
                'name' => 'Arduino Starter Kit',
                'desc' => 'Kit lengkap untuk belajar Arduino dengan berbagai sensor',
                'price' => 250000,
                'marketplace_url' => 'https://tokopedia.com/edulearnt/arduino-kit'
            ],
            [
                'name' => 'Raspberry Pi Learning Kit',
                'desc' => 'Kit pembelajaran Raspberry Pi untuk project IoT',
                'price' => 850000,
                'marketplace_url' => 'https://shopee.co.id/edulearnt/raspberry-kit'
            ],
            [
                'name' => 'Coding Book for Kids',
                'desc' => 'Buku panduan coding untuk anak-anak dengan ilustrasi menarik',
                'price' => 75000,
                'marketplace_url' => 'https://tokopedia.com/edulearnt/coding-book'
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Create Offline Programs
        $programs = [
            [
                'school' => 'SD Negeri 1 Jakarta',
                'schedule' => 'Senin-Jumat 08:00-12:00',
                'city' => 'Jakarta'
            ],
            [
                'school' => 'SMP Negeri 5 Bandung',
                'schedule' => 'Sabtu 09:00-15:00',
                'city' => 'Bandung'
            ]
        ];

        foreach ($programs as $program) {
            OfflineProgram::create($program);
        }

        // Create Company Profile
        CompanyProfile::create([
            'company_name' => 'EduLearnt',
            'description' => 'Platform pembelajaran teknologi terdepan untuk generasi digital',
            'vision' => 'Menjadi platform pembelajaran teknologi terbaik di Indonesia',
            'mission' => 'Memberikan akses pendidikan teknologi berkualitas untuk semua kalangan',
            'address' => 'Jl. Teknologi No. 123, Jakarta Selatan',
            'phone' => '021-1234-5678',
            'email' => 'info@edulearnt.com',
            'website' => 'https://edulearnt.com'
        ]);

        // Create Team Members
        $team = [
            [
                'name' => 'Dr. Ahmad Teknologi',
                'position' => 'CEO & Founder',
                'bio' => 'Ahli teknologi pendidikan dengan pengalaman 15 tahun',
                'photo_url' => 'https://via.placeholder.com/200x200'
            ],
            [
                'name' => 'Sarah Coding',
                'position' => 'Head of Education',
                'bio' => 'Spesialis kurikulum programming untuk anak-anak',
                'photo_url' => 'https://via.placeholder.com/200x200'
            ]
        ];

        foreach ($team as $member) {
            TeamMember::create($member);
        }

        // Create Banner
        Banner::create([
            'title' => 'Selamat Datang di EduLearnt!',
            'subtitle' => 'Belajar teknologi dengan cara yang menyenangkan',
            'image_url' => 'https://via.placeholder.com/1200x400',
            'link_url' => '/courses-online',
            'is_active' => true,
            'order_index' => 1
        ]);
    }

    private function createModulesAndQuizzes($course)
    {
        $modulesByLevel = [
            'SD' => [
                ['title' => 'Pengenalan Dasar', 'duration' => 20],
                ['title' => 'Praktik Sederhana', 'duration' => 30],
                ['title' => 'Project Mini', 'duration' => 40]
            ],
            'SMP' => [
                ['title' => 'Konsep Fundamental', 'duration' => 35],
                ['title' => 'Implementasi Praktis', 'duration' => 45],
                ['title' => 'Project Menengah', 'duration' => 60]
            ],
            'SMA' => [
                ['title' => 'Teori Lanjutan', 'duration' => 50],
                ['title' => 'Studi Kasus', 'duration' => 60],
                ['title' => 'Project Kompleks', 'duration' => 90]
            ]
        ];

        $modules = $modulesByLevel[$course->level] ?? $modulesByLevel['SD'];

        foreach ($modules as $index => $moduleData) {
            $module = Modules::create([
                'course_id' => $course->id,
                'title' => $moduleData['title'],
                'description' => "Modul pembelajaran {$moduleData['title']} untuk {$course->title}",
                'order_index' => $index + 1,
                'content' => "Konten pembelajaran {$moduleData['title']}. Materi ini dirancang khusus untuk {$course->level} dengan pendekatan yang mudah dipahami.",
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

            // Create Questions for each quiz
            $this->createQuizQuestions($quiz, $course, $module);
        }
    }

    private function createQuizQuestions($quiz, $course, $module)
    {
        $questionsBySubject = [
            'Python' => [
                ['question' => 'Apa ekstensi file Python?', 'options' => ['.py', '.python', '.pt', '.pyt'], 'answer' => '.py'],
                ['question' => 'Python adalah bahasa pemrograman yang?', 'options' => ['Compiled', 'Interpreted', 'Assembly', 'Machine'], 'answer' => 'Interpreted'],
                ['question' => 'Cara mendeklarasikan variabel di Python?', 'options' => ['var x = 5', 'int x = 5', 'x = 5', 'declare x = 5'], 'answer' => 'x = 5']
            ],
            'Scratch' => [
                ['question' => 'Scratch dikembangkan oleh?', 'options' => ['MIT', 'Google', 'Microsoft', 'Apple'], 'answer' => 'MIT'],
                ['question' => 'Scratch menggunakan konsep?', 'options' => ['Text coding', 'Visual blocks', 'Command line', 'Assembly'], 'answer' => 'Visual blocks'],
                ['question' => 'Sprite dalam Scratch adalah?', 'options' => ['Karakter/objek', 'Background', 'Sound', 'Variable'], 'answer' => 'Karakter/objek']
            ],
            'Web' => [
                ['question' => 'HTML adalah singkatan dari?', 'options' => ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language', 'Hypermedia Text Markup Language'], 'answer' => 'HyperText Markup Language'],
                ['question' => 'Tag untuk membuat heading terbesar?', 'options' => ['<h1>', '<h6>', '<header>', '<head>'], 'answer' => '<h1>'],
                ['question' => 'CSS digunakan untuk?', 'options' => ['Styling', 'Programming', 'Database', 'Networking'], 'answer' => 'Styling']
            ],
            'AI' => [
                ['question' => 'AI adalah singkatan dari?', 'options' => ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Applied Intelligence'], 'answer' => 'Artificial Intelligence'],
                ['question' => 'Machine Learning adalah bagian dari?', 'options' => ['AI', 'Database', 'Networking', 'Hardware'], 'answer' => 'AI'],
                ['question' => 'Contoh aplikasi AI?', 'options' => ['Siri/Google Assistant', 'Microsoft Word', 'Calculator', 'Notepad'], 'answer' => 'Siri/Google Assistant']
            ],
            'Arduino' => [
                ['question' => 'Arduino adalah?', 'options' => ['Microcontroller board', 'Programming language', 'Operating system', 'Database'], 'answer' => 'Microcontroller board'],
                ['question' => 'Bahasa pemrograman Arduino mirip dengan?', 'options' => ['C/C++', 'Python', 'Java', 'JavaScript'], 'answer' => 'C/C++'],
                ['question' => 'Pin digital Arduino dapat menghasilkan?', 'options' => ['HIGH/LOW', 'Analog value', 'PWM only', 'Nothing'], 'answer' => 'HIGH/LOW']
            ]
        ];

        // Determine question set based on course title
        $questions = [];
        if (str_contains($course->title, 'Python')) {
            $questions = $questionsBySubject['Python'];
        } elseif (str_contains($course->title, 'Scratch')) {
            $questions = $questionsBySubject['Scratch'];
        } elseif (str_contains($course->title, 'Web')) {
            $questions = $questionsBySubject['Web'];
        } elseif (str_contains($course->title, 'AI')) {
            $questions = $questionsBySubject['AI'];
        } elseif (str_contains($course->title, 'Arduino')) {
            $questions = $questionsBySubject['Arduino'];
        } else {
            // Default questions
            $questions = [
                ['question' => "Apa yang dipelajari di {$module->title}?", 'options' => ['Konsep dasar', 'Praktik langsung', 'Teori mendalam', 'Semua benar'], 'answer' => 'Semua benar'],
                ['question' => "Manfaat mempelajari {$course->title}?", 'options' => ['Meningkatkan logika', 'Memahami teknologi', 'Persiapan masa depan', 'Semua benar'], 'answer' => 'Semua benar']
            ];
        }

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