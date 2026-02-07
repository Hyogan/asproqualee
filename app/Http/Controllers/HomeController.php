<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
      public function index()
    {
        return Inertia::render('welcome', [
            'stats' => $this->stats(),
            'featuredProjects' => $this->featuredProjects(),
            'recentNews' => $this->recentNews(),
             'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    /**
     * Impact statistics displayed on homepage
     */
    protected function stats(): array
    {
        return [
            'beneficiaries'     => '25 000',
            'projects'          => '48',
            'volunteers'        => '320',
            'litersDistributed' => '12M',
        ];
    }

    /**
     * Featured projects (can be replaced by DB later)
     */
    protected function featuredProjects(): array
    {
        return [
            [
                'id'          => 1,
                'title'       => 'Accès à l’eau potable à Biyem-Assi',
                'description' => 'Installation de points d’eau potable pour améliorer la santé et réduire les maladies hydriques.',
                'image'       => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
                'location'    => 'Yaoundé, Cameroun',
                'impact'      => '2 500 bénéficiaires',
                'slug'        => 'acces-eau-potable-biyem-assi',
            ],
            [
                'id'          => 2,
                'title'       => 'Programme Ma Gourde Propre',
                'description' => 'Sensibilisation des enfants à l’hygiène et à l’entretien des gourdes d’eau.',
                'image'       => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
                'location'    => 'Écoles primaires',
                'impact'      => '1 200 enfants sensibilisés',
                'slug'        => 'ma-gourde-propre',
            ],
            [
                'id'          => 3,
                'title'       => 'Nettoyage et restauration des cours d’eau',
                'description' => 'Actions communautaires pour restaurer les berges et préserver les écosystèmes aquatiques.',
                'image'       => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
                'location'    => 'Région Centre',
                'impact'      => '15 km de berges restaurées',
                'slug'        => 'restauration-cours-eau',
            ],
        ];
    }

    /**
     * Latest news and publications
     */
    protected function recentNews(): array
    {
        return [
            [
                'id'       => 1,
                'title'    => 'Journée Mondiale des Toilettes 2025',
                'excerpt'  => 'Sensibilisation à l’importance de l’hygiène et de l’assainissement pour la santé publique.',
                'image'    => '/images/news/world-toilet-day.jpg',
                'date'     => '2025-11-19',
                'category' => 'Sensibilisation',
                'slug'     => 'journee-mondiale-des-toilettes-2025',
            ],
            [
                'id'       => 2,
                'title'    => 'Collecte communautaire des déchets',
                'excerpt'  => 'Mobilisation des habitants pour un environnement plus propre et plus sain.',
                'image'    => '/images/news/waste-collection.jpg',
                'date'     => '2025-10-04',
                'category' => 'Environnement',
                'slug'     => 'collecte-communautaire-dechets',
            ],
            [
                'id'       => 3,
                'title'    => 'Atelier éducatif : Eau et Santé',
                'excerpt'  => 'Formation des jeunes sur les bonnes pratiques d’hygiène et la prévention des maladies hydriques.',
                'image'    => '/images/news/water-health-workshop.jpg',
                'date'     => '2025-09-18',
                'category' => 'Éducation',
                'slug'     => 'atelier-eau-et-sante',
            ],
        ];
    }
}
