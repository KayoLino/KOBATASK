<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\Auth\AuthServiceInterface;
use Exception;

class RefreshTokenController extends Controller
{
    public function __construct(
        protected AuthServiceInterface $service
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        try {
            $refreshToken = $request->input('refresh_token');

            if(!$refreshToken) {
                return response()->json(['message'  => 'Refresh token não fornecido'], 401);
            }

            $data = $this->service->refreshToken($refreshToken);

            return response()->json($data, 200);

        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}