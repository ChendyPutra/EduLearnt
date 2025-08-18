<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    protected $fillable = [
        'course_id', 'title', 'description', 'content', 'order_index',
        'video_url', 'downloadable_materials', 'estimated_duration', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quizzes::class, 'module_id');
    }

    public function progress()
    {
        return $this->hasMany(ModuleProgress::class, 'module_id');
    }

    public function userProgress($userId)
    {
        return $this->hasOne(ModuleProgress::class, 'module_id')->where('user_id', $userId);
    }
}
