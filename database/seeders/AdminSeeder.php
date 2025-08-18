<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create super admin
        Admin::firstOrCreate(
            ['email' => 'superadmin@edulearnt.com'],
            [
                'name' => 'chendy',
                'password' => Hash::make('super123'),
                'role' => 'super_admin'
            ]
        );
        
        // Create regular admin
        Admin::firstOrCreate(
            ['email' => 'admin@edulearnt.com'],
            [
                'name' => 'Admin EduLearnt',
                'password' => Hash::make('password'),
                'role' => 'admin'
            ]
        );
    }
}
