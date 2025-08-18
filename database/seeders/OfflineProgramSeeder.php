<?php

namespace Database\Seeders;

use App\Models\OfflineProgram;
use Illuminate\Database\Seeder;

class OfflineProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'school_name' => 'SMAN 1 Jakarta',
                'title' => 'Program Coding Bootcamp',
                'description' => 'Program intensif 3 bulan untuk belajar web development dan mobile app development.',
                'schedule' => 'Senin-Jumat, 14:00-16:00',
                'city' => 'Jakarta',
                'contact_info' => 'admin@sman1jakarta.sch.id'
            ],
            [
                'school_name' => 'SMP Negeri 5 Bandung',
                'title' => 'Robotika untuk Pemula',
                'description' => 'Kelas robotika menggunakan Arduino untuk siswa SMP dengan pendekatan hands-on learning.',
                'schedule' => 'Sabtu, 09:00-12:00',
                'city' => 'Bandung',
                'contact_info' => 'info@smpn5bandung.sch.id'
            ],
            [
                'school_name' => 'SD Cerdas Surabaya',
                'title' => 'Scratch Programming Kids',
                'description' => 'Pengenalan pemrograman untuk anak-anak menggunakan Scratch dengan metode bermain sambil belajar.',
                'schedule' => 'Rabu & Jumat, 13:00-14:30',
                'city' => 'Surabaya',
                'contact_info' => 'humas@sdcerdas.sch.id'
            ]
        ];

        foreach ($programs as $program) {
            OfflineProgram::firstOrCreate(
                ['school_name' => $program['school_name']],
                $program
            );
        }
    }
}