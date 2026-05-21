<?php

namespace App\Exceptions;

use Exception;

class BusinessValidationException extends Exception
{
    protected array $errors;

    public function __construct(string $message, array $errors = [])
    {
        parent::__construct($message);
        $this->errors = $errors ?: ['error' => [$message]];
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}