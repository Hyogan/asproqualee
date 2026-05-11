<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVolunteerRequest;
use App\Models\Volunteer;
use Inertia\Inertia;
use Inertia\Response;

class VolunteerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('marketing/Engage/Volunteer', [
            'title' => 'Se porter volontaire',
        ]);
    }

    public function store(StoreVolunteerRequest $request)
    {
        $validated = $request->validated();

        Volunteer::create([
            'first_name'   => $validated['firstName'],
            'last_name'    => $validated['lastName'],
            'email'        => $validated['email'],
            'phone'        => $validated['phone'] ?? null,
            'location'     => $validated['location'] ?? null,
            'skills'       => $validated['skills'] ?? [],
            'commitment'   => $validated['commitment'] ?? null,
            'availability' => $validated['availability'] ?? null,
            'motivation'   => $validated['motivation'] ?? null,
            'experience'   => $validated['experience'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Votre candidature a bien été enregistrée.');
    }
}
