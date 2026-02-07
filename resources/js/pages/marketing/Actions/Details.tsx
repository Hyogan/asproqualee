import {
    ArrowRight,
    Calendar,
    MapPin,
    Users,
    Activity,
    Info,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';

interface Action {
    id: string;
    title: string;
    category: { name: string };
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

interface ActionDetailPageProps {
    action: Action;
    relatedActions: Action[];
}

export default function ActionDetailPage({
    action,
    relatedActions,
}: ActionDetailPageProps) {
    const statusColors = {
        completed: 'bg-green-100 text-green-700',
        ongoing: 'bg-blue-100 text-blue-700',
        upcoming: 'bg-orange-100 text-orange-700',
    };

    return (
        <MainLayout
            title={`AsproQualee | ${action.title}`}
            description={action.description}
        >
            <main className="min-h-screen">
                {/* Hero / Cover */}
                <section className="relative h-[28rem] md:h-[32rem]">
                    <img
                        src={action.image}
                        alt={action.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8">
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                            {action.title}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span
                                className={cn(
                                    'rounded-full px-3 py-1 text-sm font-semibold',
                                    statusColors[action.status],
                                )}
                            >
                                {action.status === 'completed'
                                    ? 'Terminée'
                                    : action.status === 'ongoing'
                                      ? 'En cours'
                                      : 'À venir'}
                            </span>
                            <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                                {action.category.name}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="mx-auto grid grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3 md:px-20 lg:grid-cols-4">
                    {/* Description + Stats */}
                    <div className="space-y-8 md:col-span-2 lg:col-span-3">
                        {/* Quick Stats */}
                        <section className="container mx-auto mt-8 flex flex-wrap justify-around gap-6 rounded-lg bg-gradient-to-b from-primary/10 to-transparent px-4 py-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>{action.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <div>{action.location}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <div>{action.participants} bénévoles</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                <div>
                                    {action.impact.label}: {action.impact.value}
                                </div>
                            </div>
                        </section>

                        {/* Story Section */}
                        <section className="container mx-auto space-y-6 px-4 py-12 md:max-w-4xl">
                            <p className="text-lg text-muted-foreground">
                                {action.longDescription}
                            </p>
                            <p className="text-sm text-primary/80 italic">
                                Saviez-vous ? Chaque action contribue
                                directement à améliorer l'environnement local.
                            </p>
                        </section>
                        {/* Impact */}
                        <div className="rounded-lg border-l-4 border-primary bg-primary/10 p-4">
                            <div className="text-sm text-muted-foreground">
                                {action.impact.label}
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {action.impact.value}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/get-involved/volunteer"
                                className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                            >
                                Devenir bénévole
                            </Link>
                            <Link
                                href="/donate"
                                className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                            >
                                Soutenir cette action
                            </Link>
                        </div>

                        {/* Gallery */}
                        {action.gallery.length > 0 && (
                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {action.gallery.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${action.title} - image ${idx + 1}`}
                                        className="h-56 w-full rounded-lg object-cover shadow-sm transition-transform hover:scale-105"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Related Actions */}
                    <section className="mt-12 w-fit">
                        <h2 className="mb-4 flex text-xl font-bold">
                            Actions similaires
                        </h2>
                        <div className="flex w-fit flex-row items-center gap-4 md:flex-col">
                            {relatedActions.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/actions/${rel.id}`}
                                    className="w-64 flex-shrink-0 rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-105 hover:shadow-lg"
                                >
                                    <div className="h-36 w-full overflow-hidden rounded-t-xl">
                                        <img
                                            src={rel.image}
                                            alt={rel.title}
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="line-clamp-2 text-sm font-semibold">
                                            {rel.title}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {rel.category.name}
                                        </div>
                                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3 text-primary" />
                                            {rel.date}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </section>
            </main>
        </MainLayout>
    );
}
