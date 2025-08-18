<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'message',
        'type',
        'is_read',
        'is_global'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'is_global' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where(function($q) use ($userId) {
            $q->where('user_id', $userId)
              ->orWhere('is_global', true);
        });
    }

    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }
}