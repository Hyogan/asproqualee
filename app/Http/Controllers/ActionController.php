<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActionResource;
use App\Models\Action;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActionController extends Controller
{
    public function index(Request $request)
    {
        // $actions = Action::with('category', 'gallery')
        //     ->category($request->category)
        //     ->status($request->status)
        //     ->orderBy('date', 'desc')
        //     ->get();

        // $categories = Category::all();

        // // Optional stats calculation
        // $stats = [
        //     'total_actions' => Action::count(),
        //     'total_volunteers' => Action::sum('participants'),
        //     'total_people_impacted' => Action::sum('impact_value'), // or calculated field
        //     'km_rivers_cleaned' => 15, // could be dynamic
        // ];

        // return Inertia::render('ActionsPage', [
        //     'actions' => ActionResource::collection($actions),
        //     'categories' => $categories,
        //     'stats' => $stats,
        // ]);
        return Inertia::render('marketing/Actions/Index');
    }

    // public function show(Action $action)
    // {
    //     return Inertia::render('ActionDetailPage', [
    //         'action' => new ActionResource($action->load('category', 'gallery')),
    //     ]);


    // }

    // app/Http/Controllers/ActionController.php
    public function show($action)
    // public function show(Action $action)
    {
 $fakeActionsPool = [
        [
            'id' => 1,
            'title' => 'Nettoyage du Canal Mfoundi',
            'category' => [
                'id' => 1,
                'name' => 'Développement Fluvial',
                'icon' => 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
            ],
            'description' => "Action de grande envergure pour restaurer la qualité de l'eau du canal Mfoundi à Yaoundé.",
            'longDescription' => "Une mobilisation exceptionnelle de plus de 80 bénévoles pour nettoyer le canal Mfoundi. Collecte de plusieurs tonnes de déchets, sensibilisation des riverains, installation de points de collecte.",
            'image' => 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
            'date' => now()->addDays(rand(1, 30))->format('d F Y'),
            'location' => 'Yaoundé, Cameroun',
            'participants' => 85,
            'impact' => [
                'label' => 'Distance nettoyée',
                'value' => '2.5 km',
            ],
            'gallery' => [
                'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80',
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
                'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
            ],
            'status' => 'completed',
        ],
        [
            'id' => 2,
            'title' => 'Journée Mondiale des Toilettes 2024',
            'category' => [
                'id' => 2,
                'name' => 'Assainissement',
                'icon' => 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
            ],
            'description' => "Campagne de sensibilisation à l'importance de l'assainissement et de l'hygiène.",
            'longDescription' => "Ateliers éducatifs dans 5 écoles, distribution de kits d'hygiène et sensibilisation de plus de 500 personnes à l'importance de l'assainissement.",
            'image' => 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
            'date' => now()->addDays(rand(1, 30))->format('d F Y'),
            'location' => 'Plusieurs quartiers',
            'participants' => 45,
            'impact' => [
                'label' => 'Personnes sensibilisées',
                'value' => '500+',
            ],
            'gallery' => [
                'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
            ],
            'status' => 'completed',
        ],
        [
            'id' => 3,
            'title' => "Distribution de Kits d'Hygiène",
            'category' => [
                'id' => 2,
                'name' => 'Assainissement',
                'icon' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
            ],
            'description' => "Distribution de matériel d'hygiène essentiel aux familles dans le besoin.",
            'longDescription' => "Opération solidaire de distribution de kits d'hygiène comprenant savon, désinfectant, récipients pour eau potable et matériel éducatif sur les bonnes pratiques d'hygiène.",
            'image' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
            'date' => now()->addDays(rand(1, 30))->format('d F Y'),
            'location' => 'Quartiers défavorisés',
            'participants' => 30,
            'impact' => [
                'label' => 'Kits distribués',
                'value' => '150',
            ],
            'gallery' => [
                'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
            ],
            'status' => 'completed',
        ],
    ];

    // Randomly pick one as the main action
    $fakeAction = $fakeActionsPool[array_rand($fakeActionsPool)];

    // Pick 2 more different actions for relatedActions
    $relatedActions = collect($fakeActionsPool)
        ->where('id', '!=', $fakeAction['id'])
        ->shuffle()
        ->take(2)
        ->values()
        ->all();

    return Inertia::render('marketing/Actions/Details', [
        'action' => $fakeAction,
        'relatedActions' => $relatedActions,
    ]);

        // return Inertia::render('marketing/Actions/Details', [
        //     'action' => new ActionResource($action),
        //     // optional: related actions for suggestions
        //     'relatedActions' => ActionResource::collection(
        //         Action::where('category_id', $action->category_id)
        //             ->where('id', '!=', $action->id)
        //             ->take(3)
        //             ->get()
        //     ),
        // ]);
    }
}
