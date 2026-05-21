<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Services\User\UserServiceInterface;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User\UserResource;
use Exception;

class RegisterController extends Controller
{
    public function __construct(
        protected UserServiceInterface $service
    ){}

    public function __invoke(StoreUserRequest $request): JsonResponse
    {
        try {
            $user = $this->service->create($request->toDTO());
            
            return response()->json([
                'message' => 'Usuário criado com sucesso!',
                'user' => new UserResource($user)
            ], 201);
            
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}