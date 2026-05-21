<?php

namespace App\Repositories\User;

use App\Models\User\User;

interface UserRepositoryInterface
{
    public function create(array $data): User;
    public function update (int $id, array $data): User;
    public function find (int $id): ?User; 
    public function findByEmail(string $email): ?User;
}