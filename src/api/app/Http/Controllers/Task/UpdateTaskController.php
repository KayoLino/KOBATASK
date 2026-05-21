<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Services\Task\TaskServiceInterface;
use App\Models\Task\Task;

class UpdateTaskController extends Controller
{
    public function __construct(
        protected TaskServiceInterface $service
    ) {}

    public function __invoke(UpdateTaskRequest $request, Task $task): TaskResource
    {   
        $updatedTask = $this->service->update($task, $request->toDTO());
        return new TaskResource($updatedTask);
    }
}