<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPagesController extends Controller
{
    /* ── About ─────────────────────────────────────────────────── */

    public function about()
    {
        return Inertia::render('admin/Pages/About', [
            'content' => SiteContent::get('page.about', $this->aboutDefaults()),
        ]);
    }

    public function updateAbout(Request $request)
    {
        $request->validate([
            'subtitle'    => 'required|string|max:500',
            'intro'       => 'required|string',
            'focus_areas' => 'array',
            'focus_areas.*.title'       => 'required|string|max:255',
            'focus_areas.*.description' => 'required|string',
            'focus_areas.*.image'       => 'nullable|url|max:500',
            'cta_text'    => 'required|string|max:300',
        ]);

        SiteContent::set('page.about', $request->all());

        return back()->with('success', 'Page "Mission" mise à jour.');
    }

    /* ── Values ─────────────────────────────────────────────────── */

    public function values()
    {
        return Inertia::render('admin/Pages/Values', [
            'content' => SiteContent::get('page.values', $this->valuesDefaults()),
        ]);
    }

    public function updateValues(Request $request)
    {
        $request->validate([
            'vision_title'       => 'required|string|max:255',
            'vision_description' => 'required|string',
            'vision_image'       => 'nullable|url|max:500',
            'values'             => 'array',
            'values.*.title'       => 'required|string|max:255',
            'values.*.description' => 'required|string',
            'values.*.image'       => 'nullable|url|max:500',
        ]);

        SiteContent::set('page.values', $request->all());

        return back()->with('success', 'Page "Vision & Valeurs" mise à jour.');
    }

    /* ── Defaults ────────────────────────────────────────────────── */

    private function aboutDefaults(): array
    {
        return [
            'subtitle'    => "Depuis notre création, nous agissons pour préserver l'eau et améliorer l'accès à l'assainissement dans les communautés locales.",
            'intro'       => "AsproQualee est une organisation dédiée à la protection des ressources en eau, à l'assainissement et à l'éducation environnementale. Nous croyons que chaque action, qu'elle soit petite ou grande, contribue à un impact durable sur les communautés et l'environnement.\n\nDepuis notre création, nous avons mobilisé des centaines de bénévoles et partenaires pour restaurer des rivières, améliorer les infrastructures sanitaires et sensibiliser les populations aux pratiques durables.\n\nNous collaborons avec les écoles, les collectivités locales et les entreprises pour créer des projets adaptés aux besoins locaux.",
            'focus_areas' => [
                ['title' => "Protection de l'eau",     'description' => "Nous surveillons et restaurons les cours d'eau et les sources d'eau potable.", 'image' => 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=600&q=80'],
                ['title' => 'Assainissement',           'description' => "Nous construisons et entretenons des infrastructures sanitaires et distribuons des kits d'hygiène.", 'image' => 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80'],
                ['title' => 'Sensibilisation & Éducation', 'description' => "Nous organisons des ateliers et des formations pour les enfants, les familles et les communautés.", 'image' => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80'],
            ],
            'cta_text'    => "Participez à nos actions sur le terrain et contribuez directement à un impact durable dans les communautés.",
        ];
    }

    private function valuesDefaults(): array
    {
        return [
            'vision_title'       => 'Notre Vision',
            'vision_description' => "Nous aspirons à un monde où chaque communauté a accès à une eau propre, des infrastructures sanitaires sûres et une sensibilisation complète à l'environnement. Notre vision est de créer des impacts durables et mesurables qui améliorent la qualité de vie tout en protégeant l'écosystème pour les générations futures.",
            'vision_image'       => 'https://images.unsplash.com/photo-1601758123927-2d0c447ed1a3?w=800&q=80',
            'values' => [
                ['title' => 'Intégrité',        'description' => "Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos actions.",                                                    'image' => 'https://images.unsplash.com/photo-1581093588401-72d95f98cfdb?w=600&q=80'],
                ['title' => 'Durabilité',        'description' => "Nous privilégions des solutions à long terme qui préservent l'environnement et soutiennent les communautés.",                              'image' => 'https://images.unsplash.com/photo-1581093458361-1a0b23d7eecf?w=600&q=80'],
                ['title' => 'Collaboration',     'description' => "Nous croyons au travail d'équipe, aux partenariats locaux et à l'engagement communautaire.",                                              'image' => 'https://images.unsplash.com/photo-1562003383-3a9f9d8c1a36?w=600&q=80'],
                ['title' => 'Innovation',        'description' => "Nous cherchons constamment des méthodes nouvelles et efficaces pour résoudre les problèmes environnementaux.",                             'image' => 'https://images.unsplash.com/photo-1581091012184-dbb5c8e1d295?w=600&q=80'],
                ['title' => 'Impact Mesurable',  'description' => "Chaque projet est suivi et évalué pour garantir des résultats tangibles et améliorer nos pratiques.",                                     'image' => 'https://images.unsplash.com/photo-1581091210562-4c44bfbfa32b?w=600&q=80'],
            ],
        ];
    }
}
