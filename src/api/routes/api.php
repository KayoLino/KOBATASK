<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->name('auth.')
    ->group(function () {
        require __DIR__ . '/auth/register.php';
        require __DIR__ . '/auth/login.php';
        require __DIR__ . '/auth/refresh.php';
        require __DIR__ . '/auth/logout.php';
    });

Route::prefix('user')
    ->name('user.')
    ->middleware('auth:api')
    ->group(function () {
        require __DIR__ . '/user/getUserProfile.php';
        require __DIR__ . '/user/updateUserProfile.php';
    });

Route::prefix('task')
    ->name('task.')
    ->middleware('auth:api')
    ->group(function () {
        require __DIR__ . '/task/listTasks.php';
        require __DIR__ . '/task/storeTask.php';
        require __DIR__ . '/task/updateTask.php';
        require __DIR__ . '/task/deleteTask.php';
        require __DIR__ . '/task/getTask.php';
        require __DIR__ . '/task/completeTask.php';
        require __DIR__ . '/task/incompleteTask.php';
    });


