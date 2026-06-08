<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;
use Carbon\Carbon;

class UpdateTaskStatuses extends Command
{
    protected $signature = 'tasks:update-statuses';
    protected $description = 'Atualiza automaticamente o status das tarefas para Em Andamento ou Atrasada';

    public function handle()
    {
        $now = Carbon::now();

        Task::where('status', 'Pending')
            ->where('start_date', '<=', $now)
            ->update(['status' => 'Inprogress']);

        Task::whereIn('status', ['Pending', 'Inprogress'])
            ->where('end_date', '<', $now)
            ->update(['status' => 'Overdue']);

        $this->info('Status das tarefas atualizados com sucesso!');
    }
}