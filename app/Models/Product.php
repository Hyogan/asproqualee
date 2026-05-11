<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'category', 'price', 'description',
        'image', 'is_eco_friendly', 'tag', 'rating', 'is_active', 'order',
    ];

    protected $casts = [
        'is_eco_friendly' => 'boolean',
        'is_active'       => 'boolean',
        'price'           => 'decimal:2',
    ];
}
