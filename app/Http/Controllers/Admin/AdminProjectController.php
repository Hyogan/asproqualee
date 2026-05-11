<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('order')->orderBy('id')
            ->paginate(20)
            ->through(fn($p) => [
                'id'        => $p->id,
                'title'     => $p->title,
                'category'  => $p->category,
                'status'    => $p->status,
                'location'  => $p->location,
                'progress'  => $p->progress,
                'is_active' => $p->is_active,
                'order'     => $p->order,
            ]);

        return Inertia::render('admin/Projects/Index', ['projects' => $projects]);
    }

    public function create()
    {
        return Inertia::render('admin/Projects/Form', ['project' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'status'       => 'required|in:en-cours,terminé,planifié',
            'description'  => 'required|string',
            'image'        => 'nullable|url|max:2048',
            'location'     => 'nullable|string|max:255',
            'progress'     => 'nullable|integer|min:0|max:100',
            'impact_goal'  => 'nullable|string|max:100',
            'impact_value' => 'nullable|string|max:100',
            'is_active'    => 'boolean',
            'order'        => 'nullable|integer|min:0',
        ]);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Projet créé.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/Projects/Form', [
            'project' => [
                'id'           => $project->id,
                'title'        => $project->title,
                'category'     => $project->category,
                'status'       => $project->status,
                'description'  => $project->description,
                'image'        => $project->image,
                'location'     => $project->location,
                'progress'     => $project->progress,
                'impact_goal'  => $project->impact_goal,
                'impact_value' => $project->impact_value,
                'is_active'    => $project->is_active,
                'order'        => $project->order,
            ],
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'status'       => 'required|in:en-cours,terminé,planifié',
            'description'  => 'required|string',
            'image'        => 'nullable|url|max:2048',
            'location'     => 'nullable|string|max:255',
            'progress'     => 'nullable|integer|min:0|max:100',
            'impact_goal'  => 'nullable|string|max:100',
            'impact_value' => 'nullable|string|max:100',
            'is_active'    => 'boolean',
            'order'        => 'nullable|integer|min:0',
        ]);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Projet mis à jour.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Projet supprimé.');
    }
}
