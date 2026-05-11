<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $search   = $request->get('search', '');
        $category = $request->get('category', '');

        $posts = BlogPost::query()
            ->published()
            ->with(['author:id,name', 'category:id,name', 'tags:id,name'])
            ->when($search, fn($q) => $q->where(function ($sub) use ($search) {
                $sub->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            }))
            ->when($category, fn($q) => $q->whereHas(
                'category', fn($sub) => $sub->where('name', $category)
            ))
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($post) => [
                'id'       => $post->id,
                'title'    => $post->title,
                'excerpt'  => $post->excerpt,
                'image'    => $post->image,
                'date'     => $post->published_at?->format('d F Y'),
                'author'   => $post->author?->name ?? 'Asproqualee',
                'category' => $post->category?->name ?? '',
                'tags'     => $post->tags->pluck('name'),
                'readTime' => $post->read_time,
                'slug'     => $post->slug,
            ]);

        return Inertia::render('marketing/Blog/Index', [
            'posts'      => $posts,
            'categories' => Category::orderBy('name')->pluck('name'),
            'filters'    => ['search' => $search, 'category' => $category],
        ]);
    }

    public function show(BlogPost $blogPost)
    {
        return Inertia::render('marketing/Blog/Details', [
            'post' => $blogPost->load(['author:id,name', 'category:id,name', 'tags:id,name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'slug'         => 'required|string|max:255|unique:blog_posts,slug',
            'excerpt'      => 'required|string',
            'content'      => 'required|string',
            'image'        => 'nullable|url',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|string|max:20',
            'category_id'  => 'required|exists:categories,id',
            'tags'         => 'array',
            'status'       => 'required|in:draft,published',
        ]);

        $post = $request->user()->blogPosts()->create($validated);
        $post->tags()->sync($validated['tags'] ?? []);

        return redirect()->route('blog.index')->with('success', 'Article créé.');
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'excerpt'      => 'required|string',
            'image'        => 'nullable|url',
            'published_at' => 'nullable|date',
            'read_time'    => 'nullable|string|max:20',
            'category_id'  => 'required|exists:categories,id',
            'tags'         => 'array',
        ]);

        $blogPost->update($validated);
        $blogPost->tags()->sync($validated['tags'] ?? []);

        return redirect()->route('blog.index')->with('success', 'Article mis à jour.');
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()->route('blog.index')->with('success', 'Article supprimé.');
    }
}
