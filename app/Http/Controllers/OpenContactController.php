<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Services\ContactMessageService;
use Inertia\Inertia;
use Inertia\Response;

class OpenContactController extends Controller
{
    protected ContactMessageService $service;

    public function __construct(ContactMessageService $service)
    {
        $this->service = $service;
    }


    /**
     * Render the contact page
     */
    public function index(): Response
    {
        return Inertia::render('marketing/Contact', [
            'title' => 'Nous contacter',
        ]);
    }

    /**
     * Handle form submission
     */
    public function store(StoreContactMessageRequest $request)
    {
        $this->service->create($request->validated());

        return redirect()->back()->with('success', 'Votre message a été envoyé avec succès !');
    }
}
