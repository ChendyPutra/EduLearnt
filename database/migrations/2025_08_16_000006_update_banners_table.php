<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->enum('type', ['info', 'announcement', 'promotion'])->default('info')->after('content');
            $table->boolean('is_active')->default(true)->after('type');
            $table->datetime('start_date')->nullable()->after('is_active');
            $table->datetime('end_date')->nullable()->after('start_date');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['type', 'is_active', 'start_date', 'end_date']);
        });
    }
};