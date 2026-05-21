<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
            'image' => $this->profile_image ? Storage::disk('public')->url($this->profile_image) : null,
            'created_at' => $this->created_at->format('d/m/Y H:i'),
        ];
    }
}