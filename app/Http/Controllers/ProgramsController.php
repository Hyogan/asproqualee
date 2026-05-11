<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Inertia\Inertia;

class ProgramsController extends Controller
{
    private function formatProgram(Program $p): array
    {
        return [
            'id'          => $p->id,
            'title'       => $p->title,
            'slug'        => $p->slug,
            'description' => $p->description,
            'icon'        => $p->icon,
            'color'       => $p->color,
            'stats_label' => $p->stats_label,
            'stats_value' => $p->stats_value,
            'pillars'     => $p->pillars ?? [],
        ];
    }

    public function index()
    {
        $programs = Program::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn($p) => $this->formatProgram($p));

        return Inertia::render('marketing/Programs/Index', ['programs' => $programs]);
    }

    public function show(Program $program)
    {
        abort_if(! $program->is_active, 404);

        $others = Program::where('is_active', true)
            ->where('id', '!=', $program->id)
            ->orderBy('order')
            ->take(3)
            ->get()
            ->map(fn($p) => $this->formatProgram($p));

        return Inertia::render('marketing/Programs/Details', [
            'program' => $this->formatProgram($program),
            'others'  => $others,
        ]);
    }
}
