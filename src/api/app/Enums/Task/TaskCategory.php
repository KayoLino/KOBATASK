<?php 

namespace App\Enums\Task;

enum TaskCategory: string 
{
    case WORK = 'Work';
    case PROJECT = 'Project';
    case PERSONAL = 'Personal';
}