<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Admin;
use App\Models\Course;
use App\Models\Product;
use App\Models\Categories;
use App\Models\Modules;
use App\Models\Quizzes;
use App\Models\QuizQuestion;
use App\Models\OfflineProgram;
use App\Models\Banner;
use App\Models\CompanyProfile;
use App\Models\TeamMember;
use App\Models\Feedback;
use App\Models\QuizAttempt;
use App\Models\UserProgress;
use App\Models\ModuleProgress;
use App\Models\Certificate;
use App\Models\Notification;
use Illuminate\Support\Facades\Hash;

class DummyDataSeeder extends Seeder
{
    public function run()
    {
        // 1. Create Admin Users
        $superAdmin = Admin::firstOrCreate(
            ['email' => 'superadmin@edulearnt.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password123'),
                'role' => 'super_admin',
            ]
        );

        $admin = Admin::firstOrCreate(
            ['email' => 'admin@edulearnt.com'],
            [
                'name' => 'Admin EduLearnt',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );

        // 2. Create Student Users
        $students = [];
        $students[] = User::firstOrCreate(
            ['email' => 'john@student.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        $students[] = User::firstOrCreate(
            ['email' => 'jane@student.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        $students[] = User::firstOrCreate(
            ['email' => 'mike@student.com'],
            [
                'name' => 'Mike Johnson',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'email_verified_at' => now(),
            ]
        );

        // 3. Create Categories
        $categories = [
            'Web Development',
            'Mobile Development',
            'Data Science',
            'Digital Marketing',
            'UI/UX Design'
        ];

        foreach ($categories as $categoryName) {
            Categories::firstOrCreate(['name' => $categoryName]);
        }

        // 4. Create Courses
        $courses = [
            [                'title' => 'Complete Web Development Bootcamp',
                'description' => 'Learn HTML, CSS, JavaScript, React, Node.js and more. This comprehensive course covers everything you need to become a full-stack web developer.',
                // 'price' => 299000,
                // 'discount_price' => 199000,
                'duration' => '12 weeks',
                'level' => 'beginner',
                'type' => 'online',
                'image_url' => 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Web+Development',
                'is_featured' => true,
                'status' => 'published',
                'category_id' => 1,
                'instructor' => 'Dr. Sarah Wilson',
                'rating' => 4.8,
                'students_count' => 1250,
            ],
            [
                'title' => 'React Native Mobile Development',
                'description' => 'Build cross-platform mobile apps with React Native. Learn to create beautiful, performant mobile applications for iOS and Android.',
                'price' => 399000,
                'discount_price' => 299000,
                'duration' => '8 weeks',
                'level' => 'intermediate',
                'type' => 'online',
                'image_url' => 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=React+Native',
                'is_featured' => true,
                'status' => 'published',
                'category_id' => 2,
                'instructor' => 'Prof. David Chen',
                'rating' => 4.9,
                'students_count' => 890,
            ],
            [
                'title' => 'Python Data Science Masterclass',
                'description' => 'Data analysis, visualization, and machine learning with Python. Master pandas, numpy, matplotlib, scikit-learn, and more.',
                'price' => 499000,
                'discount_price' => 399000,
                'duration' => '10 weeks',
                'level' => 'intermediate',
                'type' => 'online',
                'image_url' => 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Data+Science',
                'is_featured' => true,
                'status' => 'published',
                'category_id' => 3,
                'instructor' => 'Dr. Lisa Anderson',
                'rating' => 4.7,
                'students_count' => 2100,
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }

        // 5. Create Offline Programs
        $offlinePrograms = [
            [
                'title' => 'Digital Marketing Workshop',
                'description' => 'Hands-on digital marketing workshop with industry experts. Learn practical strategies and network with professionals.',
                'price' => 1500000,
                'location' => 'Jakarta Convention Center',
                'start_date' => '2024-03-15',
                'end_date' => '2024-03-17',
                'max_participants' => 50,
                'image_url' => 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Marketing+Workshop',
                'status' => 'open',
                'current_participants' => 32,
                'instructor' => 'Digital Marketing Expert Team',
            ],
            [
                'title' => 'UI/UX Design Bootcamp',
                'description' => 'Intensive 3-day UI/UX design bootcamp with hands-on projects and portfolio building.',
                'price' => 2500000,
                'location' => 'Bandung Creative Hub',
                'start_date' => '2024-04-10',
                'end_date' => '2024-04-12',
                'max_participants' => 30,
                'image_url' => 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=UI+UX+Bootcamp',
                'status' => 'open',
                'current_participants' => 18,
                'instructor' => 'Senior UI/UX Designers',
            ],
        ];

        foreach ($offlinePrograms as $program) {
            OfflineProgram::create($program);
        }

        // 6. Create Products
        $products = [
            [
                'name' => 'EduLearnt Premium T-Shirt',
                'description' => 'High-quality cotton t-shirt with EduLearnt branding. Comfortable and stylish for everyday wear.',
                'price' => 150000,
                'stock' => 100,
                'image_url' => 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=T-Shirt',
                'category' => 'merchandise',
                'is_featured' => true,
                'sku' => 'EDU-TSHIRT-001',
            ],
            [
                'name' => 'Web Development E-Book Bundle',
                'description' => 'Complete collection of web development e-books covering HTML, CSS, JavaScript, React, and Node.js.',
                'price' => 250000,
                'stock' => 999,
                'image_url' => 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=E-Book+Bundle',
                'category' => 'digital',
                'is_featured' => true,
                'sku' => 'EDU-EBOOK-001',
            ],
            [
                'name' => 'Coding Laptop Sticker Pack',
                'description' => 'Cool stickers for developers and programmers. Perfect for laptops, water bottles, and notebooks.',
                'price' => 50000,
                'stock' => 200,
                'image_url' => 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Sticker+Pack',
                'category' => 'accessories',
                'is_featured' => false,
                'sku' => 'EDU-STICKER-001',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // 7. Create Modules
        $modules = [
            [
                'course_id' => 1,
                'title' => 'HTML & CSS Basics',
                'description' => 'Learn the fundamentals of HTML and CSS, including semantic HTML5 tags and modern CSS3 features.',
                'content' => 'This module covers HTML structure, CSS styling, responsive design, and best practices for web development.',
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'order' => 1,
                'duration' => 120,
                'is_free' => true,
            ],
            [
                'course_id' => 1,
                'title' => 'JavaScript Fundamentals',
                'description' => 'Master JavaScript programming basics including variables, functions, arrays, and objects.',
                'content' => 'Comprehensive JavaScript tutorial covering ES6+ features, DOM manipulation, and event handling.',
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'order' => 2,
                'duration' => 180,
                'is_free' => false,
            ],
        ];

        foreach ($modules as $module) {
            Modules::create($module);
        }

        // 8. Create Quizzes
        $quizzes = [
            [
                'course_id' => 1,
                'title' => 'HTML & CSS Quiz',
                'description' => 'Test your HTML and CSS knowledge with this comprehensive quiz.',
                'time_limit' => 30,
                'passing_score' => 70,
                'total_questions' => 10,
                'status' => 'active',
            ],
            [
                'course_id' => 1,
                'title' => 'JavaScript Basics Quiz',
                'description' => 'JavaScript fundamentals assessment covering variables, functions, and basic concepts.',
                'time_limit' => 45,
                'passing_score' => 75,
                'total_questions' => 15,
                'status' => 'active',
            ],
        ];

        foreach ($quizzes as $quiz) {
            Quizzes::create($quiz);
        }

        // 9. Create Quiz Questions
        $questions = [
            [
                'quiz_id' => 1,
                'question' => 'What does HTML stand for?',
                'type' => 'multiple_choice',
                'options' => json_encode(['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language']),
                'correct_answer' => 'Hyper Text Markup Language',
                'points' => 10,
            ],
            [
                'quiz_id' => 1,
                'question' => 'Which CSS property is used to change the text color?',
                'type' => 'multiple_choice',
                'options' => json_encode(['text-color', 'font-color', 'color']),
                'correct_answer' => 'color',
                'points' => 10,
            ],
        ];

        foreach ($questions as $question) {
            QuizQuestion::create($question);
        }

        // 10. Create Banners
        $banners = [
            [
                'title' => 'Summer Sale 2024',
                'description' => 'Get 50% off on all courses this summer!',
                'image_url' => 'https://via.placeholder.com/1200x400/EF4444/FFFFFF?text=Summer+Sale',
                'link' => '/courses',
                'position' => 'homepage_top',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'New React Native Course',
                'description' => 'Learn mobile app development with our new course',
                'image_url' => 'https://via.placeholder.com/1200x400/10B981/FFFFFF?text=React+Native+Course',
                'link' => '/course/react-native',
                'position' => 'homepage_slider',
                'is_active' => true,
                'order' => 2,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }

        // 11. Create Company Profile
        CompanyProfile::create([
            'name' => 'EduLearnt Academy',
            'description' => 'Leading online education platform in Indonesia providing high-quality courses in technology, business, and creative fields.',
            'email' => 'info@edulearnt.com',
            'phone' => '+62 21 1234 5678',
            'address' => 'Jl. Sudirman No. 123, Jakarta 10220, Indonesia',
            'website' => 'https://edulearnt.com',
            'facebook' => 'https://facebook.com/edulearnt',
            'instagram' => 'https://instagram.com/edulearnt',
            'twitter' => 'https://twitter.com/edulearnt',
            'linkedin' => 'https://linkedin.com/company/edulearnt',
            'logo_url' => 'https://via.placeholder.com/300x100/4F46E5/FFFFFF?text=EduLearnt',
        ]);

        // 12. Create Team Members
        $teamMembers = [
            [
                'name' => 'Dr. Sarah Wilson',
                'position' => 'Lead Instructor - Web Development',
                'bio' => 'PhD in Computer Science with 10+ years of experience in web development and teaching.',
                'image_url' => 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Sarah+W',
                'email' => 'sarah@edulearnt.com',
                'linkedin' => 'https://linkedin.com/in/sarahwilson',
            ],
            [
                'name' => 'Prof. David Chen',
                'position' => 'Senior Instructor - Mobile Development',
                'bio' => 'Former Google engineer with expertise in React Native and mobile app development.',
                'image_url' => 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=David+C',
                'email' => 'david@edulearnt.com',
                'linkedin' => 'https://linkedin.com/in/davidchen',
            ],
        ];

        foreach ($teamMembers as $member) {
            TeamMember::create($member);
        }

        // 13. Create Feedback
        $feedbacks = [
            [
                'name' => 'John Doe',
                'email' => 'john@student.com',
                'message' => 'The web development course is amazing! I learned so much and the instructors are very helpful.',
                'type' => 'course',
                'rating' => 5,
                'status' => 'published',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@student.com',
                'message' => 'Great platform with excellent content. The React Native course helped me build my first mobile app!',
                'type' => 'platform',
                'rating' => 5,
                'status' => 'published',
            ],
        ];

        foreach ($feedbacks as $feedback) {
            Feedback::create($feedback);
        }

        // 14. Create Quiz Attempts
        $quizAttempts = [
            [
                'user_id' => 1,
                'quiz_id' => 1,
                'score' => 85,
                'answers' => json_encode(['1' => 'Hyper Text Markup Language', '2' => 'color']),
                'completed_at' => now(),
                'time_taken' => 25,
            ],
            [
                'user_id' => 2,
                'quiz_id' => 1,
                'score' => 90,
                'answers' => json_encode(['1' => 'Hyper Text Markup Language', '2' => 'color']),
                'completed_at' => now(),
                'time_taken' => 22,
            ],
        ];

        foreach ($quizAttempts as $attempt) {
            QuizAttempt::create($attempt);
        }

        // 15. Create User Progress
        $userProgress = [
            [
                'user_id' => 1,
                'course_id' => 1,
                'completed_modules' => json_encode([1, 2]),
                'current_module' => 3,
                'progress_percentage' => 66.67,
                'status' => 'in_progress',
            ],
            [
                'user_id' => 2,
                'course_id' => 1,
                'completed_modules' => json_encode([1]),
                'current_module' => 2,
                'progress_percentage' => 33.33,
                'status' => 'in_progress',
            ],
        ];

        foreach ($userProgress as $progress) {
            UserProgress::create($progress);
        }

        // 16. Create Module Progress
        $moduleProgress = [
            [
                'user_id' => 1,
                'module_id' => 1,
                'is_completed' => true,
                'completed_at' => now()->subDays(5),
                'time_spent' => 120,
            ],
            [
                'user_id' => 1,
                'module_id' => 2,
                'is_completed' => true,
                'completed_at' => now()->subDays(3),
                'time_spent' => 180,
            ],
        ];

        foreach ($moduleProgress as $progress) {
            ModuleProgress::create($progress);
        }

        // 17. Create Certificates
        $certificates = [
            [
                'user_id' => 1,
                'course_id' => 1,
                'certificate_number' => 'EDU-2024-001',
                'issued_at' => now()->subDays(1),
                'expires_at' => now()->addYear(),
                'is_valid' => true,
            ],
            [
                'user_id' => 2,
                'course_id' => 1,
                'certificate_number' => 'EDU-2024-002',
                'issued_at' => now()->subDays(2),
                'expires_at' => now()->addYear(),
                'is_valid' => true,
            ],
        ];

        foreach ($certificates as $certificate) {
            Certificate::create($certificate);
        }

        // 18. Create Notifications
        $notifications = [
            [
                'user_id' => 1,
                'title' => 'Welcome to EduLearnt!',
                'message' => 'Welcome to our platform! Start your learning journey today.',
                'type' => 'welcome',
                'is_read' => false,
            ],
            [
                'user_id' => 1,
                'title' => 'New Course Available',
                'message' => 'A new React Native course has been added to your enrolled courses.',
                'type' => 'course_update',
                'is_read' => true,
            ],
        ];

        foreach ($notifications as $notification) {
            Notification::create($notification);
        }

        $this->command->info('Complete dummy data has been seeded successfully!');
    }
}
