<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'amount',
        'frequency',
        'first_name',
        'last_name',
        'email',
        'phone',
        'anonymous',
        'newsletter',
        'status',
    ];

    protected $casts = [
        'anonymous'  => 'boolean',
        'newsletter' => 'boolean',
        'amount'     => 'integer',
    ];
}
