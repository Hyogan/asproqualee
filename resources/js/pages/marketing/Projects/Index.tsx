import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Map, Rocket, Target } from 'lucide-react';
import { useState } from 'react';

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
    projects: Project[];
}

const STATUS_STYLES: Record<string, string> = {
    'en-cours': 'bg-blue-500 text-blue-500',
    'terminé':  'bg-emerald-500 text-emerald-500',
    'planifié': 'bg-slate-400 text-slate-400',
};

const STATUS_LABELS: Record<string, string> = {
    'en-cours': 'En cours',
    'terminé':  'Terminé',
    'planifié': 'Planifié',
};

function ProjectCard({ project }: { project: Project }) {
    const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES['planifié'];
    const [dotColor, textColor] = statusStyle.split(' ');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-3 transition-all hover:shadow-2xl hover:shadow-primary/10"
        >
            <div className="relative h-64 overflow-hidden rounded-[2rem]">
                {project.image ? (
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <Globe className="h-20 w-20 text-slate-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                {project.location && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black tracking-widest text-slate-900 uppercase backdrop-blur-md">
                        <Map className="h-3 w-3 text-primary" />
                        {project.location}
                    </div>
                )}

                <div className={cn('absolute top-4 right-4 flex items-center gap-1.5 rounded-full border bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase backdrop-blur-md', textColor)}>
                    <div className={cn('h-1.5 w-1.5 rounded-full', dotColor)} />
                    {STATUS_LABELS[project.status]}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-[10px] font-bold tracking-widest text-primary uppercase">
                    {project.category}
                </span>
                <h3 className="mb-3 text-xl leading-tight font-black text-slate-900">{project.title}</h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">{project.description}</p>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">Progression</span>
                        <span className="text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-primary"
                        />
                    </div>

                    {(project.impact_goal || project.impact_value) && (
                        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                                <Target className="h-5 w-5" />
                            </div>
                            <div>
                                {project.impact_goal && (
                                    <p className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">{project.impact_goal}</p>
                                )}
                                {project.impact_value && (
                                    <p className="text-sm font-black text-slate-900">{project.impact_value}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Link href={`/projects/${project.id}`} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 py-4 text-sm font-black text-slate-900 transition-all hover:border-primary hover:bg-primary hover:text-white">
                    Détails du projet
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}

export default function NosProjetsPage() {
    const { projects } = usePage<Props>().props;
    const [filter, setFilter] = useState('all');

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const stats = {
        active:      projects.filter(p => p.status === 'en-cours').length,
        communities: projects.length,
    };

    return (
        <MainLayout title="AsproQualee | Nos Projets">
            <Head title="Nos Projets | Asproqualee" />
            <main className="min-h-screen bg-[#FDFDFD]">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1541913054-211995467000?w=1920&q=80"
                    title={<>Bâtir un <span className="text-primary">Avenir Durable</span></>}
                    subtitle="Nos projets transforment durablement l'accès à l'eau et la protection de la biodiversité à travers le Cameroun."
                />

                {/* Stats */}
                <section className="relative z-10 container mx-auto -mt-12 px-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { label: 'Projets Actifs',  val: stats.active,      icon: <Rocket className="text-blue-500" /> },
                            { label: 'Projets Total',   val: stats.communities, icon: <Globe className="text-emerald-500" /> },
                            { label: 'Impact Global',   val: '85k',             suffix: ' pers.', icon: <CheckCircle2 className="text-primary" /> },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-6 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/50">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900">{stat.val}{stat.suffix}</div>
                                    <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="max-w-xl">
                            <h2 className="mb-4 text-4xl font-black text-slate-900">Portfolio d'Impact</h2>
                            <p className="text-slate-500">Explorez nos initiatives en cours et nos succès passés.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={cn(
                                        'rounded-full px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all',
                                        filter === cat
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'border border-slate-100 bg-white text-slate-400 hover:border-primary/30',
                                    )}
                                >
                                    {cat === 'all' ? 'Tous' : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredProjects.length === 0 ? (
                        <p className="py-12 text-center text-slate-400">Aucun projet disponible pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </section>

                {/* CTA */}
                <section className="container mx-auto px-4 pb-24">
                    <div className="relative overflow-hidden rounded-[4rem] bg-primary px-8 py-20 text-center text-white">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                        <div className="relative z-10 mx-auto max-w-3xl">
                            <h2 className="mb-6 text-4xl font-black md:text-5xl">Vous avez une idée de projet ?</h2>
                            <p className="mb-10 text-xl text-white/80">
                                Nous collaborons avec les communautés locales pour identifier les besoins critiques en eau et environnement.
                            </p>
                            <a href="/contact" className="inline-block rounded-full bg-white px-10 py-5 text-sm font-black tracking-widest text-primary uppercase shadow-2xl transition-transform hover:scale-105 active:scale-95">
                                Proposer une initiative
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
