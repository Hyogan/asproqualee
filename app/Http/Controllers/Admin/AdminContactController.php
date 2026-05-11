<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
    public function index(Request $request)
    {
        $messages = ContactMessage::query()
            ->when($request->get('status'), fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/Messages', [
            'messages' => $messages,
            'filters'  => ['status' => $request->get('status', '')],
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        if ($contactMessage->status === 'new') {
            $contactMessage->update(['status' => 'read']);
        }

        return Inertia::render('admin/Messages/Show', [
            'message' => $contactMessage->fresh(),
        ]);
    }

    public function updateStatus(Request $request, ContactMessage $contactMessage)
    {
        $request->validate([
            'status' => 'required|in:new,read,resolved',
        ]);

        $contactMessage->update(['status' => $request->status]);

        return back()->with('success', 'Statut mis à jour.');
    }
}
