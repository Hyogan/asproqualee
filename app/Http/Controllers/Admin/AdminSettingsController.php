<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingsController extends Controller
{
    public function index()
    {
        abort_unless(auth()->user()->isAdmin(), 403);

        return Inertia::render('admin/Settings/Index', [
            'settings' => $this->currentSettings(),
        ]);
    }

    public function update(Request $request)
    {
        abort_unless(auth()->user()->isAdmin(), 403);

        $request->validate([
            'org_name'         => 'required|string|max:255',
            'tagline'          => 'nullable|string|max:255',
            'description'      => 'nullable|string|max:500',
            'address'          => 'nullable|string|max:255',
            'phone'            => 'nullable|string|max:50',
            'email'            => 'nullable|email|max:255',
            'years_experience' => 'nullable|integer|min:0|max:200',
            'facebook'         => 'nullable|url|max:500',
            'twitter'          => 'nullable|url|max:500',
            'instagram'        => 'nullable|url|max:500',
            'linkedin'         => 'nullable|url|max:500',
            'youtube'          => 'nullable|url|max:500',
            'site_url'         => 'nullable|url|max:500',
            'og_image'         => 'nullable|string|max:500',
            'twitter_handle'   => 'nullable|string|max:50',
        ]);

        SiteContent::set('settings.general', [
            'org_name'         => $request->org_name,
            'tagline'          => $request->tagline,
            'description'      => $request->description,
            'address'          => $request->address,
            'phone'            => $request->phone,
            'email'            => $request->email,
            'years_experience' => $request->years_experience,
        ]);

        SiteContent::set('settings.social', [
            'facebook'  => $request->facebook,
            'twitter'   => $request->twitter,
            'instagram' => $request->instagram,
            'linkedin'  => $request->linkedin,
            'youtube'   => $request->youtube,
        ]);

        SiteContent::set('settings.seo', [
            'site_url'       => $request->site_url,
            'og_image'       => $request->og_image,
            'twitter_handle' => $request->twitter_handle,
        ]);

        return back()->with('success', 'Paramètres mis à jour.');
    }

    public function currentSettings(): array
    {
        $general = SiteContent::get('settings.general', []) ?: [];
        $social  = SiteContent::get('settings.social',  []) ?: [];
        $seo     = SiteContent::get('settings.seo',     []) ?: [];

        return [
            'org_name'         => $general['org_name']         ?? 'AsproQualee',
            'tagline'          => $general['tagline']          ?? "Association pour l'Eau, l'Assainissement et l'Environnement",
            'description'      => $general['description']      ?? "Nous œuvrons pour l'accès à l'eau potable, l'assainissement, l'hygiène et la protection de l'environnement dans nos communautés.",
            'address'          => $general['address']          ?? '',
            'phone'            => $general['phone']            ?? '',
            'email'            => $general['email']            ?? '',
            'years_experience' => $general['years_experience'] ?? 15,
            'facebook'         => $social['facebook']          ?? '',
            'twitter'          => $social['twitter']           ?? '',
            'instagram'        => $social['instagram']         ?? '',
            'linkedin'         => $social['linkedin']          ?? '',
            'youtube'          => $social['youtube']           ?? '',
            'site_url'         => $seo['site_url']             ?? config('app.url'),
            'og_image'         => $seo['og_image']             ?? '/images/og-default.jpg',
            'twitter_handle'   => $seo['twitter_handle']       ?? '@asproqualee',
        ];
    }
}
