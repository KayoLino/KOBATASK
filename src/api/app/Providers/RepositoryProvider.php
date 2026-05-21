<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\EloquentUserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Auth\AuthRepositoryInterface;
use App\Repositories\Auth\EloquentAuthRepository;
use App\Repositories\Task\EloquentTaskRepository;
use App\Repositories\Task\TaskRepositoryInterface;



class RepositoryProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->singleton(AuthRepositoryInterface::class, EloquentAuthRepository::class);
        $this->app->singleton(TaskRepositoryInterface::class, EloquentTaskRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
