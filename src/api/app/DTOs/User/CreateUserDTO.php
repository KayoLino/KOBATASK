<?php

namespace App\DTOs\User;

use Illuminate\Http\UploadedFile;

readonly class CreateUserDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public ?UploadedFile $profileImage = null,
    ) {}
}