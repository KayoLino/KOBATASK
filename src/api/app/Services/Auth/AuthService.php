<?php

namespace App\Services\Auth;

use App\DTOs\Auth\LoginDTO;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Auth\AuthRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthService implements AuthServiceInterface
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
        protected AuthRepositoryInterface $authRepository
    ) {}

    public function login(LoginDTO $dto): array
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (!$user || !Hash::check($dto->password, $user->password)) {
            throw new Exception('Credenciais inválidas');
        }

        $accessToken = auth('api')->login($user);
        $refreshToken = bin2hex(random_bytes(64));

        $this->authRepository->updateOrCreateAuthorization($user->id, [
            'refresh_token' => $refreshToken
        ]);

        return [
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type'    => 'Bearer',
            'expires_in'    => auth('api')->factory()->getTTL() * 60,
            'user'          => $user
        ];
    }

    public function refreshToken(string $refreshToken): array
    {
        $authorization = $this->authRepository->findByRefreshToken($refreshToken);

        if (!$authorization) {
            throw new Exception('Refresh token inválido ou expirado.');
        }

        $user = $this->userRepository->find($authorization->user_id);

        if(!$user) {
            throw new Exception('Usuário não encontrado.');
        }

        $newAccessToken = auth('api')->login($user);
        $newRefreshToken = bin2hex(random_bytes(64));

        $this->authRepository->updateOrCreateAuthorization($user->id, [
            'refresh_token' => $newRefreshToken
        ]);

        return [
            'access_token' => $newAccessToken,
            'refresh_token' => $newRefreshToken,
            'token_type' => 'Bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ];
    }

    public function logout(int $userId): void
    {
        auth('api')->logout();

        $this->authRepository->deleteByUserId($userId);
    }
}