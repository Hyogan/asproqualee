<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProgramController extends Controller
{
    public function index()
    {
        $programs = Program::orderBy('order')->orderBy('id')
            ->paginate(20)
            ->through(fn($p) => [
                'id'       => $p->id,
                'title'    => $p->title,
                'icon'     => $p->icon,
                'color'    => $p->color,
                'order'    => $p->order,
                'is_active'=> $p->is_active,
            ]);

        return Inertia::render('admin/Programs/Index', ['programs' => $programs]);
    }

    public function create()
    {
        return Inertia::render('admin/Programs/Form', ['program' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:50',
            'color'       => 'nullable|string|max:30',
            'stats_label' => 'nullable|string|max:100',
            'stats_value' => 'nullable|string|max:50',
            'pillars'     => 'nullable|array',
            'pillars.*'   => 'string|max:100',
            'order'       => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        Program::create($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Programme créé.');
    }

    public function edit(Program $program)
    {
        return Inertia::render('admin/Programs/Form', [
            'program' => [
                'id'          => $program->id,
                'title'       => $program->title,
                'description' => $program->description,
                'icon'        => $program->icon,
                'color'       => $program->color,
                'stats_label' => $program->stats_label,
                'stats_value' => $program->stats_value,
                'pillars'     => $program->pillars ?? [],
                'order'       => $program->order,
                'is_active'   => $program->is_active,
            ],
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:50',
            'color'       => 'nullable|string|max:30',
            'stats_label' => 'nullable|string|max:100',
            'stats_value' => 'nullable|string|max:50',
            'pillars'     => 'nullable|array',
            'pillars.*'   => 'string|max:100',
            'order'       => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $program->update($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Programme mis à jour.');
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return redirect()->route('admin.programs.index')->with('success', 'Programme supprimé.');
    }
}
