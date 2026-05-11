<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\BlogPost;
use App\Models\Volunteer;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'stats'            => $this->stats(),
            'featuredProjects' => $this->featuredProjects(),
            'recentNews'       => $this->recentNews(),
            'canRegister'      => Features::enabled(Features::registration()),
        ]);
    }

    protected function stats(): array
    {
        $totalParticipants = (int) Action::sum('participants');
        $totalActions      = Action::count();
        $totalVolunteers   = Volunteer::count();

        return [
            'beneficiaries'     => $totalParticipants > 0
                ? number_format($totalParticipants, 0, ',', ' ')
                : '0',
            'projects'          => (string) $totalActions,
            'volunteers'        => (string) $totalVolunteers,
            'litersDistributed' => '—',
        ];
    }

    protected function featuredProjects(): array
    {
        return Action::with('category')
            ->whereIn('status', ['ongoing', 'upcoming'])
            ->latest('date')
            ->take(3)
            ->get()
            ->map(fn(Action $action) => [
                'id'          => $action->id,
                'title'       => $action->title,
                'description' => $action->description,
                'image'       => $action->image ?? '',
                'location'    => $action->location ?? '',
                'impact'      => trim(($action->impact_value ?? '') . ' ' . ($action->impact_label ?? '')),
                'slug'        => (string) $action->id,
            ])
            ->toArray();
    }

    protected function recentNews(): array
    {
        return BlogPost::published()
            ->with(['author:id,name', 'category:id,name'])
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn(BlogPost $post) => [
                'id'       => $post->id,
                'title'    => $post->title,
                'excerpt'  => $post->excerpt,
                'image'    => $post->image ?? '',
                'date'     => $post->published_at?->format('Y-m-d') ?? '',
                'category' => $post->category?->name ?? '',
                'slug'     => $post->slug,
            ])
            ->toArray();
    }
}
