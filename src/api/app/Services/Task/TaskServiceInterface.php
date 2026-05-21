<?php

namespace App\Services\Task;

use App\DTOs\Task\TaskDTO;
use App\Models\Task\Task;
use Illuminate\Database\Eloquent\Collection;

interface TaskServiceInterface
{
    public function create(TaskDTO $dto): Task;
    public function update(Task $task, TaskDTO $dto): Task;
    public function delete(Task $task): bool;
    public function getTask(int $taskId): Task;
    public function markAsComplete(Task $task): bool;
    public function markAsIncomplete(Task $task): bool;
    public function getUserTasks(int $userId): Collection;
}