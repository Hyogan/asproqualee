<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Program extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'icon', 'color',
        'stats_label', 'stats_value', 'pillars', 'order', 'is_active',
    ];

    protected $casts = [
        'pillars'   => 'array',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Program $program) {
            if (empty($program->slug)) {
                $base = Str::slug($program->title);
                $slug = $base;
                $i = 1;
                while (static::where('slug', $slug)->exists()) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }
                $program->slug = $slug;
            }
        });
    }
}
