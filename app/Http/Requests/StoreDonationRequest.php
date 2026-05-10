<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $anonymous = filter_var($this->input('anonymous', false), FILTER_VALIDATE_BOOLEAN);

        return [
            'amount'      => ['nullable', 'numeric', 'min:1'],
            'customAmount'=> ['nullable', 'numeric', 'min:1'],
            'frequency'   => ['required', Rule::in(['once', 'monthly'])],

            'firstName'   => [$anonymous ? 'nullable' : 'required', 'string', 'max:100'],
            'lastName'    => [$anonymous ? 'nullable' : 'required', 'string', 'max:100'],
            'email'       => ['required', 'email', 'max:255'],
            'phone'       => ['nullable', 'string', 'max:30'],

            'anonymous'   => ['sometimes', 'boolean'],
            'newsletter'  => ['sometimes', 'boolean'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $amount = $this->input('customAmount') ?: $this->input('amount');

            if (! $amount || (float) $amount <= 0) {
                $validator->errors()->add(
                    'amount',
                    'Veuillez sélectionner ou saisir un montant.'
                );
            }
        });
    }

    public function messages(): array
    {
        return [
            'frequency.required' => 'Veuillez choisir la fréquence du don.',
            'frequency.in'       => 'La fréquence choisie est invalide.',
            'firstName.required' => 'Le prénom est requis.',
            'lastName.required'  => 'Le nom est requis.',
            'email.required'     => 'L\'adresse email est requise.',
            'email.email'        => 'L\'adresse email est invalide.',
        ];
    }
}
