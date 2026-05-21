<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\User\UserServiceInterface;
use App\Services\User\UserService;
use App\Services\Auth\AuthServiceInterface;
use App\Services\Task\TaskServiceInterface;
use App\Services\Task\TaskService;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Auth\AuthService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {   
        $this->app->singleton(UserServiceInterface::class, UserService::class);
        $this->app->singleton(AuthServiceInterface::class, AuthService::class);
        $this->app->singleton(TaskServiceInterface::class, TaskService::class);
    }

    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
