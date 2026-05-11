import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    Filter,
    MapPin,
    Sprout,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Action {
    id: number;
    title: string;
    category: { id: number; name: string; icon: string | null };
    description: string;
    longDescription: string | null;
    image: string | null;
    date: string;
    location: string | null;
    participants: number;
    impact: { label: string | null; value: string | null };
    gallery: string[];
    status: 'completed' | 'ongoing' | 'upcoming';
}

interface Stats {
    total_actions: number;
    total_volunteers: number;
    total_impacted: number;
    km_cleaned: number;
}

interface Props extends Record<string, unknown> {
    actions: Action[];
    categories: Category[];
    stats: Stats;
    filters: { status: string; category: string };
}

const STATUS_COLORS = {
    completed: 'bg-green-500/10 text-green-600 border-green-500/20',
    ongoing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    upcoming: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
};

const STATUS_LABELS = {
    completed: 'Terminée',
    ongoing: 'En cours',
    upcoming: 'À venir',
};

function ActionCard({ action }: { action: Action }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
            <div className="relative h-56 overflow-hidden">
                {action.image ? (
                    <img
                        src={action.image}
                        alt={action.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                        <Sprout className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div
                    className={cn(
                        'absolute top-4 right-4 rounded-full border px-3 py-1.5 text-sm font-semibold backdrop-blur-sm',
                        STATUS_COLORS[action.status],
                    )}
                >
                    {STATUS_LABELS[action.status]}
                </div>

                <div className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">
                    {action.category.name}
                </div>
            </div>

            <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {action.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {action.description}
                </p>

                <div className="mb-4 grid grid-cols-2 gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        {action.date}
                    </div>
                    {action.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            {action.location}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                    {action.impact.value && (
                        <div>
                            <div className="text-sm text-muted-foreground">
                                {action.impact.label}
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {action.impact.value}
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="text-sm text-muted-foreground">
                            Bénévoles
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                            {action.participants}
                        </div>
                    </div>
                </div>

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
    const { actions, categories, stats, filters } = usePage<Props>().props;

    const [selectedCategory, setSelectedCategory] = useState<string>(
        filters.category || 'all',
    );
    const [selectedStatus, setSelectedStatus] = useState<string>(
        filters.status || 'all',
    );

    const applyFilters = (category: string, status: string) => {
        router.get(
            '/actions',
            {
                ...(category && category !== 'all' ? { category } : {}),
                ...(status && status !== 'all' ? { status } : {}),
            },
            { preserveState: true, replace: true },
        );
    };

    const handleCategoryChange = (id: string) => {
        setSelectedCategory(id);
        applyFilters(id, selectedStatus);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        applyFilters(selectedCategory, status);
    };

    const allCategories = [{ id: 'all', name: 'Toutes' }, ...categories.map(c => ({ id: String(c.id), name: c.name }))];

    return (
        <MainLayout
            title="AsproQualee | Nos actions"
            description="Découvrez les actions que nous menons au quotidien afin de préserver l'environnement"
        >
            <main className="min-h-screen">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80"
                    title={
                        <>
                            Nos Actions sur le Terrain
                            <br />
                            <span className="text-[#03b6ed]">
                                Impact Concret 🌊
                            </span>
                        </>
                    }
                    subtitle="Découvrez nos interventions pour la protection de l'eau, l'assainissement et la sensibilisation environnementale."
                />

                {/* Stats */}
                <section className="border-b border-border bg-gradient-to-b from-background to-secondary/10 py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
                            {[
                                { label: 'Actions menées', value: stats.total_actions, suffix: '' },
                                { label: 'Bénévoles mobilisés', value: stats.total_volunteers, suffix: '+' },
                                { label: 'Personnes impactées', value: stats.total_impacted, suffix: '+' },
                                { label: 'Km de rivières nettoyés', value: stats.km_cleaned, suffix: '' },
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
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Catégorie :
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {allCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryChange(category.id)}
                                            className={cn(
                                                'flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all',
                                                selectedCategory === category.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                                            )}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Statut :
                                    </span>
                                </div>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => handleStatusChange(e.target.value)}
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

                {/* Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {actions.length === 0 ? (
                            <div className="py-20 text-center">
                                <Sprout className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                <p className="text-lg text-muted-foreground">
                                    Aucune action trouvée pour ces critères.
                                </p>
                            </div>
                        ) : (
                            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {actions.map((action) => (
                                    <ActionCard key={action.id} action={action} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
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
                                    href="/get-involved"
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
