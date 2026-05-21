<?php 

namespace App\Enums\Task;

enum TaskStatus: string 
{
    case PENDING = 'Pending';
    case IN_PROGRESS = 'Inprogress';
    case COMPLETED = 'Completed';
    case OVERDUE = 'Overdue';
}