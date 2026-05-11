<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function formatProduct(Product $p): array
    {
        return [
            'id'              => $p->id,
            'name'            => $p->name,
            'category'        => $p->category,
            'price'           => (float) $p->price,
            'description'     => $p->description,
            'image'           => $p->image,
            'is_eco_friendly' => $p->is_eco_friendly,
            'tag'             => $p->tag,
            'rating'          => $p->rating,
        ];
    }

    public function index()
    {
        $products = Product::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        $categories = Product::where('is_active', true)
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('marketing/Products/Index', [
            'products'   => $products,
            'categories' => $categories,
        ]);
    }

    public function show(Product $product)
    {
        abort_if(! $product->is_active, 404);

        $related = Product::where('is_active', true)
            ->where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->orderBy('order')
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return Inertia::render('marketing/Products/Details', [
            'product' => $this->formatProduct($product),
            'related' => $related,
        ]);
    }
}
