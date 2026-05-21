<?php 

namespace App\Enums\Task;

enum TaskCategory: string {
    case WORK = 'Work';
    case PROJECT = 'Project';
    case PERSONAL = 'Personal';
}

enum TaskStatus: string {
    case PENDING = 'Pending';
    case IN_PROGRESS = 'Inprogress';
    case COMPLETED = 'Completed';
    case OVERDUE = 'Overdue';
}

enum TaskPriority: string {
    case LOW = 'Low';
    case MEDIUM = 'Medium';
    case HIGH = 'High';
}