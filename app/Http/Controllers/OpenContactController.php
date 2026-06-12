<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Mail\ContactMessageReceived;
use App\Models\SiteContent;
use App\Services\ContactMessageService;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class OpenContactController extends Controller
{
    protected ContactMessageService $service;

    public function __construct(ContactMessageService $service)
    {
        $this->service = $service;
    }

    public function index(): Response
    {
        return Inertia::render('marketing/Contact', [
            'title' => 'Nous contacter',
        ]);
    }

    public function store(StoreContactMessageRequest $request)
    {
        $contactMessage = $this->service->create($request->validated());

        $adminEmail = $this->adminEmail();
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new ContactMessageReceived($contactMessage));
        }

        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès !');
    }

    private function adminEmail(): ?string
    {
        $general = SiteContent::get('settings.general', []);
        return $general['email'] ?? config('mail.from.address');
    }
}
