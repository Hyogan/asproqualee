import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Calendar,
    Droplet,
    Filter,
    MapPin,
    Sprout,
    Users,
    Waves,
} from 'lucide-react';
import { useState } from 'react';

interface Action {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    date: string;
    location: string;
    participants: number;
    impact: {
        label: string;
        value: string;
    };
    gallery: string[];
    status: 'completed' | 'ongoing' | 'upcoming';
}

const actions: Action[] = [
    {
        id: '1',
        title: 'Nettoyage du Canal Mfoundi',
        category: 'Développement Fluvial',
        description:
            "Action de grande envergure pour restaurer la qualité de l'eau du canal Mfoundi à Yaoundé.",
        longDescription:
            'Une mobilisation exceptionnelle de plus de 80 bénévoles pour nettoyer le canal Mfoundi. Nous avons collecté plusieurs tonnes de déchets plastiques et organiques, sensibilisé les riverains et installé des points de collecte de déchets.',
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
        date: '15 Décembre 2024',
        location: 'Yaoundé, Cameroun',
        participants: 85,
        impact: {
            label: 'Distance nettoyée',
            value: '2.5 km',
        },
        gallery: [
            'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80',
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        ],
        status: 'completed',
    },
    {
        id: '2',
        title: 'Journée Mondiale des Toilettes 2024',
        category: 'Assainissement',
        description:
            "Campagne de sensibilisation à l'importance de l'assainissement et de l'hygiène.",
        longDescription:
            "À l'occasion de la Journée Mondiale des Toilettes, nous avons organisé des ateliers éducatifs dans 5 écoles, distribué des kits d'hygiène et sensibilisé plus de 500 personnes à l'importance de l'assainissement.",
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
        date: '19 Novembre 2024',
        location: 'Plusieurs quartiers',
        participants: 45,
        impact: {
            label: 'Personnes sensibilisées',
            value: '500+',
        },
        gallery: [
            'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
        ],
        status: 'completed',
    },
    {
        id: '3',
        title: "Distribution de Kits d'Hygiène",
        category: 'Assainissement',
        description:
            "Distribution de matériel d'hygiène essentiel aux familles dans le besoin.",
        longDescription:
            "Opération solidaire de distribution de kits d'hygiène comprenant savon, désinfectant, récipients pour eau potable et matériel éducatif sur les bonnes pratiques d'hygiène.",
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        date: '28 Novembre 2024',
        location: 'Quartiers défavorisés',
        participants: 30,
        impact: {
            label: 'Kits distribués',
            value: '150',
        },
        gallery: [
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        ],
        status: 'completed',
    },
    {
        id: '4',
        title: 'Atelier de Sensibilisation Scolaire',
        category: 'Sensibilisation',
        description:
            "Programme d'éducation environnementale dans les écoles primaires.",
        longDescription:
            "Série d'ateliers interactifs dans les écoles pour sensibiliser les enfants à l'importance de protéger l'eau et l'environnement. Activités ludiques, projections et engagement des élèves.",
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
        date: '10 Janvier 2025',
        location: 'Écoles primaires',
        participants: 20,
        impact: {
            label: 'Élèves formés',
            value: '300+',
        },
        gallery: [],
        status: 'ongoing',
    },
    {
        id: '5',
        title: "Analyse de Qualité d'Eau",
        category: "Protection de l'Eau",
        description:
            "Campagne d'analyse et de monitoring de la qualité de l'eau dans les sources communautaires.",
        longDescription:
            "Programme de tests réguliers de la qualité de l'eau dans différents points d'approvisionnement pour identifier les risques et proposer des solutions de traitement adaptées.",
        image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=800&q=80',
        date: '25 Janvier 2025',
        location: 'Plusieurs communautés',
        participants: 15,
        impact: {
            label: 'Sources analysées',
            value: '20',
        },
        gallery: [],
        status: 'upcoming',
    },
];

const categories = [
    { id: 'all', label: 'Toutes', icon: <Sprout className="h-4 w-4" /> },
    {
        id: "Protection de l'Eau",
        label: "Protection de l'Eau",
        icon: <Droplet className="h-4 w-4" />,
    },
    {
        id: 'Assainissement',
        label: 'Assainissement',
        icon: <Users className="h-4 w-4" />,
    },
    {
        id: 'Développement Fluvial',
        label: 'Développement Fluvial',
        icon: <Waves className="h-4 w-4" />,
    },
    {
        id: 'Sensibilisation',
        label: 'Sensibilisation',
        icon: <Sprout className="h-4 w-4" />,
    },
];

function ActionCard({ action }: { action: Action }) {
    const statusColors = {
        completed: 'bg-green-500/10 text-green-600 border-green-500/20',
        ongoing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
        upcoming: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    };

    const statusLabels = {
        completed: 'Terminée',
        ongoing: 'En cours',
        upcoming: 'À venir',
    };

    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={action.image}
                    alt={action.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Status Badge */}
                <div
                    className={cn(
                        'absolute top-4 right-4 rounded-full border px-3 py-1.5 text-sm font-semibold backdrop-blur-sm',
                        statusColors[action.status],
                    )}
                >
                    {statusLabels[action.status]}
                </div>

                {/* Category */}
                <div className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">
                    {action.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {action.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {action.description}
                </p>

                {/* Meta Info */}
                <div className="mb-4 grid grid-cols-2 gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        {action.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {action.location}
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <div className="text-sm text-muted-foreground">
                            {action.impact.label}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                            {action.impact.value}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">
                            Bénévoles
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                            {action.participants}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <a
                    href={`/actions/${action.id}`}
                    className="inline-flex items-center font-semibold text-primary transition-all group-hover:gap-2"
                >
                    Voir les détails
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </article>
    );
}

export default function ActionsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState<
        'all' | 'completed' | 'ongoing' | 'upcoming'
    >('all');

    const filteredActions = actions.filter((action) => {
        const matchesCategory =
            selectedCategory === 'all' || action.category === selectedCategory;
        const matchesStatus =
            selectedStatus === 'all' || action.status === selectedStatus;
        return matchesCategory && matchesStatus;
    });

    return (
        <MainLayout
            title="AsproQualee | Nos actions"
            description="Découvrez les actions  que nous menons au quotidien afin de préserver l'environnement"
        >
            <main className="min-h-screen">
                {/* Hero */}
                {/* <Hero
                title="Nos Actions sur le Terrain"
                subtitle="🌊 Impact Concret"
                description="Découvrez nos interventions pour la protection de l'eau, l'assainissement et la sensibilisation environnementale."
                primaryCTA={{
                    label: 'Rejoindre une action',
                    href: '/get-involved',
                }}
                secondaryCTA={{
                    label: 'Soutenir nos actions',
                    href: '/donate',
                }}
                image="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80"
                height="tall"
            /> */}

                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80"
                    title={
                        <>
                            Nos Actions sur le Terrain
                            <br />
                            <span className="text-[#5CBDB9]">
                                Impact Concret 🌊
                            </span>
                        </>
                    }
                    subtitle="Découvrez nos interventions pour la protection de l'eau, l'assainissement et la sensibilisation environnementale."
                />

                {/* Stats Overview */}
                <section className="border-b border-border bg-gradient-to-b from-background to-secondary/10 py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
                            {[
                                {
                                    label: 'Actions menées',
                                    value: '45',
                                    suffix: '',
                                },
                                {
                                    label: 'Bénévoles mobilisés',
                                    value: '120',
                                    suffix: '+',
                                },
                                {
                                    label: 'Personnes impactées',
                                    value: '1250',
                                    suffix: '+',
                                },
                                {
                                    label: 'Km de rivières nettoyés',
                                    value: '15',
                                    suffix: '',
                                },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="mb-1 text-3xl font-bold text-primary md:text-4xl">
                                        {stat.value}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="top-20 z-40 border-b border-border bg-background py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            {/* Category Filter */}
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Catégorie :
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() =>
                                                setSelectedCategory(category.id)
                                            }
                                            className={cn(
                                                'flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all',
                                                selectedCategory === category.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                                            )}
                                        >
                                            {category.icon}
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Statut :
                                    </span>
                                </div>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        setSelectedStatus(e.target.value as any)
                                    }
                                    className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                >
                                    <option value="all">Tous</option>
                                    <option value="completed">Terminées</option>
                                    <option value="ongoing">En cours</option>
                                    <option value="upcoming">À venir</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Actions Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {filteredActions.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-lg text-muted-foreground">
                                    Aucune action trouvée pour ces critères.
                                </p>
                            </div>
                        ) : (
                            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredActions.map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-primary to-primary-deep py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center text-white">
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                                Participez à Nos Prochaines Actions
                            </h2>
                            <p className="mb-8 text-xl text-white/90">
                                Rejoignez notre équipe de bénévoles et
                                contribuez directement à la protection de l'eau
                                et de l'environnement.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <a
                                    href="/get-involved/volunteer"
                                    className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90 hover:shadow-xl"
                                >
                                    Devenir bénévole
                                </a>
                                <a
                                    href="/contact"
                                    className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
                                >
                                    Nous contacter
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
