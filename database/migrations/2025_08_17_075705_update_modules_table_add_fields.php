<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->text('description')->nullable()->after('title');
            $table->integer('order_index')->default(1)->after('description');
            $table->string('video_url')->nullable()->after('content');
            $table->text('downloadable_materials')->nullable()->after('video_url');
            $table->integer('estimated_duration')->default(0)->after('downloadable_materials'); // minutes
            $table->boolean('is_active')->default(true)->after('estimated_duration');
        });
    }

    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropColumn([
                'description', 'order_index', 'video_url', 
                'downloadable_materials', 'estimated_duration', 'is_active'
            ]);
        });
    }
};