<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleProgress extends Model
{
    protected $table = 'module_progress';
    
    protected $fillable = [
        'user_id',
        'module_id',
        'completed',
        'time_spent',
        'started_at',
        'completed_at'
    ];

    protected $casts = [
        'completed' => 'boolean',
        'started_at' => 'datetime',
        'completed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function module()
    {
        return $this->belongsTo(Modules::class, 'module_id');
    }
}