<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn($p) => [
                'id'             => $p->id,
                'name'           => $p->name,
                'category'       => $p->category,
                'price'          => (float) $p->price,
                'description'    => $p->description,
                'image'          => $p->image,
                'is_eco_friendly'=> $p->is_eco_friendly,
                'tag'            => $p->tag,
                'rating'         => $p->rating,
            ]);

        $categories = Product::where('is_active', true)
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('marketing/Products/Index', [
            'products'   => $products,
            'categories' => $categories,
        ]);
    }
}
