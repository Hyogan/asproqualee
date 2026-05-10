<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDonationRequest;
use App\Models\Donation;
use Inertia\Inertia;

class DonateController extends Controller
{
    public function create()
    {
        return Inertia::render('marketing/Engage/Donate', [
            'title' => 'Faire un Don',
        ]);
    }

    public function thankYou()
    {
        return Inertia::render('marketing/Engage/DonationThankYou');
    }

    public function store(StoreDonationRequest $request)
    {
        $validated = $request->validated();

        $amount = (int) round((float) ($validated['customAmount'] ?: $validated['amount']));
        $anonymous = (bool) ($validated['anonymous'] ?? false);

        Donation::create([
            'amount'     => $amount,
            'frequency'  => $validated['frequency'],
            'first_name' => $anonymous ? null : $validated['firstName'],
            'last_name'  => $anonymous ? null : $validated['lastName'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'] ?? null,
            'anonymous'  => $anonymous,
            'newsletter' => (bool) ($validated['newsletter'] ?? true),
            'status'     => 'pending',
        ]);

        return redirect()->route('donation.thank-you');
    }
}
