<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVolunteerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName'    => ['required', 'string', 'max:100'],
            'lastName'     => ['required', 'string', 'max:100'],
            'email'        => ['required', 'email', 'max:255'],
            'phone'        => ['nullable', 'string', 'max:30'],
            'location'     => ['nullable', 'string', 'max:255'],
            'skills'       => ['nullable', 'array'],
            'skills.*'     => ['string', 'max:50'],
            'commitment'   => ['nullable', 'string', 'max:50'],
            'availability' => ['nullable', 'string', 'max:1000'],
            'motivation'   => ['nullable', 'string', 'max:2000'],
            'experience'   => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'firstName.required' => 'Le prénom est requis.',
            'lastName.required'  => 'Le nom est requis.',
            'email.required'     => 'L\'adresse email est requise.',
            'email.email'        => 'L\'adresse email est invalide.',
        ];
    }
}
