<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VolunteerController extends Controller
{
    //  * Render the volunteering page
    //  */
    public function index(): Response
    {
        return Inertia::render('marketing/Engage/Volunteer', [
            'title' => 'Se porter volontaire',
        ]);
    }

}
