<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('feedback', function (Blueprint $table) {
            // Drop the existing enum column
            $table->dropColumn('type');
        });
        
        Schema::table('feedback', function (Blueprint $table) {
            // Add the new enum with support option
            $table->enum('type', ['contact', 'partnership', 'support'])->default('contact')->after('message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('feedback', function (Blueprint $table) {
            $table->dropColumn('type');
        });
        
        Schema::table('feedback', function (Blueprint $table) {
            $table->enum('type', ['contact', 'partnership'])->default('contact')->after('message');
        });
    }
};
