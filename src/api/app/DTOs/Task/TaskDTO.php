<?php

namespace App\DTOs\Task;

use App\Enums\Task\{TaskCategory, TaskStatus, TaskPriority};

readonly class TaskDTO
{
    public function __construct(
        public string $name,
        public TaskCategory $category,
        public string $description,
        public TaskStatus $status,
        public string $startDate,
        public string $endDate,
        public TaskPriority $priority,
        public int $userId
    ) {}

    public function toArray(): array
    {
        return [
            'name'        => $this->name,
            'category'    => $this->category->value,
            'description' => $this->description,
            'status'      => $this->status->value,
            'start_date'  => $this->startDate,
            'end_date'    => $this->endDate,
            'priority'    => $this->priority->value,
            'user_id'     => $this->userId,
        ];
    }
}