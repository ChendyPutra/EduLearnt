<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Python untuk Pemula',
                'description' => 'Belajar dasar-dasar pemrograman Python dengan cara yang menyenangkan dan interaktif.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD'
            ],
            [
                'title' => 'Web Development dengan HTML & CSS',
                'description' => 'Membuat website pertama Anda dengan HTML dan CSS dari nol hingga mahir.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMP'
            ],
            [
                'title' => 'JavaScript Interaktif',
                'description' => 'Pelajari JavaScript untuk membuat website yang interaktif dan dinamis.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMP'
            ],
            [
                'title' => 'Machine Learning dengan Python',
                'description' => 'Pengenalan AI dan Machine Learning menggunakan Python untuk siswa SMA.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMA'
            ],
            [
                'title' => 'Robotika Arduino',
                'description' => 'Belajar membuat robot sederhana menggunakan Arduino dan sensor.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SMA'
            ],
            [
                'title' => 'Scratch Programming',
                'description' => 'Pemrograman visual yang menyenangkan untuk anak-anak dengan Scratch.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'level' => 'SD'
            ]
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate(
                ['title' => $course['title']],
                $course
            );
        }
    }
}