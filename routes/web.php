<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminContactController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminDonationController;
use App\Http\Controllers\Admin\AdminTaxonomyController;
use App\Http\Controllers\Admin\AdminVolunteerController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\DonateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\OpenContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\WaterHealthController;
use Illuminate\Support\Facades\Route;

// ─── Public marketing routes ─────────────────────────────────────────────────

Route::get('/', [HomeController::class, 'index'])->name('marketing.index');

// Contact – GET kept at /contact-us for Wayfinder compatibility; /contact is
// the URL the whole frontend links to, so both resolve to the same controller.
Route::get('/contact-us', [OpenContactController::class, 'index'])->name('marketing.contactUs');
Route::get('/contact', [OpenContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [OpenContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

// Actions / campaigns
Route::get('/actions', [ActionController::class, 'index'])->name('actions.index');
Route::get('/actions/{action}', [ActionController::class, 'show'])->name('actions.show');

// Mission & education
Route::get('/mission/about', [MissionController::class, 'about'])->name('mission.about');
Route::get('/mission/values', [MissionController::class, 'value'])->name('mission.value');
Route::get('/water-health', [WaterHealthController::class, 'index'])->name('waterHealth.index');

// Engagement
Route::get('/get-involved', [VolunteerController::class, 'index'])->name('volunteer.index');
Route::post('/volunteer/apply', [VolunteerController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('volunteer.store');

Route::get('/donate', [DonateController::class, 'create'])->name('donate.create');
Route::post('/donate/confirm', [DonateController::class, 'store'])
    ->middleware('throttle:3,1')
    ->name('donate.store');
Route::get('/donate/merci', [DonateController::class, 'thankYou'])->name('donation.thank-you');

// Blog – public read
Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
Route::get('/blog/post/{blogPost:slug}', [BlogPostController::class, 'show'])->name('blog.post.details');

// Blog – write routes protected by auth
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/blog', [BlogPostController::class, 'store'])->name('blog.store');
    Route::put('/blog/{blogPost}', [BlogPostController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{blogPost}', [BlogPostController::class, 'destroy'])->name('blog.destroy');
});

// Products / programs / projects
Route::get('/produits', [ProductController::class, 'index'])->name('products.index');
Route::get('/programs', [ProgramsController::class, 'index'])->name('programs.index');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');

// ─── Authenticated area ───────────────────────────────────────────────────────

Route::get('dashboard', function () {
    return \Inertia\Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ─── Admin panel ──────────────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/donations', [AdminDonationController::class, 'index'])->name('donations.index');
    Route::patch('/donations/{donation}/status', [AdminDonationController::class, 'updateStatus'])->name('donations.status');

    Route::get('/volunteers', [AdminVolunteerController::class, 'index'])->name('volunteers.index');
    Route::patch('/volunteers/{volunteer}/status', [AdminVolunteerController::class, 'updateStatus'])->name('volunteers.status');

    Route::get('/messages', [AdminContactController::class, 'index'])->name('messages.index');
    Route::patch('/messages/{contactMessage}/status', [AdminContactController::class, 'updateStatus'])->name('messages.status');

    Route::get('/blog', [AdminBlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [AdminBlogController::class, 'create'])->name('blog.create');
    Route::post('/blog', [AdminBlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{blogPost}/edit', [AdminBlogController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/{blogPost}', [AdminBlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{blogPost}', [AdminBlogController::class, 'destroy'])->name('blog.destroy');

    // Taxonomy
    Route::get('/categories', [AdminTaxonomyController::class, 'categories'])->name('categories.index');
    Route::post('/categories', [AdminTaxonomyController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [AdminTaxonomyController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [AdminTaxonomyController::class, 'destroyCategory'])->name('categories.destroy');

    Route::get('/tags', [AdminTaxonomyController::class, 'tags'])->name('tags.index');
    Route::post('/tags', [AdminTaxonomyController::class, 'storeTag'])->name('tags.store');
    Route::put('/tags/{tag}', [AdminTaxonomyController::class, 'updateTag'])->name('tags.update');
    Route::delete('/tags/{tag}', [AdminTaxonomyController::class, 'destroyTag'])->name('tags.destroy');
});

require __DIR__ . '/settings.php';
