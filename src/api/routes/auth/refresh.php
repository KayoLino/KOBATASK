<?php

use App\Http\Controllers\Auth\RefreshTokenController;
use Illuminate\Support\Facades\Route;

Route::post('/refresh', RefreshTokenController::class)->name('refresh');