<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task\Task;
use App\Services\Task\TaskServiceInterface;
use Illuminate\Http\Response;

class DeleteTaskController extends Controller
{
    public function __construct(protected TaskServiceInterface $service) {}
    public function __invoke(Task $task): Response 
    {
        $this->service->delete($task);
        return response()->noContent();
    }
}