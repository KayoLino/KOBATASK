<?php

namespace App\Repositories\Task;

use App\Models\Task\Task;
use Illuminate\Database\Eloquent\Collection;

interface TaskRepositoryInterface
{
    public function create(array $data): Task;
    public function update(int $id, array $data): Task;
    public function delete(int $id): bool;
    public function find(int $id): ?Task;
    public function findByUser(int $userId): Collection;
}