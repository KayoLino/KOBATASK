<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Services\Task\TaskServiceInterface;

class StoreTaskController extends Controller
{
    public function __construct(
        protected TaskServiceInterface $service
    ) {}

    public function __invoke(StoreTaskRequest $request): TaskResource
    {
        $task = $this->service->create($request->toDTO());
        return new TaskResource($task);
    }
}