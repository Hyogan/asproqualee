<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function formatProject(Project $p): array
    {
        return [
            'id'           => $p->id,
            'title'        => $p->title,
            'category'     => $p->category,
            'status'       => $p->status,
            'description'  => $p->description,
            'image'        => $p->image,
            'location'     => $p->location,
            'progress'     => $p->progress,
            'impact_goal'  => $p->impact_goal,
            'impact_value' => $p->impact_value,
        ];
    }

    public function index()
    {
        $projects = Project::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn($p) => $this->formatProject($p));

        return Inertia::render('marketing/Projects/Index', ['projects' => $projects]);
    }

    public function show(Project $project)
    {
        abort_if(! $project->is_active, 404);

        $related = Project::where('is_active', true)
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->orderBy('order')
            ->take(3)
            ->get()
            ->map(fn($p) => $this->formatProject($p));

        return Inertia::render('marketing/Projects/Details', [
            'project' => $this->formatProject($project),
            'related' => $related,
        ]);
    }
}
