<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Donation;
use App\Models\Volunteer;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'donations'   => Donation::count(),
                'volunteers'  => Volunteer::count(),
                'messages'    => ContactMessage::where('status', 'new')->count(),
                'blog_posts'  => BlogPost::count(),
            ],
            'recent_donations' => Donation::latest()->take(5)->get(),
        ]);
    }
}
