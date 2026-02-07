import React from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Droplets,
    ShieldCheck,
    Microscope,
    ArrowRight,
    GraduationCap,
    Construction,
    Search,
    HeartHandshake,
    Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/HeroSection';

// --- Types ---
interface Program {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    stats: { label: string; value: string };
    pillars: string[];
}

// --- Data ---
const programs: Program[] = [
    {
        id: 'prog-1',
        title: 'Éducation & Jeunesse',
        slug: 'ecoles-bleues',
        description:
            'Former la prochaine génération de gardiens de l’eau à travers notre curriculum "Écoles Bleues".',
        icon: <GraduationCap className="h-10 w-10" />,
        color: 'bg-indigo-50 text-indigo-600',
        borderColor: 'border-indigo-100',
        stats: { label: 'Élèves sensibilisés', value: '15,000+' },
        pillars: [
            'Kits pédagogiques',
            'Ateliers pratiques',
            'Clubs Environnement',
        ],
    },
    {
        id: 'prog-2',
        title: 'Infrastructures & Accès',
        slug: 'eau-potable',
        description:
            "Déploiement de solutions techniques durables pour l'accès à l'eau potable et l'assainissement.",
        icon: <Construction className="h-10 w-10" />,
        color: 'bg-sky-50 text-sky-600',
        borderColor: 'border-sky-100',
        stats: { label: "Points d'eau créés", value: '124' },
        pillars: [
            'Forages solaires',
            'Stations de filtrage',
            'Latrines écologiques',
        ],
    },
    {
        id: 'prog-3',
        title: 'Veille & Recherche',
        slug: 'qualite-eau',
        description:
            'Analyse scientifique de la qualité des eaux de surface pour influencer les politiques publiques.',
        icon: <Search className="h-10 w-10" />,
        color: 'bg-emerald-50 text-emerald-600',
        borderColor: 'border-emerald-100',
        stats: { label: 'Analyses effectuées', value: '450/an' },
        pillars: [
            'Cartographie pollutions',
            'Laboratoires mobiles',
            'Rapports annuels',
        ],
    },
    {
        id: 'prog-4',
        title: 'Restauration Naturelle',
        slug: 'biodiversite',
        description:
            'Protéger et restaurer les berges des fleuves pour préserver la biodiversité aquatique.',
        icon: <Droplets className="h-10 w-10" />,
        color: 'bg-teal-50 text-teal-600',
        borderColor: 'border-teal-100',
        stats: { label: 'Berges restaurées', value: '12km' },
        pillars: ['Reforestation', 'Nettoyages massifs', 'Protection espèces'],
    },
];

// --- Sub-components ---

function ProgramCard({ program }: { program: Program }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                'group relative flex flex-col rounded-[3rem] border bg-white p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50',
                program.borderColor,
            )}
        >
            <div
                className={cn(
                    'mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] transition-transform group-hover:scale-110',
                    program.color,
                )}
            >
                {program.icon}
            </div>

            <h3 className="mb-4 text-2xl font-black text-slate-900">
                {program.title}
            </h3>
            <p className="mb-8 leading-relaxed text-slate-500">
                {program.description}
            </p>

            <ul className="mb-10 flex-1 space-y-3">
                {program.pillars.map((pillar, i) => (
                    <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-bold text-slate-700"
                    >
                        <div
                            className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                program.color.split(' ')[1],
                            )}
                        />
                        {pillar}
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                <div>
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        {program.stats.label}
                    </p>
                    <p className="text-xl font-black text-slate-900">
                        {program.stats.value}
                    </p>
                </div>
                <button
                    className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full transition-all group-hover:w-32 group-hover:px-4',
                        program.color,
                        'hover:bg-opacity-80',
                    )}
                >
                    <span className="mr-2 hidden text-xs font-black whitespace-nowrap group-hover:block">
                        Voir plus
                    </span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </motion.div>
    );
}

export default function NosProgrammes() {
    return (
        <MainLayout>
            <HeroSection
                backgroundImage="https://images.unsplash.com/photo-1541913054-211995467000?w=1920&q=80"
                title={
                    <>
                        Bâtir un{' '}
                        <span className="text-primary">Avenir Durable</span>
                    </>
                }
                subtitle="Nos programmes transforment durablement l'accès à l'eau et la protection de la biodiversité à travers le Cameroun."
            />
            <section className="py-24 md:px-24">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="mb-20 max-w-3xl">
                        <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary uppercase">
                            Nos Domaines d'Expertise
                        </span>
                        <h2 className="mb-6 text-4xl leading-tight font-black text-slate-900 md:text-5xl">
                            Une approche{' '}
                            <span className="text-primary">holistique</span>{' '}
                            pour un impact durable.
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-500">
                            Chez AsproQualee, nous ne nous contentons pas de
                            solutions temporaires. Nos programmes sont conçus
                            pour s'auto-alimenter et transformer l'écosystème de
                            l'eau sur le long terme.
                        </p>
                    </div>

                    {/* Grid Section */}
                    <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {programs.map((prog) => (
                            <ProgramCard key={prog.id} program={prog} />
                        ))}
                    </div>

                    {/* Methodology / Cycle Section */}
                    <div className="relative overflow-hidden rounded-[4rem] bg-slate-900 p-12 text-white md:p-20">
                        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-10">
                            <Lightbulb size={400} />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                            <div>
                                <h2 className="mb-8 text-3xl leading-tight font-black md:text-4xl">
                                    Le Cycle de l'Impact AsproQualee
                                </h2>
                                <p className="mb-8 text-lg text-slate-400">
                                    Nos programmes ne sont pas isolés. Les
                                    données de notre <b>Recherche</b> alimentent
                                    nos <b>Infrastructures</b>, qui servent de
                                    support à l'<b>Éducation</b>, garantissant
                                    ainsi une <b>Restauration</b> naturelle
                                    pérenne.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        {
                                            t: 'Analyse',
                                            d: 'Identifier les zones critiques.',
                                        },
                                        {
                                            t: 'Action',
                                            d: 'Déployer les solutions techniques.',
                                        },
                                        {
                                            t: 'Pérennité',
                                            d: "Éduquer pour maintenir l'impact.",
                                        },
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">
                                                0{i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">
                                                    {step.t}
                                                </h4>
                                                <p className="text-sm text-slate-400">
                                                    {step.d}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                {/* Diagram Tag integration */}
                                <div className="w-full max-w-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
