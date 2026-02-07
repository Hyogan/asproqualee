<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WaterHealthController extends Controller
{
    /**
     * Show the Water & Health page.
     */
    public function index()
    {
        $hero = [
            'title' => 'Eau & Santé Un Lien Vital',
            'subtitle' => '💧 Éducation & Prévention',
            'description' => "Découvrez l'importance cruciale de l'eau propre pour la santé publique et apprenez les gestes qui sauvent des vies.",
            'primaryCTA' => ['label' => 'Nos actions santé', 'href' => '/actions'],
            'secondaryCTA' => ['label' => 'Nous soutenir', 'href' => '/donate'],
            'image' => 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=1920&q=80',
            'height' => 'tall',
        ];

        $impactStats = [
            ['value' => '2.2B', 'label' => "Personnes sans accès à l'eau potable", 'icon' => 'Users'],
            ['value' => '829,000', 'label' => 'Décès annuels dus aux maladies diarrhéiques', 'icon' => 'Heart'],
            ['value' => '80%', 'label' => "Maladies évitables par l'eau propre", 'icon' => 'Shield'],
            ['value' => '297,000', 'label' => 'Enfants de moins de 5 ans meurent chaque année', 'icon' => 'AlertTriangle'],
        ];

        $diseases = [
            [
                'name' => 'Choléra',
                'risk' => 'Élevé',
                'description' => "Infection intestinale aiguë causée par la bactérie Vibrio cholerae, transmise par de l'eau contaminée.",
                'prevention' => ['Eau potable traitée', 'Hygiène des mains', 'Assainissement adéquat'],
            ],
            [
                'name' => 'Typhoïde',
                'risk' => 'Moyen',
                'description' => "Maladie bactérienne causée par Salmonella typhi, transmise par l'eau et les aliments contaminés.",
                'prevention' => ["Filtration de l'eau", 'Cuisson des aliments', 'Lavage des mains'],
            ],
            [
                'name' => 'Diarrhées',
                'risk' => 'Élevé',
                'description' => "Maladies diarrhéiques causées par divers pathogènes présents dans l'eau non potable.",
                'prevention' => ['Eau bouillie ou filtrée', 'Hygiène personnelle', 'Toilettes propres'],
            ],
            [
                'name' => 'Hépatite A',
                'risk' => 'Moyen',
                'description' => "Infection virale du foie transmise par l'eau et les aliments contaminés par des matières fécales.",
                'prevention' => ['Eau traitée', 'Hygiène alimentaire', 'Vaccination'],
            ],
        ];

        $waterQuality = [
            'indicators' => [
                ['name' => 'Clarté', 'safe' => 'Eau claire et transparente', 'unsafe' => 'Eau trouble ou colorée', 'icon' => 'Droplet'],
                ['name' => 'Odeur', 'safe' => 'Sans odeur désagréable', 'unsafe' => "Odeur d'œuf pourri ou chimique", 'icon' => 'AlertTriangle'],
                ['name' => 'Goût', 'safe' => 'Goût neutre', 'unsafe' => 'Goût métallique ou bizarre', 'icon' => 'XCircle'],
            ],
            'treatments' => [
                ['title' => 'Ébullition', 'description' => "Faire bouillir l'eau pendant 1 minute minimum", 'effectiveness' => '99.9%', 'icon' => '🔥'],
                ['title' => 'Filtration', 'description' => 'Utiliser des filtres certifiés', 'effectiveness' => '99%', 'icon' => '🔬'],
                ['title' => 'Chloration', 'description' => 'Traitement chimique par chlore', 'effectiveness' => '95%', 'icon' => '💧'],
                ['title' => 'UV/Solaire', 'description' => 'Exposition au soleil dans bouteilles claires', 'effectiveness' => '90%', 'icon' => '☀️'],
            ],
        ];

        $hygienePractices = [
            [
                'title' => 'Lavage des Mains',
                'steps' => [
                    "Mouiller les mains à l'eau courante",
                    'Appliquer du savon',
                    'Frotter pendant 20-30 secondes',
                    'Rincer abondamment',
                    'Sécher avec un linge propre',
                ],
                'when' => 'Avant de manger, après les toilettes, avant de préparer à manger',
            ],
            [
                'title' => "Gestion de l'Eau à Domicile",
                'steps' => [
                    "Stocker l'eau dans des récipients propres et couverts",
                    'Utiliser une louche propre pour puiser',
                    "Ne pas tremper les mains dans l'eau de boisson",
                    'Nettoyer régulièrement les conteneurs',
                    'Garder les récipients en hauteur',
                ],
                'when' => 'Quotidiennement',
            ],
            [
                'title' => 'Assainissement des Toilettes',
                'steps' => [
                    'Utiliser des toilettes fermées',
                    'Nettoyer régulièrement',
                    "Garder l'eau loin des latrines",
                    'Se laver les mains après usage',
                    'Évacuer correctement les eaux usées',
                ],
                'when' => 'Après chaque utilisation',
            ],
        ];

        return Inertia::render('marketing/WaterHealth/Index', [
            'hero' => $hero,
            'impactStats' => $impactStats,
            'diseases' => $diseases,
            'waterQuality' => $waterQuality,
            'hygienePractices' => $hygienePractices,
        ]);
    }
}
