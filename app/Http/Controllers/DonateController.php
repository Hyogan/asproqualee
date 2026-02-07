<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DonateController extends Controller
{


    public function create() {
         return Inertia::render('marketing/Engage/Donate', [
            'title' => 'Faire un Don',
        ]); 
    }


    /**
     * Handle donation submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'        => ['nullable', 'numeric', 'min:5'],
            'customAmount'  => ['nullable', 'numeric', 'min:5'],
            'frequency'     => ['required', Rule::in(['once', 'monthly'])],

            'firstName'     => ['required', 'string', 'max:100'],
            'lastName'      => ['required', 'string', 'max:100'],
            'email'         => ['required', 'email', 'max:255'],
            'phone'         => ['nullable', 'string', 'max:30'],

            'anonymous'     => ['boolean'],
            'newsletter'    => ['boolean'],
        ]);

        /**
         * Resolve final amount
         */
        $amount = $validated['customAmount']
            ?: $validated['amount'];

        if (! $amount) {
            return back()->withErrors([
                'amount' => 'Veuillez sélectionner ou saisir un montant.',
            ]);
        }

        /**
         * Normalize donor identity
         */
        $donorName = $validated['anonymous']
            ? 'Donateur anonyme'
            : trim($validated['firstName'].' '.$validated['lastName']);

        /**
         * Persist donation (transaction-safe)
         */
        $donation = DB::transaction(function () use ($validated, $amount, $donorName) {
            return Donation::create([
                'amount'        => (int) round($amount),
                'frequency'     => $validated['frequency'],
                'first_name'    => $validated['anonymous'] ? null : $validated['firstName'],
                'last_name'     => $validated['anonymous'] ? null : $validated['lastName'],
                'email'         => $validated['email'],
                'phone'         => $validated['phone'] ?? null,
                'anonymous'     => $validated['anonymous'] ?? false,
                'newsletter'    => $validated['newsletter'] ?? true,
                'status'        => 'pending', // awaiting payment
            ]);
        });

        /**
         * 👉 Payment gateway handoff (Stripe example)
         * This is intentionally separated and replaceable.
         */
        // $paymentUrl = app(StripeService::class)->createCheckout($donation);

        /**
         * For now, redirect to thank-you or payment page
         */
        return redirect()
            ->route('donation.thank-you')
            ->with('success', 'Merci pour votre générosité 💚');
    }
}
