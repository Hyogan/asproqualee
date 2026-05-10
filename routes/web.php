<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\DonateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\OpenContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\WaterHealthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('marketing.index');
Route::get('/contact-us', [OpenContactController::class, 'index'])->name('marketing.contactUs');
Route::get('/actions', [ActionController::class, 'index'])->name('actions.index');
Route::get('/actions/{action}', [ActionController::class, 'show'])->name('actions.show');

Route::get('/mission/about', [MissionController::class, 'about'])->name('mission.about');
Route::get('/mission/values', [MissionController::class, 'value'])->name('mission.value');
Route::get('/water-health', [WaterHealthController::class, 'index'])->name('waterHealth.index');

Route::get('/get-involved', [VolunteerController::class, 'index'])->name('volunteer.index');
Route::get('/donate', [DonateController::class, 'create'])->name('donate.create');
Route::post('/donate/confirm', [DonateController::class, 'store'])->name('donate.store');
Route::get('/donate/merci', fn() => Inertia::render('marketing/Engage/Donate'))->name('donation.thank-you');

Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
Route::get('/blog/post/{blogPost:slug}', [BlogPostController::class, 'show'])->name('blog.post.details');

Route::get('/produits', [ProductController::class, 'index'])->name('products.index');
Route::get('/projects', fn() => Inertia::render('marketing/Projects/Index'))->name('projects.index');
Route::get('/programs', [ProgramsController::class, 'index'])->name('programs.index');



Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/settings.php';
