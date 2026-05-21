<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Services\Task\TaskServiceInterface;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ListTasksController extends Controller
{
    public function __construct(
        protected TaskServiceInterface $service
    ) {}

    public function __invoke(): AnonymousResourceCollection
    {
        $tasks = $this->service->getUserTasks(auth()->id());
        return TaskResource::collection($tasks);
    }
}