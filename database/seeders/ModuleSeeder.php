<?php

namespace Database\Seeders;

use App\Models\Modules;
use App\Models\Course;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $courses = Course::all();
        
        foreach ($courses as $course) {
            $modules = [
                [
                    'course_id' => $course->id,
                    'title' => 'Pengenalan ' . $course->title,
                    'content' => 'Modul pengenalan dasar untuk ' . $course->title
                ],
                [
                    'course_id' => $course->id,
                    'title' => 'Praktik Dasar',
                    'content' => 'Latihan praktik dasar untuk memahami konsep'
                ],
                [
                    'course_id' => $course->id,
                    'title' => 'Project Sederhana',
                    'content' => 'Membuat project sederhana untuk mengaplikasikan ilmu'
                ]
            ];

            foreach ($modules as $moduleData) {
                Modules::firstOrCreate(
                    [
                        'course_id' => $moduleData['course_id'],
                        'title' => $moduleData['title']
                    ],
                    $moduleData
                );
            }
        }
    }
}