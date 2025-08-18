<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'certificate_number',
        'certificate_url',
        'issued_at'
    ];

    protected $casts = [
        'issued_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public static function generateCertificateNumber($userId, $courseId)
    {
        return 'CERT-' . date('Y') . '-' . str_pad($userId, 4, '0', STR_PAD_LEFT) . '-' . str_pad($courseId, 3, '0', STR_PAD_LEFT);
    }
}