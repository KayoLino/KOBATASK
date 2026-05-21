<?php

namespace App\Http\Resources\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\UserResource;

class LoginResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'access_token'  => $this['access_token'],
            'refresh_token' => $this['refresh_token'],
            'token_type'    => $this['token_type'],
            'expires_in'    => $this['expires_in'],
            'user'          => new UserResource($this['user']),
        ];
    }
}