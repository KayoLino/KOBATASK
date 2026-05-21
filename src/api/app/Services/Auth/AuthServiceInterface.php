<?php

namespace App\Services\Auth;

use App\DTOs\Auth\LoginDTO;

interface AuthServiceInterface
{
    public function login(LoginDTO $data): array;
    public function refreshToken(string $refreshToken): array;
    public function logout(int $userId): void;
}