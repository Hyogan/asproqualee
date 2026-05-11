<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDonationController extends Controller
{
    public function index(Request $request)
    {
        $donations = Donation::query()
            ->when($request->get('status'), fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/Donations', [
            'donations' => $donations,
            'filters'   => ['status' => $request->get('status', '')],
        ]);
    }

    public function updateStatus(Request $request, Donation $donation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $donation->update(['status' => $request->status]);

        return back()->with('success', 'Statut mis à jour.');
    }
}
