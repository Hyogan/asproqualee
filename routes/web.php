<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OpenContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'index'])->name('marketing.index');
Route::get('/contact-us',[OpenContactController::class, 'index'])->name('marketing.contactUs');
Route::get('/actions', [ActionController::class, 'index'])->name('actions.index');
Route::get('/actions/{action}', [ActionController::class, 'show'])->name('actions.show');


Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
