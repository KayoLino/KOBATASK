<?php

use App\Http\Controllers\Task\IncompleteTaskController;
Route::patch('/{task}/incomplete', IncompleteTaskController::class)->name('incomplete');