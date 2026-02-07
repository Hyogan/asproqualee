<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MissionController extends Controller
{
    /**
     * Show the About page for our mission.
     */
    public function about()
    {
        // Example: could fetch from database if you have a 'missions' table
        $content = [
            'hero' => [
                'title' => 'Notre Mission',
                'subtitle' => 'Depuis notre création, nous agissons pour préserver l’eau et améliorer l’accès à l’assainissement dans les communautés locales.',
                'image' => 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80',
            ],
            'overview' => [
                'paragraphs' => [
                    "AsproQualee est une organisation dédiée à la protection des ressources en eau, à l'assainissement et à l'éducation environnementale. Nous croyons que chaque action, qu'elle soit petite ou grande, contribue à un impact durable sur les communautés et l'environnement.",
                    "Depuis notre création, nous avons mobilisé des centaines de bénévoles et partenaires pour restaurer des rivières, améliorer les infrastructures sanitaires et sensibiliser les populations aux pratiques durables. Notre approche combine intervention terrain, formation et suivi scientifique afin de garantir que nos actions soient mesurables et durables.",
                    "Nous collaborons avec les écoles, les collectivités locales et les entreprises pour créer des projets adaptés aux besoins locaux, avec un objectif clair : protéger l'eau et la vie qu'elle soutient.",
                ],
            ],
            'focusAreas' => [
                [
                    'title' => 'Protection de l’eau',
                    'description' => 'Nous surveillons et restaurons les cours d’eau et les sources d’eau potable pour garantir un accès à l’eau saine aux communautés locales.',
                    'image' => 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=600&q=80',
                ],
                [
                    'title' => 'Assainissement',
                    'description' => 'Nous construisons et entretenons des infrastructures sanitaires, distribuons des kits d’hygiène et organisons des campagnes éducatives pour réduire les maladies liées à l’eau.',
                    'image' => 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
                ],
                [
                    'title' => 'Sensibilisation & Éducation',
                    'description' => 'Nous organisons des ateliers et des formations pour promouvoir les pratiques durables et responsables vis-à-vis de l’eau et de l’environnement.',
                    'image' => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
                ],
            ],
        ];

        return Inertia::render('marketing/Mission/About', [
            'content' => $content,
        ]);
    }

    /**
     * Show the Values page for our mission.
     */
   /**
     * Show the Values page for our mission.
     */
    public function value()
    {
        $values = [
            [
                'title' => 'Intégrité',
                'description' => 'Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos actions.',
                'image' => 'https://images.unsplash.com/photo-1581093588401-72d95f98cfdb?w=600&q=80',
            ],
            [
                'title' => 'Durabilité',
                'description' => 'Nous privilégions des solutions à long terme qui préservent l’environnement et soutiennent les communautés sur la durée.',
                'image' => 'https://images.unsplash.com/photo-1581093458361-1a0b23d7eecf?w=600&q=80',
            ],
            [
                'title' => 'Collaboration',
                'description' => 'Nous croyons au travail d’équipe, aux partenariats locaux et à l’engagement communautaire.',
                'image' => 'https://images.unsplash.com/photo-1562003383-3a9f9d8c1a36?w=600&q=80',
            ],
            [
                'title' => 'Innovation',
                'description' => 'Nous cherchons constamment des méthodes nouvelles et efficaces pour résoudre les problèmes environnementaux.',
                'image' => 'https://images.unsplash.com/photo-1581091012184-dbb5c8e1d295?w=600&q=80',
            ],
            [
                'title' => 'Impact Mesurable',
                'description' => 'Chaque projet est suivi et évalué pour garantir des résultats tangibles et améliorer nos pratiques.',
                'image' => 'https://images.unsplash.com/photo-1581091210562-4c44bfbfa32b?w=600&q=80',
            ],
        ];

        return Inertia::render('marketing/Mission/Value', [
            'values' => $values,
        ]);
    }
}
