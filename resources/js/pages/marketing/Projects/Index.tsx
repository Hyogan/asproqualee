import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target,
    Flag,
    Map,
    Info,
    ArrowRight,
    CheckCircle2,
    Clock,
    Rocket,
    Globe,
    Droplet,
    Waves,
    Sprout,
} from 'lucide-react';
import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';

// --- Types ---
interface Project {
    id: string;
    title: string;
    category: 'Biodiversité' | 'Eau & Santé' | 'Infrastructure' | 'Éducation';
    status: 'en-cours' | 'terminé' | 'planifié';
    description: string;
    image: string;
    location: string;
    progress: number; // 0 to 100
    impactGoal: string;
    impactValue: string;
}

// --- Mock Data ---
const projects: Project[] = [
    {
        id: 'proj-1',
        title: 'Revitalisation du Bassin du Mfoundi',
        category: 'Biodiversité',
        status: 'en-cours',
        description:
            "Restauration durable de l'écosystème fluvial à travers la plantation de zones tampons végétales et la filtration naturelle.",
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
        location: 'Yaoundé, Centre',
        progress: 65,
        impactGoal: 'Objectif de biodiversité',
        impactValue: '12 espèces protégées',
    },
    {
        id: 'proj-2',
        title: "Points d'Eau Communautaires Solaire",
        category: 'Infrastructure',
        status: 'en-cours',
        description:
            "Installation de systèmes de pompage solaire et de filtration UV pour fournir de l'eau potable aux écoles rurales.",
        image: 'https://images.unsplash.com/photo-1541913054-211995467000?w=800&q=80',
        location: "Région de l'Est",
        progress: 40,
        impactGoal: "Accès à l'eau",
        impactValue: '2,500 écoliers',
    },
    {
        id: 'proj-3',
        title: 'Programme "Écoles Bleues"',
        category: 'Éducation',
        status: 'terminé',
        description:
            "Curriculum éducatif sur l'hygiène et l'assainissement déployé dans 50 établissements primaires.",
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
        location: 'Littoral & Ouest',
        progress: 100,
        impactGoal: 'Sensibilisation',
        impactValue: '15,000 jeunes',
    },
];

// --- Sub-components ---

function ProjectCard({ project }: { project: Project }) {
    const statusStyles = {
        'en-cours': 'bg-blue-500 text-blue-500',
        terminé: 'bg-emerald-500 text-emerald-500',
        planifié: 'bg-slate-400 text-slate-400',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-3 transition-all hover:shadow-2xl hover:shadow-primary/10 dark:border-slate-800 dark:bg-slate-900"
        >
            {/* Image & Status */}
            <div className="relative h-64 overflow-hidden rounded-[2rem]">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black tracking-widest text-slate-900 uppercase backdrop-blur-md">
                    <Map className="h-3 w-3 text-primary" />
                    {project.location}
                </div>

                <div
                    className={cn(
                        'absolute top-4 right-4 flex items-center gap-1.5 rounded-full border bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase backdrop-blur-md',
                        statusStyles[project.status].split(' ')[1],
                    )}
                >
                    <div
                        className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            statusStyles[project.status].split(' ')[0],
                        )}
                    />
                    {project.status.replace('-', ' ')}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-[10px] font-bold tracking-widest text-primary uppercase">
                    {project.category}
                </span>
                <h3 className="mb-3 text-xl leading-tight font-black text-slate-900 dark:text-white">
                    {project.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">
                    {project.description}
                </p>

                {/* Progress Section */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-400">Progression</span>
                        <span className="text-primary">
                            {project.progress}%
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-primary"
                        />
                    </div>

                    {/* Impact Snapshot */}
                    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm dark:bg-slate-800">
                            <Target className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
                                {project.impactGoal}
                            </p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">
                                {project.impactValue}
                            </p>
                        </div>
                    </div>
                </div>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 py-4 text-sm font-black text-slate-900 transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-slate-800 dark:text-white">
                    Détails du projet
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </motion.div>
    );
}

export default function NosProjetsPage() {
    const [filter, setFilter] = useState<'all' | Project['category']>('all');

    const filteredProjects =
        filter === 'all'
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <MainLayout title="AsproQualee | Nos Projets">
            <main className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1541913054-211995467000?w=1920&q=80"
                    title={
                        <>
                            Bâtir un{' '}
                            <span className="text-primary">Avenir Durable</span>
                        </>
                    }
                    subtitle="Nos projets transforment durablement l'accès à l'eau et la protection de la biodiversité à travers le Cameroun."
                />

                {/* Impact Roadmap Header */}
                <section className="relative z-10 container mx-auto -mt-12 px-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            {
                                label: 'Projets Actifs',
                                val: '12',
                                icon: <Rocket className="text-blue-500" />,
                            },
                            {
                                label: 'Communautés',
                                val: '45',
                                icon: <Globe className="text-emerald-500" />,
                            },
                            {
                                label: 'Impact Global',
                                val: '85k',
                                suffix: ' pers.',
                                icon: <CheckCircle2 className="text-primary" />,
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-6 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:shadow-none"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-2xl dark:bg-slate-800">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                                        {stat.val}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section className="container mx-auto px-4 py-24">
                    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="max-w-xl">
                            <h2 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
                                Portfolio d'Impact
                            </h2>
                            <p className="text-slate-500">
                                Explorez nos initiatives en cours et nos succès
                                passés. Chaque projet est conçu pour être
                                autonome et durable.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {[
                                'all',
                                'Biodiversité',
                                'Infrastructure',
                                'Éducation',
                            ].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat as any)}
                                    className={cn(
                                        'rounded-full px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all',
                                        filter === cat
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'border border-slate-100 bg-white text-slate-400 hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900',
                                    )}
                                >
                                    {cat === 'all' ? 'Tous' : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* "Propose a Project" Banner */}
                <section className="container mx-auto px-4 pb-24">
                    <div className="relative overflow-hidden rounded-[4rem] bg-primary px-8 py-20 text-center text-white">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                        <div className="relative z-10 mx-auto max-w-3xl">
                            <h2 className="mb-6 text-4xl font-black md:text-5xl">
                                Vous avez une idée de projet ?
                            </h2>
                            <p className="mb-10 text-xl text-white/80">
                                Nous collaborons avec les communautés locales
                                pour identifier les besoins critiques en eau et
                                environnement. Soumettez votre proposition.
                            </p>
                            <button className="rounded-full bg-white px-10 py-5 text-sm font-black tracking-widest text-primary uppercase shadow-2xl transition-transform hover:scale-105 active:scale-95">
                                Proposer une initiative
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
