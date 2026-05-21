<?php

namespace App\Http\Requests\Task;

use App\DTOs\Task\TaskDTO;
use App\Enums\Task\TaskCategory;
use App\Enums\Task\TaskPriority;
use App\Enums\Task\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:100'],
            'category'    => ['required', new Enum(TaskCategory::class)],
            'description' => ['nullable', 'string', 'max:255'],
            'status'      => ['required', new Enum(TaskStatus::class)],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date', 'after_or_equal:start_date'], // Trava da data aqui
            'priority'    => ['required', new Enum(TaskPriority::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'             => 'O nome da tarefa é obrigatório.',
            'category.required'         => 'Selecione uma categoria válida.',
            'category.Illuminate\Validation\Rules\Enum' => 'A categoria selecionada é inválida.',
            'start_date.required'       => 'A data de início é obrigatória.',
            'end_date.required'         => 'A data de término é obrigatória.',
            'end_date.after_or_equal'   => 'A data de término não pode ser anterior à data de início.',
            'priority.required'         => 'Defina uma prioridade para a tarefa.',
            'status.required'           => 'O status é obrigatório.',
        ];
    }

    /**
     * Converte os dados validados em um DTO para o Service
     */
    public function toDTO(): TaskDTO
    {
        return new TaskDTO(
            name: $this->validated('name'),
            category: TaskCategory::from($this->validated('category')),
            description: $this->validated('description'),
            status: TaskStatus::from($this->validated('status')),
            startDate: $this->validated('start_date'),
            endDate: $this->validated('end_date'),
            priority: TaskPriority::from($this->validated('priority')),
            userId: auth()->id() 
        );
    }
}