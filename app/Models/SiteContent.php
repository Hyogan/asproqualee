<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Get a content value by key, decoded from JSON if possible.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $row = static::where('key', $key)->first();
        if (! $row) return $default;

        $decoded = json_decode($row->value, true);
        return $decoded ?? $row->value;
    }

    /**
     * Set (upsert) a content value by key. Arrays/objects are JSON-encoded.
     */
    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => is_array($value) || is_object($value)
                ? json_encode($value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
                : (string) $value,
            ]
        );
    }
}
