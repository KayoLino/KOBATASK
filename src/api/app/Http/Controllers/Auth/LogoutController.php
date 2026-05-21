<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthServiceInterface;
use Illuminate\Http\JsonResponse;

class LogoutController extends Controller
{
    public function __construct(
        protected AuthServiceInterface $service
    ) {}

    public function __invoke(): JsonResponse
    {
        try {
            $userId = auth('api')->id();

            if (!$userId) {
                return response()->json([
                    'message' => 'Usuário não autenticado'
                ], 401);
            }

            $this->service->logout($userId);

            return response()->json([
                'message' => 'Logout realizado com sucesso'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao fazer logout',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}