<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateUserProfileRequest;
use App\Services\User\UserServiceInterface;
use App\Exceptions\BusinessValidationException;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\User\UserResource;
use Exception;

class UpdateUserProfileController extends Controller
{
    public function __construct(
        protected UserServiceInterface $service,
    ) {}

    public function __invoke(UpdateUserProfileRequest $dto): JsonResponse
    {
        try {
            $data = $this->service->update(auth()->id(), $dto->toDTO());
            return (new UserResource($data))
                ->additional(['message' => 'Perfil atualizado com sucesso!'])
                ->response()
                ->setStatusCode(200);
        } catch (BusinessValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->getErrors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocorreu um erro ao atualizar o perfil',
                'debug' => $e->getMessage()
            ], 500);
        }
    }
}