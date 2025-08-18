<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Arduino Starter Kit',
                'desc' => 'Kit lengkap untuk memulai belajar robotika dengan Arduino. Termasuk board, sensor, dan komponen elektronik.',
                'price' => 350000,
                'marketplace_url' => 'https://shopee.co.id/arduino-kit',
                'image_url' => null
            ],
            [
                'name' => 'Python Programming Book',
                'desc' => 'Buku panduan lengkap belajar Python untuk pemula hingga mahir dengan contoh project nyata.',
                'price' => 125000,
                'marketplace_url' => 'https://tokopedia.com/python-book',
                'image_url' => null
            ],
            [
                'name' => 'Raspberry Pi 4 Kit',
                'desc' => 'Mini computer untuk project IoT dan AI. Cocok untuk siswa SMA yang ingin belajar teknologi terdepan.',
                'price' => 850000,
                'marketplace_url' => 'https://shopee.co.id/raspberry-pi',
                'image_url' => null
            ],
            [
                'name' => 'Web Development Toolkit',
                'desc' => 'Paket lengkap untuk belajar web development termasuk hosting gratis dan domain untuk 1 tahun.',
                'price' => 200000,
                'marketplace_url' => 'https://tokopedia.com/web-toolkit',
                'image_url' => null
            ],
            [
                'name' => 'AI Learning Kit',
                'desc' => 'Kit pembelajaran AI dengan dataset, tutorial, dan akses ke platform cloud computing.',
                'price' => 450000,
                'marketplace_url' => 'https://shopee.co.id/ai-kit',
                'image_url' => null
            ]
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']],
                $product
            );
        }
    }
}