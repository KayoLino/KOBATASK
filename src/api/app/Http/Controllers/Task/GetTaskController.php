<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Services\Task\TaskServiceInterface;
use App\Models\Task\Task;

class getTaskController extends Controller
{
    public function __construct( protected TaskServiceInterface $service){}

    public function __invoke($taskId): TaskResource
    {
        $id = (int) $taskId;
        $task = $this->service->getTask($id);
        return new TaskResource($task);
    }
}
