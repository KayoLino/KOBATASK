<?php

namespace App\Repositories\Task;

use App\Models\Task\Task;
use Illuminate\Database\Eloquent\Collection;

class EloquentTaskRepository implements TaskRepositoryInterface
{
    public function create(array $data): Task
    {
        return Task::create([
            'name' => $data['name'],
            'category' => $data['category'],
            'description' => $data['description'],
            'status' => $data['status'] ?? 'Pending',
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'priority' => $data['priority'] ?? 'Medium',
            'user_id' => $data['user_id'],
        ]);
    }

    public function update(int $id, array $data): Task
    {
        $task = Task::findOrFail($id);

        $updateData = array_filter([
            'name'        => $data['name'] ?? null,
            'category'    => $data['category'] ?? null,
            'description' => $data['description'] ?? null,
            'status'      => $data['status'] ?? null,
            'start_date'  => $data['start_date'] ?? null,
            'end_date'    => $data['end_date'] ?? null,
            'priority'    => $data['priority'] ?? null,
        ], fn($value) => $value !== null);

        $task->update($updateData);

        return $task;
    }

    public function delete(int $id): bool
    {
        $task = Task::findOrFail($id);
        return $task->delete();
    }

    public function find(int $id): ?Task
    {
        return Task::find($id);
    }

    public function findByUser(int $userId): Collection
    {
        return Task::where('user_id', $userId)->get();
    }
}