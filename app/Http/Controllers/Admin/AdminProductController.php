<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('order')->orderBy('id')
            ->paginate(20)
            ->through(fn($p) => [
                'id'             => $p->id,
                'name'           => $p->name,
                'category'       => $p->category,
                'price'          => $p->price,
                'tag'            => $p->tag,
                'rating'         => $p->rating,
                'is_eco_friendly'=> $p->is_eco_friendly,
                'is_active'      => $p->is_active,
                'order'          => $p->order,
            ]);

        return Inertia::render('admin/Products/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('admin/Products/Form', ['product' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'category'       => 'required|string|max:100',
            'price'          => 'required|numeric|min:0',
            'description'    => 'nullable|string',
            'image'          => 'nullable|url|max:2048',
            'is_eco_friendly'=> 'boolean',
            'tag'            => 'nullable|string|max:50',
            'rating'         => 'nullable|integer|min:1|max:5',
            'is_active'      => 'boolean',
            'order'          => 'nullable|integer|min:0',
        ]);

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Produit créé.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/Products/Form', [
            'product' => [
                'id'             => $product->id,
                'name'           => $product->name,
                'category'       => $product->category,
                'price'          => $product->price,
                'description'    => $product->description,
                'image'          => $product->image,
                'is_eco_friendly'=> $product->is_eco_friendly,
                'tag'            => $product->tag,
                'rating'         => $product->rating,
                'is_active'      => $product->is_active,
                'order'          => $product->order,
            ],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'category'       => 'required|string|max:100',
            'price'          => 'required|numeric|min:0',
            'description'    => 'nullable|string',
            'image'          => 'nullable|url|max:2048',
            'is_eco_friendly'=> 'boolean',
            'tag'            => 'nullable|string|max:50',
            'rating'         => 'nullable|integer|min:1|max:5',
            'is_active'      => 'boolean',
            'order'          => 'nullable|integer|min:0',
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Produit mis à jour.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé.');
    }
}
