<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'student1@test.com'],
            [
                'name' => 'Test Student',
                'password' => Hash::make('password'),
                'role' => 'student'
            ]
        );

        User::firstOrCreate(
            ['email' => 'john@student.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => 'student'
            ]
        );

        User::firstOrCreate(
            ['email' => 'jane@student.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password'),
                'role' => 'student'
            ]
        );

        User::firstOrCreate(
            ['email' => 'teacher@test.com'],
            [
                'name' => 'Teacher Demo',
                'password' => Hash::make('password'),
                'role' => 'teacher'
            ]
        );

        User::firstOrCreate(
            ['email' => 'parent@test.com'],
            [
                'name' => 'Parent Demo',
                'password' => Hash::make('password'),
                'role' => 'parent'
            ]
        );
    }
}