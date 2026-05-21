<?php

namespace App\Services\User;

use App\Models\User\User;
use App\DTOs\User\CreateUserDTO;
use App\DTOs\User\UpdateUserProfileDTO;

interface UserServiceInterface
{
    public function create(CreateUserDTO $data): User;
    public function update(int $id, UpdateUserProfileDTO $data): User;
    public function getProfile(int $userId): User;
}