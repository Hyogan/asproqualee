<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'icon' => $this->category->icon,
            ],
            'description' => $this->description,
            'longDescription' => $this->long_description,
            'image' => $this->image,
            'date' => $this->date->format('d F Y'),
            'location' => $this->location,
            'participants' => $this->participants,
            'impact' => [
                'label' => $this->impact_label,
                'value' => $this->impact_value,
            ],
            'gallery' => $this->gallery->pluck('image'),
            'status' => $this->status,
        ];
    }
}
