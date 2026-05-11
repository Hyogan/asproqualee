<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminVolunteerController extends Controller
{
    public function index(Request $request)
    {
        $volunteers = Volunteer::query()
            ->when($request->get('status'), fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        // dd($volunteers);

        return Inertia::render('admin/Volunteers', [
            'volunteers' => $volunteers,
            'filters'    => ['status' => $request->get('status', '')],
        ]);
    }

    public function updateStatus(Request $request, Volunteer $volunteer)
    {
        $request->validate([
            'status' => 'required|in:pending,contacted,active,inactive',
        ]);

        $volunteer->update(['status' => $request->status]);

        return back()->with('success', 'Statut mis à jour.');
    }
}
