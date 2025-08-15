<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfflineProgram extends Model
{
     protected $fillable = ['school','schedule','city'];
    protected $table = 'offline_programs';
}
