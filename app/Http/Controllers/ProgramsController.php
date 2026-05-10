<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProgramsController extends Controller
{
    public function index()
    {
        return Inertia::render('marketing/Programs/Index');
    }
}
