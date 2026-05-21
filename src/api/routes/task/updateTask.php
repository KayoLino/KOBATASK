<?php

use App\Http\Controllers\Task\UpdateTaskController;
Route::put('/{task}', UpdateTaskController::class)->name('update');