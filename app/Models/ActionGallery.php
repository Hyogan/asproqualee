<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActionGallery extends Model
{
    protected $fillable = ['action_id', 'image'];

    public function action(): BelongsTo
    {
        return $this->belongsTo(Action::class);
    }
}
