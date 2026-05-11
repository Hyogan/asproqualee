<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTaxonomyController extends Controller
{
    // ── Categories ──────────────────────────────────────────────────────────

    public function categories()
    {
        return Inertia::render('admin/Taxonomy/Categories', [
            'categories' => Category::withCount('blogPosts')->orderBy('name')->get(),
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'icon' => 'nullable|string|max:100',
        ], [
            'name.required' => 'Le nom est obligatoire.',
            'name.unique'   => 'Cette catégorie existe déjà.',
        ]);

        Category::create($request->only('name', 'icon'));

        return back()->with('success', 'Catégorie créée.');
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $category->id,
            'icon' => 'nullable|string|max:100',
        ], [
            'name.required' => 'Le nom est obligatoire.',
            'name.unique'   => 'Cette catégorie existe déjà.',
        ]);

        $category->update($request->only('name', 'icon'));

        return back()->with('success', 'Catégorie mise à jour.');
    }

    public function destroyCategory(Category $category)
    {
        if ($category->blogPosts()->exists()) {
            return back()->withErrors(['delete' => 'Impossible de supprimer une catégorie utilisée par des articles.']);
        }

        $category->delete();

        return back()->with('success', 'Catégorie supprimée.');
    }

    // ── Tags ────────────────────────────────────────────────────────────────

    public function tags()
    {
        return Inertia::render('admin/Taxonomy/Tags', [
            'tags' => Tag::withCount('blogPosts')->orderBy('name')->get(),
        ]);
    }

    public function storeTag(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:tags,name',
        ], [
            'name.required' => 'Le nom est obligatoire.',
            'name.unique'   => 'Ce tag existe déjà.',
        ]);

        Tag::create($request->only('name'));

        return back()->with('success', 'Tag créé.');
    }

    public function updateTag(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:tags,name,' . $tag->id,
        ], [
            'name.required' => 'Le nom est obligatoire.',
            'name.unique'   => 'Ce tag existe déjà.',
        ]);

        $tag->update($request->only('name'));

        return back()->with('success', 'Tag mis à jour.');
    }

    public function destroyTag(Tag $tag)
    {
        $tag->delete();

        return back()->with('success', 'Tag supprimé.');
    }
}
