<?php

namespace App\Services\Task;

use App\Repositories\Task\TaskRepositoryInterface;
use App\DTOs\Task\TaskDTO;
use App\Enums\Task\TaskStatus;
use App\Models\Task\Task;
use App\Exceptions\BusinessValidationException;
use Illuminate\Database\Eloquent\Collection;

class TaskService implements TaskServiceInterface
{
    public function __construct(protected TaskRepositoryInterface $repository) {}

    public function getUserTasks(int $userId): Collection
    {
        return $this->repository->findByUser($userId);
    }

    public function create(TaskDTO $dto): Task
    {
        $pendingCount = $this->repository->findByUser($dto->userId)->where('status', TaskStatus::PENDING)->count();
        if ($pendingCount >= 10) throw new BusinessValidationException('Limite de 10 tarefas atingido.');
        return $this->repository->create($dto->toArray());
    }

    public function update(Task $task, TaskDTO $dto): Task
    {
        $this->authorize($task);
        if ($task->status === TaskStatus::COMPLETED) throw new BusinessValidationException('Tarefa concluída não pode ser editada.');
        return $this->repository->update($task->id, $dto->toArray());
    }

    public function getTask(int $taskId): Task
    {
        $task = $this->repository->find($taskId);
        abort_if(!$task, 404, 'Tarefa não encontrada.');
        $this->authorize($task);
        return $task;
    }

    public function markAsComplete(Task $task): bool
    {
        $this->authorize($task);
        if ($task->status === TaskStatus::COMPLETED) throw new BusinessValidationException('Já concluída.');
        return (bool) $this->repository->update($task->id, ['status' => TaskStatus::COMPLETED]);
    }

    public function markAsIncomplete(Task $task): bool
    {
        $this->authorize($task);
        return (bool) $this->repository->update($task->id, ['status' => TaskStatus::IN_PROGRESS]);
    }

    public function delete(Task $task): bool
    {
        $this->authorize($task);
        if ($task->status === TaskStatus::COMPLETED) throw new BusinessValidationException('Tarefas concluídas não podem ser excluídas.');
        return $this->repository->delete($task->id);
    }

    private function authorize(Task $task): void
    {
        abort_if($task->user_id !== auth()->id(), 403, 'Acesso negado.');
    }
}