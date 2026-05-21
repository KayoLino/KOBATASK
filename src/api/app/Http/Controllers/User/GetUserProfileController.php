<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\UserServiceInterface;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User\UserResource;
use Exception;

class GetUserProfileController extends Controller
{
    public function __construct(
        protected UserServiceInterface $service
    ){}

    public function __invoke(): JsonResponse
    {
        try {
            $user = $this->service->getProfile(auth()->id());

            return response()->json([
                'user' => new UserResource($user)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar perfil',
                'message' => $e->getMessage()
            ], 404);
        }
    }
}