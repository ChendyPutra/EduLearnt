<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
   protected $fillable = [
    'name',
    'email',
    'password',
    'role',
];

    
    protected $hidden = [
        'password','remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin()
{
    return in_array($this->role, ['admin','super_admin']);
}

public function isSuperAdmin()
{
    return $this->role === 'super_admin';
}

public function progress()
{
    return $this->hasMany(UserProgress::class);
}

public function enrolledCourses()
{
    return $this->belongsToMany(Course::class, 'user_progress')
                ->withPivot('progress_percentage', 'completed', 'completed_at')
                ->withTimestamps();
}
}
