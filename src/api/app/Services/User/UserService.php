<?php

namespace App\Services\User;

use App\Models\User\User;
use App\DTOs\User\CreateUserDTO;
use App\DTOs\User\UpdateUserProfileDTO;
use App\Repositories\User\UserRepositoryInterface;
use App\Exceptions\BusinessValidationException;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Storage;

class UserService implements UserServiceInterface
{
    public function __construct(
        protected UserRepositoryInterface $repository
    ) {}

    public function create(CreateUserDTO $data): User
    {
        $imagePath = null;
        
        if($data->profileImage) {
            $imagePath = $data->profileImage->store('profiles', 'public');
        }

        $payload = [
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password,
            'profile_image' => $imagePath,
        ];

        return $this->repository->create($payload);
    }

    public function update(int $userId, UpdateUserProfileDTO $dto): User
    {
        $user = $this->repository->find($userId);
        $password = $user->password;

        if ($dto->newPassword) {
            if (!Hash::check($dto->currentPassword, $user->password)) {
                throw new BusinessValidationException(
                    'A senha atual está incorreta.',
                    ['currentPassword' => ['A senha atual está incorreta.']]
                );
            }

            $password = $dto->newPassword;
        }

        $imagePath = $user->profile_image;

        if($dto->profileImage) {
            if($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            $imagePath = $dto->profileImage->store('profiles', 'public');
        }

        $payload = [
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => $password,
            'profile_image' => $imagePath
        ];

        return $this->repository->update($userId, $payload);
    }

    public function getProfile(int $userId): User
    {
        $user = $this->repository->find($userId);

        if (!$user) {
            throw new \Exception("Usuário não encontrado");
        }

        return $user;
    }
}