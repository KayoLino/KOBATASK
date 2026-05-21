<?php 

namespace App\Enums\Task;

enum TaskPriority: string 
{
    case LOW = 'Low';
    case MEDIUM = 'Medium';
    case HIGH = 'High';
}