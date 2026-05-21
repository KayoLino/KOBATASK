<?php

namespace App\Models\Task;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User\User;
use App\Enums\Task\TaskCategory;
use App\Enums\Task\TaskStatus;
use App\Enums\Task\TaskPriority;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'name',
        'category',
        'description',
        'status',
        'start_date',
        'end_date',
        'priority',
        'user_id',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'category' => TaskCategory::class, 
        'status' => TaskStatus::class,     
        'priority' => TaskPriority::class, 
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}