<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    protected $table = 'user_progress';
    
    protected $fillable = [
        'user_id',
        'course_id', 
        'progress_percentage',
        'completed',
        'completed_at'
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}