<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionResource;
use App\Models\Action;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionController extends Controller
{
    public function index(Request $request)
    {
        $actions = Action::with(['category', 'gallery'])
            ->status($request->get('status'))
            ->category($request->get('category'))
            ->orderBy('date', 'desc')
            ->get();

        $categories = Category::orderBy('name')->get(['id', 'name']);

        $stats = [
            'total_actions'    => Action::count(),
            'total_volunteers' => (int) Action::sum('participants'),
            'total_impacted'   => (int) Action::sum('participants'),
            'km_cleaned'       => 0,
        ];

        return Inertia::render('marketing/Actions/Index', [
            'actions'    => ActionResource::collection($actions)->resolve(),
            'categories' => $categories,
            'stats'      => $stats,
            'filters'    => [
                'status'   => $request->get('status', ''),
                'category' => $request->get('category', ''),
            ],
        ]);
    }

    public function show(Action $action)
    {
        $relatedActions = Action::with(['category', 'gallery'])
            ->where('category_id', $action->category_id)
            ->where('id', '!=', $action->id)
            ->latest('date')
            ->take(3)
            ->get();

        return Inertia::render('marketing/Actions/Details', [
            'action'         => new ActionResource($action->load('category', 'gallery')),
            'relatedActions' => ActionResource::collection($relatedActions)->resolve(),
        ]);
    }
}
