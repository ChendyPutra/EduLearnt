<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        CompanyProfile::firstOrCreate(
            ['id' => 1],
            [
                'visi' => 'Menjadi platform pembelajaran teknologi terdepan di Indonesia yang mempersiapkan generasi muda menghadapi era digital.',
                'misi' => 'Menyediakan pembelajaran coding, AI, dan robotika yang berkualitas, mudah diakses, dan menyenangkan untuk siswa SD, SMP, dan SMA.'
            ]
        );

        $teamMembers = [
            [
                'n' => 'Dr. Ahmad Rizki',
                'r' => 'CEO & Founder',
                'photo' => 'https://via.placeholder.com/150x150?text=CEO'
            ],
            [
                'n' => 'Sarah Putri',
                'r' => 'CTO',
                'photo' => 'https://via.placeholder.com/150x150?text=CTO'
            ],
            [
                'n' => 'Budi Santoso',
                'r' => 'Head of Education',
                'photo' => 'https://via.placeholder.com/150x150?text=EDU'
            ],
            [
                'n' => 'Lisa Maharani',
                'r' => 'Lead Developer',
                'photo' => 'https://via.placeholder.com/150x150?text=DEV'
            ]
        ];

        foreach ($teamMembers as $member) {
            TeamMember::firstOrCreate(['n' => $member['n']], $member);
        }
    }
}