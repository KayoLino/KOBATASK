<?php

use App\Http\Controllers\Task\ListTasksController;
Route::get('/', ListTasksController::class)->name('list');