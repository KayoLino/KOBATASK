<?php

use App\Http\Controllers\Task\StoreTaskController;
Route::post('/', StoreTaskController::class)->name('store');