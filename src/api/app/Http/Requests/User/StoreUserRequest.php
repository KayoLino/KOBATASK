<?php

namespace App\Http\Requests\User;

use App\DTOs\User\CreateUserDTO;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['required', 'email', 'unique:users,email'],
            'password'      => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required'],
            'profile_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
             'name.required'     => 'O nome é obrigatório.',
             'email.required'    => 'O e-mail é obrigatório.',
             'email.email'       => 'Informe um e-mail válido.',
             'email.unique'      => 'Este e-mail já está cadastrado.',
             'password.required' => 'A senha é obrigatória.',
             'password.min'      => 'A senha deve ter pelo menos 8 caracteres.',
             'password.confirmed' => 'As senhas não coincidem.',
             'password_confirmation.required' => 'A confirmação de senha é obrigatória.',
             'profile_image.image' => 'O arquivo deve ser uma imagem.',
             'profile_image.max'   => 'A imagem não pode passar de 2MB.',
        ];
    }

    public function toDTO(): CreateUserDTO
    {
        return new CreateUserDTO(
            name: $this->validated('name'),
            email: $this->validated('email'),
            password: $this->validated('password'),
            profileImage: $this->file('profile_image')
        );
    }
}
