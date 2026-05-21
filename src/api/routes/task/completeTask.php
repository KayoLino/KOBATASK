<?php

use App\Http\Controllers\Task\CompleteTaskController;
Route::patch('/{task}/complete', CompleteTaskController::class)->name('complete');