<?php

use App\Http\Controllers\User\GetUserProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', GetUserProfileController::class)->name('profile');