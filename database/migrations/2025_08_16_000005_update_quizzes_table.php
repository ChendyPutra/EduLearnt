<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropColumn(['question', 'answer']);
            $table->string('title')->after('module_id');
            $table->text('description')->nullable()->after('title');
            $table->integer('time_limit')->nullable()->after('description'); // in minutes
            $table->boolean('is_active')->default(true)->after('time_limit');
        });
    }

    public function down(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'time_limit', 'is_active']);
            $table->string('question')->after('module_id');
            $table->string('answer')->after('question');
        });
    }
};