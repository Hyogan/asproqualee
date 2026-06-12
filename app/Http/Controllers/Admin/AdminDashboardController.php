<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Action;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Product;
use App\Models\Program;
use App\Models\Project;
use App\Models\Volunteer;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'donations'          => Donation::count(),
                'donations_total'    => (int) Donation::where('status', 'confirmed')->sum('amount'),
                'volunteers'         => Volunteer::count(),
                'volunteers_pending' => Volunteer::where('status', 'pending')->count(),
                'messages'           => ContactMessage::where('status', 'new')->count(),
                'blog_posts'         => BlogPost::count(),
                'actions'            => Action::count(),
                'programs'           => Program::count(),
                'products'           => Product::count(),
                'projects'           => Project::count(),
            ],
            'recent_donations'  => Donation::latest()->take(5)->get(),
            'recent_messages'   => ContactMessage::latest()->take(5)->get(['id', 'name', 'email', 'subject', 'status', 'created_at']),
            'recent_volunteers' => Volunteer::latest()->take(5)->get(['id', 'first_name', 'last_name', 'email', 'status', 'created_at']),
        ]);
    }
}
