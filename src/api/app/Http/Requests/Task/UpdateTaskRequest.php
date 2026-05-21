<?php

namespace App\Http\Requests\Task;

use App\DTOs\Task\TaskDTO;
use App\Enums\Task\{TaskCategory, TaskStatus, TaskPriority};
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['nullable', 'string', 'max:100'],
            'category'    => ['nullable', new Enum(TaskCategory::class)],
            'description' => ['nullable', 'string', 'max:200'],
            'status'      => ['nullable', new Enum(TaskStatus::class)],
            'start_date'  => ['nullable', 'date'],
            'end_date'    => ['nullable', 'date', 'after_or_equal:start_date'], 
            'priority'    => ['nullable', new Enum(TaskPriority::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal'   => 'A data de término não pode ser anterior à data de início.',
            'category.Illuminate\Validation\Rules\Enum' => 'A categoria selecionada é inválida.',
            'status.Illuminate\Validation\Rules\Enum'   => 'O status selecionado é inválido.',
            'priority.Illuminate\Validation\Rules\Enum' => 'A prioridade selecionada é inválida.',
            'name.max'                  => 'O nome da tarefa deve ter no máximo 100 caracteres.',
        ];
    }

    public function toDTO(): TaskDTO
    {
        return new TaskDTO(
            name:        $this->validated('name') ?? $this->task->name, 
            category:    $this->has('category') ? TaskCategory::from($this->validated('category')) : $this->task->category,
            description: $this->validated('description') ?? $this->task->description,
            status:      $this->has('status') ? TaskStatus::from($this->validated('status')) : $this->task->status,
            startDate:   $this->validated('start_date') ?? $this->task->start_date,
            endDate:     $this->validated('end_date') ?? $this->task->end_date,
            priority:    $this->has('priority') ? TaskPriority::from($this->validated('priority')) : $this->task->priority,
            userId:      auth()->id()
        );
    }
}