<?php

use App\Http\Controllers\User\UpdateUserProfileController;
use Illuminate\Support\Facades\Route;

Route::put('/update', UpdateUserProfileController::class)->name('update');