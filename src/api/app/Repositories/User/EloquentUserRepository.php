<?php

namespace App\Repositories\User;

use App\Models\User\User;
use App\DTOs\User\CreateUserDTO;

class EloquentUserRepository implements UserRepositoryInterface
{   

    public function create(array $data): User
    {
        return User::create([
            'name'           => $data['name'],
            'email'          => $data['email'],
            'password'       => $data['password'],
            'profile_image'  => $data['profile_image']
        ]);
    }

    public function update(int $id, array $data): User
    {
        $user = User::findOrFail($id);

        $updateData = array_filter([
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'password' => $data['password'] ?? null,
            'profile_image' => $data['profile_image'] ?? null,
        ]);

        $user->update($updateData);

        return $user;
    }

    public function find(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }
}