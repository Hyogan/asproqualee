<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Action;
use App\Models\ActionGallery;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminActionController extends Controller
{
    public function index(Request $request)
    {
        $actions = Action::query()
            ->with('category:id,name')
            ->when($request->get('status'), fn($q, $s) => $q->where('status', $s))
            ->orderBy('date', 'desc')
            ->paginate(20)
            ->withQueryString()
            ->through(fn($action) => [
                'id'           => $action->id,
                'title'        => $action->title,
                'category'     => $action->category?->name ?? '—',
                'date'         => $action->date->format('d/m/Y'),
                'location'     => $action->location,
                'participants' => $action->participants,
                'status'       => $action->status,
            ]);

        return Inertia::render('admin/Actions/Index', [
            'actions' => $actions,
            'filters' => ['status' => $request->get('status', '')],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Actions/Form', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'action'     => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'category_id'      => 'required|exists:categories,id',
            'description'      => 'required|string',
            'long_description' => 'nullable|string',
            'image'            => 'nullable|url|max:2048',
            'date'             => 'required|date',
            'location'         => 'nullable|string|max:255',
            'participants'     => 'nullable|integer|min:0',
            'impact_label'     => 'nullable|string|max:100',
            'impact_value'     => 'nullable|string|max:100',
            'status'           => 'required|in:upcoming,ongoing,completed',
            'gallery'          => 'array',
            'gallery.*'        => 'url|max:2048',
        ]);

        $gallery = $validated['gallery'] ?? [];
        unset($validated['gallery']);
        $validated['participants'] = $validated['participants'] ?? 0;

        $action = Action::create($validated);

        foreach ($gallery as $url) {
            $action->gallery()->create(['image' => $url]);
        }

        return redirect()->route('admin.actions.index')->with('success', 'Action créée.');
    }

    public function edit(Action $action)
    {
        $action->load('gallery');

        return Inertia::render('admin/Actions/Form', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'action'     => [
                'id'               => $action->id,
                'title'            => $action->title,
                'category_id'      => $action->category_id,
                'description'      => $action->description,
                'long_description' => $action->long_description,
                'image'            => $action->image,
                'date'             => $action->date->format('Y-m-d'),
                'location'         => $action->location,
                'participants'     => $action->participants,
                'impact_label'     => $action->impact_label,
                'impact_value'     => $action->impact_value,
                'status'           => $action->status,
                'gallery'          => $action->gallery->pluck('image')->toArray(),
            ],
        ]);
    }

    public function update(Request $request, Action $action)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'category_id'      => 'required|exists:categories,id',
            'description'      => 'required|string',
            'long_description' => 'nullable|string',
            'image'            => 'nullable|url|max:2048',
            'date'             => 'required|date',
            'location'         => 'nullable|string|max:255',
            'participants'     => 'nullable|integer|min:0',
            'impact_label'     => 'nullable|string|max:100',
            'impact_value'     => 'nullable|string|max:100',
            'status'           => 'required|in:upcoming,ongoing,completed',
            'gallery'          => 'array',
            'gallery.*'        => 'url|max:2048',
        ]);

        $gallery = $validated['gallery'] ?? [];
        unset($validated['gallery']);
        $validated['participants'] = $validated['participants'] ?? 0;

        $action->update($validated);

        // Replace gallery entries
        $action->gallery()->delete();
        foreach ($gallery as $url) {
            $action->gallery()->create(['image' => $url]);
        }

        return redirect()->route('admin.actions.index')->with('success', 'Action mise à jour.');
    }

    public function destroy(Action $action)
    {
        $action->delete(); // gallery cascades

        return redirect()->route('admin.actions.index')->with('success', 'Action supprimée.');
    }
}
