<?php

use App\Http\Controllers\Task\DeleteTaskController;
Route::delete('/{task}', DeleteTaskController::class)->name('delete');