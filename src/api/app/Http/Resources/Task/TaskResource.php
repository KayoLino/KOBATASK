<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'category'    => $this->category,
            'description' => $this->description,
            'status'      => $this->status,
            'priority'    => $this->priority,
            'start_date' => $this->start_date->format('Y-m-d H:i:s'), 
            'end_date'   => $this->end_date->format('Y-m-d H:i:s'),
            'created_at'  => $this->created_at->format('d/m/Y H:i'),
        ];
    }
}