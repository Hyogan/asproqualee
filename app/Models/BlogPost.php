<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'title', 
        'slug',
        'excerpt', 
        'image', 
        'content',
        'published_at', 
        'read_time', 
        'status',
        'author_id', 
        'category_id'
    ];

    protected $casts = [
        'published_at' => 'date',
    ];

    public function scopePublished($query) { return $query->where('status', 'published'); }

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category() {
        return $this->belongsTo(BlogPostCategory::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}

