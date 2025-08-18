<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    protected $fillable = [
        'user_id',
        'quiz_id',
        'answers',
        'score',
        'total_questions',
        'completed',
        'completed_at'
    ];

    protected $casts = [
        'answers' => 'array',
        'completed' => 'boolean',
        'completed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quizzes::class, 'quiz_id');
    }
}