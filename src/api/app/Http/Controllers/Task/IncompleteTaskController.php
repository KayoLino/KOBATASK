<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task\Task; 
use App\Services\Task\TaskServiceInterface;
use Illuminate\Http\JsonResponse;

class IncompleteTaskController extends Controller
{
    public function __construct(protected TaskServiceInterface $service) {}

    public function __invoke(Task $task): JsonResponse
    {
        $this->service->markAsIncomplete($task);
        return response()->json(['message' => 'Tarefa marcada como incompleta.']);
    }
}