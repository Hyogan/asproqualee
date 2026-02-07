<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $posts = BlogPost::query()
            ->with(['author:id,name', 'category:id,name', 'tags:id,name'])
            ->latest('published_at')
            ->paginate(10)
            ->through(fn($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'excerpt' => $post->excerpt,
                'image' => $post->image,
                'date' => $post->published_at?->format('d F Y'),
                'author' => $post->author->name,
                'category' => $post->category->name,
                'tags' => $post->tags->pluck('name'),
                'readTime' => $post->read_time,
            ]);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => Category::pluck('name'),
        ]);
    }

    public function show(BlogPost $blogPost)
    {
        return Inertia::render('Blog/Show', [
            'post' => $blogPost->load(['author:id,name', 'category:id,name', 'tags:id,name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts,slug',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|url',
            'published_at' => 'nullable|date',
            'read_time' => 'nullable|string|max:20',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'status' => 'required|in:draft,published',
        ]);

        $post = $request->user()->blogPosts()->create($validated);
        $post->tags()->sync($validated['tags'] ?? []);

        return redirect()->route('blog.index')->with('success', 'Article créé.');
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'image' => 'nullable|url',
            'published_at' => 'nullable|date',
            'read_time' => 'nullable|string|max:20',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
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
