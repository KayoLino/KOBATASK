<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthRegisterTest extends TestCase
{   
    use RefreshDatabase;
    
    public function test_should_register_user_successfully(): void
    {
        $payload = [
            'name'     => 'Kayo Test',
            'email'    => 'kayo@test.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/auth/register', $payload);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'name', 'email']);

        $this->assertDatabaseHas('users', ['email' => 'kayo@test.com']);
    }
}
