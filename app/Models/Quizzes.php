<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quizzes extends Model
{
    protected $fillable = [
        'module_id',
        'title',
        'description',
        'time_limit',
        'passing_score',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function module()
    {
        return $this->belongsTo(Modules::class, 'module_id');
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class, 'quiz_id');
    }

    public function attempts()
    {
        return $this->hasMany(QuizAttempt::class, 'quiz_id');
    }
}