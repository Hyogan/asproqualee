<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'category', 'status', 'description',
        'image', 'location', 'progress', 'impact_goal', 'impact_value',
        'is_active', 'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
