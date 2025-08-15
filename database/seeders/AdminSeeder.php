<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'name' => 'chendy',
            'email' => 'chendy@gmail.com',
            'password' => Hash::make('apaaja11'),
            'role' => 'super_admin'
        ]);
    }
}

