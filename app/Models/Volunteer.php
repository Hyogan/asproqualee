<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'location',
        'skills',
        'commitment',
        'availability',
        'motivation',
        'experience',
        'status',
    ];

    protected $casts = [
        'skills' => 'array',
    ];
}
