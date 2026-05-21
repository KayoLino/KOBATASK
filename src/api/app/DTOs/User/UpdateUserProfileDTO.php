<?php

namespace App\DTOs\User;

use Illuminate\Http\UploadedFile;

readonly class UpdateUserProfileDTO 
{
    public function __construct(
        public ?string $name,
        public ?string $email,
        public ?string $currentPassword,
        public ?string $newPassword,
        public ?UploadedFile $profileImage = null,
    ) {}
} 