<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = [
        'quiz_id',
        'question',
        'options',
        'correct_answer',
        'points'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function quiz()
    {
        return $this->belongsTo(Quizzes::class, 'quiz_id');
    }
}