<?php

namespace App\Repositories\Auth;

use App\Models\Auth\Authorization;

interface AuthRepositoryInterface
{
    public function updateOrCreateAuthorization(int $userId, array $data): Authorization;
    public function findByRefreshToken(string $refreshToken): ?Authorization;
    public function deleteByUserId(int $userId): bool;
}