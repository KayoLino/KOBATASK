<?php

use App\Http\Controllers\Task\GetTaskController;
Route::get('/{taskId}', GetTaskController::class)->name('getTask');