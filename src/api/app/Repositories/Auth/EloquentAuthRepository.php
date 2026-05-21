<?php

namespace App\Repositories\Auth;

use App\Models\Auth\Authorization;

class EloquentAuthRepository implements AuthRepositoryInterface
{
    public function updateOrCreateAuthorization(int $userId, array $data): Authorization
    {
        return Authorization::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }

    public function findByRefreshToken(string $refreshToken): ?Authorization
    {
        return Authorization::where('refresh_token', $refreshToken)->first();
    }

    public function deleteByUserId(int $userId): bool
    {
        return Authorization::where('user_id', $userId)->delete();
    }
}

