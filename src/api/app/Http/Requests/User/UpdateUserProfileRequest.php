<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\DTOs\User\UpdateUserProfileDTO;


class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'            => ['nullable', 'string', 'max:255'],
            'email'           => ['nullable', 'string', 'email', 'unique:users,email,' . auth()->id()],
            'currentPassword' => ['nullable', 'required_with:newPassword', 'string', 'min:8'],
            'newPassword'     => ['nullable', 'string', 'min:8', 'different:currentPassword'],
            'profileImage'    => ['nullable', 'image', 'mimes:jpg,png', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.max'                      => 'O nome pode ter no máximo 255 caracteres.',
            'email.email'                   => 'E-mail inválido.',
            'email.unique'                  => 'Esse e-mail já está sendo usado por outra pessoa.',
            'currentPassword.required_with' => 'Para cadastrar uma nova senha, você precisa informar a atual.',
            'currentPassword.min'           => 'A senha atual precisa ter pelo menos 8 caracteres.',
            'newPassword.min'               => 'A nova senha precisa de pelo menos 8 caracteres.',
            'newPassword.different'         => 'A nova senha não pode ser igual a antiga.',
            'profileImage.image'           => 'O arquivo enviado deve ser uma imagem.',
        ];
    }

    public function toDTO(): UpdateUserProfileDTO
    {
        return new UpdateUserProfileDTO(
            name: $this->validated('name'),
            email: $this->validated('email'),
            currentPassword: $this->validated('currentPassword'),
            newPassword: $this->validated('newPassword'),
            profileImage: $this->file('profileImage'),
        );
    }
}
