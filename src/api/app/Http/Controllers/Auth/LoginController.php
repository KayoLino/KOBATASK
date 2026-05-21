<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\AuthServiceInterface;
use App\DTOs\Auth\LoginDTO;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\Auth\LoginResource;
use Exception;

class LoginController extends Controller
{
    public function __construct(
        protected AuthServiceInterface $service
    ) {}

    public function __invoke(LoginRequest $request): JsonResponse
    {
        try {
           $data = $this->service->login($request->toDTO());

            return (new LoginResource($data))
                    ->response()
                    ->setStatusCode(200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => ['email' => [$e->getMessage()]]
            ], 401);
        }
    }
}