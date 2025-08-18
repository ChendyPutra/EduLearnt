<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['title','description','youtube_id','level'];

    public function modules()
    {
        return $this->hasMany(Modules::class, 'course_id')->orderBy('order_index');
    }

    public function userProgress()
    {
        return $this->hasMany(UserProgress::class, 'course_id');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'course_id');
    }

    public function quizzes()
    {
        return $this->hasManyThrough(Quizzes::class, Modules::class, 'course_id', 'module_id');
    }

    // Calculate course completion percentage for a user (SRS: based on modules)
    public function getCompletionPercentage($userId)
    {
        $totalModules = $this->modules()->count();
        if ($totalModules === 0) return 0;
        
        $completedModules = \App\Models\ModuleProgress::where('user_id', $userId)
            ->whereIn('module_id', $this->modules()->pluck('id'))
            ->where('completed', true)
            ->count();
            
        return round(($completedModules / $totalModules) * 100);
    }
}
