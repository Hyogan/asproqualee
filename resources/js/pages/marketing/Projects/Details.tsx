import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Map, MapPin, Target } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    category: string;
    status: 'en-cours' | 'terminé' | 'planifié';
    description: string;
    image: string | null;
    location: string | null;
    progress: number;
    impact_goal: string | null;
    impact_value: string | null;
}

interface Props extends Record<string, unknown> {
    project: Project;
    related: Project[];
}

const STATUS_STYLES: Record<string, string> = {
    'en-cours': 'bg-blue-100 text-blue-700',
    'terminé':  'bg-emerald-100 text-emerald-700',
    'planifié': 'bg-slate-100 text-slate-500',
};

const STATUS_LABELS: Record<string, string> = {
    'en-cours': 'En cours',
    'terminé':  'Terminé',
    'planifié': 'Planifié',
};

export default function ProjectDetailsPage() {
    const { project, related } = usePage<Props>().props;

    return (
        <MainLayout>
            <Head title={`${project.title} | Asproqualee`} />
            <main className="min-h-screen bg-[#FDFDFD]">
                {/* Hero image */}
                <section className="relative h-[30rem]">
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100">
                            <Globe className="h-24 w-24 text-slate-300" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-16">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className={cn('rounded-full px-3 py-1 text-xs font-black uppercase', STATUS_STYLES[project.status] ?? STATUS_STYLES['planifié'])}>
                                {STATUS_LABELS[project.status] ?? project.status}
                            </span>
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-black uppercase text-white">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-white drop-shadow-lg md:text-5xl">{project.title}</h1>
                        {project.location && (
                            <p className="mt-3 flex items-center gap-2 text-white/80">
                                <MapPin className="h-4 w-4" /> {project.location}
                            </p>
                        )}
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16">
                    <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-primary">
                        <ArrowLeft className="h-4 w-4" /> Tous les projets
                    </Link>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Main */}
                        <div className="lg:col-span-2 space-y-10">
                            <p className="text-lg leading-relaxed text-slate-600">{project.description}</p>

                            {/* Progress */}
                            <div>
                                <div className="mb-2 flex items-center justify-between text-sm font-black">
                                    <span className="text-slate-400 uppercase tracking-widest text-[10px]">Progression</span>
                                    <span className="text-primary">{project.progress}%</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${project.progress}%` }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                        className="h-full rounded-full bg-primary"
                                    />
                                </div>
                            </div>

                            {/* Impact */}
                            {(project.impact_goal || project.impact_value) && (
                                <div className="flex items-center gap-6 rounded-[2rem] bg-slate-50 p-8">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                                        <Target className="h-8 w-8" />
                                    </div>
                                    <div>
                                        {project.impact_goal && (
                                            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{project.impact_goal}</p>
                                        )}
                                        {project.impact_value && (
                                            <p className="text-3xl font-black text-slate-900">{project.impact_value}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Info card */}
                            <div className="rounded-[2rem] border border-border bg-white p-8 space-y-4">
                                <h3 className="text-sm font-black tracking-widest text-slate-400 uppercase">Infos</h3>
                                {project.location && (
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Map className="h-4 w-4 text-primary" />
                                        {project.location}
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className={cn('rounded-full px-2.5 py-1 text-xs font-black', STATUS_STYLES[project.status] ?? STATUS_STYLES['planifié'])}>
                                        {STATUS_LABELS[project.status] ?? project.status}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-slate-500">
                                    Catégorie : <span className="text-slate-900">{project.category}</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
                                <h3 className="mb-3 text-lg font-black">Soutenir ce projet</h3>
                                <p className="mb-6 text-sm text-slate-400">Votre don contribue directement à l'avancement de ce projet sur le terrain.</p>
                                <Link href="/donate" className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-black text-white transition-all hover:scale-105">
                                    Faire un don <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* Related */}
                            {related.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-sm font-black tracking-widest text-slate-400 uppercase">Projets similaires</h3>
                                    <div className="space-y-3">
                                        {related.map(p => (
                                            <Link key={p.id} href={`/projects/${p.id}`}
                                                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-all hover:shadow-md">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                    {p.image
                                                        ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                                                        : <Globe className="m-auto mt-3 h-6 w-6 text-slate-300" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700 line-clamp-2">{p.title}</p>
                                                    <p className="text-xs text-slate-400">{p.progress}% complété</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
