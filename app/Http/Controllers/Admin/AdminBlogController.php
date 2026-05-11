<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminBlogController extends Controller
{
    public function index(Request $request)
    {
        $posts = BlogPost::query()
            ->with(['author:id,name', 'category:id,name'])
            ->when($request->get('status'), fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(20)
            ->withQueryString()
            ->through(fn($post) => [
                'id'           => $post->id,
                'title'        => $post->title,
                'slug'         => $post->slug,
                'status'       => $post->status,
                'author'       => $post->author?->name ?? '—',
                'category'     => $post->category?->name ?? '—',
                'published_at' => $post->published_at?->format('d/m/Y'),
            ]);

        return Inertia::render('admin/Blog/Index', [
            'posts'   => $posts,
            'filters' => ['status' => $request->get('status', '')],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Blog/Form', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'tags'       => Tag::orderBy('name')->get(['id', 'name']),
            'post'       => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'excerpt'      => 'required|string|max:500',
            'content'      => 'required|string',
            'image'        => 'nullable|url|max:2048',
            'category_id'  => 'required|exists:categories,id',
            'tags'         => 'array',
            'tags.*'       => 'exists:tags,id',
            'status'       => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|string|max:20',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        // Ensure unique slug
        $base = $validated['slug'];
        $i = 1;
        while (BlogPost::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = "{$base}-{$i}";
            $i++;
        }

        $post = $request->user()->blogPosts()->create($validated);
        $post->tags()->sync($validated['tags'] ?? []);

        return redirect()->route('admin.blog.index')->with('success', 'Article créé.');
    }

    public function edit(BlogPost $blogPost)
    {
        $blogPost->load('tags:id');

        return Inertia::render('admin/Blog/Form', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'tags'       => Tag::orderBy('name')->get(['id', 'name']),
            'post'       => [
                'id'           => $blogPost->id,
                'title'        => $blogPost->title,
                'slug'         => $blogPost->slug,
                'excerpt'      => $blogPost->excerpt,
                'content'      => $blogPost->content,
                'image'        => $blogPost->image,
                'category_id'  => $blogPost->category_id,
                'tag_ids'      => $blogPost->tags->pluck('id'),
                'status'       => $blogPost->status,
                'published_at' => $blogPost->published_at?->format('Y-m-d'),
                'read_time'    => $blogPost->read_time,
            ],
        ]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'excerpt'      => 'required|string|max:500',
            'content'      => 'required|string',
            'image'        => 'nullable|url|max:2048',
            'category_id'  => 'required|exists:categories,id',
            'tags'         => 'array',
            'tags.*'       => 'exists:tags,id',
            'status'       => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|string|max:20',
        ]);

        $blogPost->update($validated);
        $blogPost->tags()->sync($validated['tags'] ?? []);

        return redirect()->route('admin.blog.index')->with('success', 'Article mis à jour.');
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Article supprimé.');
    }
}
