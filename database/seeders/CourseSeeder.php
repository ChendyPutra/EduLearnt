<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
    'title' => 'Dasar Coding SD',
    'type' => 'online',
    'description' => 'Belajar coding dasar untuk anak SD dengan visual.',
]);

Course::create([
    'title' => 'Robotika SMP',
    'type' => 'offline',
    'description' => 'Kelas robotika langsung di sekolah mitra SMP.',
]);
    }
}
