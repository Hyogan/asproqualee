<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Action extends Model
{
    protected $fillable = [
        'title', 'category_id', 'description', 'long_description', 
        'image', 'date', 'location', 'participants', 
        'impact_label', 'impact_value', 'status'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function gallery(): HasMany
    {
        return $this->hasMany(ActionGallery::class);
    }

    // Scope for filtering by status
    public function scopeStatus($query, $status)
    {
        if ($status && $status !== 'all') {
            return $query->where('status', $status);
        }
        return $query;
    }

    // Scope for filtering by category
    public function scopeCategory($query, $categoryId)
    {
        if ($categoryId && $categoryId !== 'all') {
            return $query->where('category_id', $categoryId);
        }
        return $query;
    }
}
