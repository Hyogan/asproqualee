<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVolunteerRequest;
use App\Mail\VolunteerApplicationReceived;
use App\Models\SiteContent;
use App\Models\Volunteer;
use Illuminate\Support\Facades\Mail;
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

        $volunteer = Volunteer::create([
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

        $adminEmail = $this->adminEmail();
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new VolunteerApplicationReceived($volunteer));
        }

        return redirect()->back()->with('success', 'Votre candidature a bien été enregistrée.');
    }

    private function adminEmail(): ?string
    {
        $general = SiteContent::get('settings.general', []);
        return $general['email'] ?? config('mail.from.address');
    }
}
