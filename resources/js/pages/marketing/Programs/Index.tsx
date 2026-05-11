import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight, BookOpen, Construction, Droplets, GraduationCap,
    HeartHandshake, Lightbulb, Microscope, Search, ShieldCheck,
} from 'lucide-react';
import React from 'react';

interface Program {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string | null;
    color: string | null;
    stats_label: string | null;
    stats_value: string | null;
    pillars: string[];
}

interface Props extends Record<string, unknown> {
    programs: Program[];
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
    GraduationCap, Construction, Search, Droplets,
    BookOpen, ShieldCheck, Microscope, HeartHandshake, Lightbulb,
};

const COLOR_MAP: Record<string, { bg: string; border: string; dot: string }> = {
    primary:  { bg: 'bg-primary/10 text-primary',        border: 'border-primary/20',   dot: 'bg-primary' },
    indigo:   { bg: 'bg-indigo-50 text-indigo-600',      border: 'border-indigo-100',   dot: 'bg-indigo-500' },
    sky:      { bg: 'bg-sky-50 text-sky-600',            border: 'border-sky-100',      dot: 'bg-sky-500' },
    emerald:  { bg: 'bg-emerald-50 text-emerald-600',    border: 'border-emerald-100',  dot: 'bg-emerald-500' },
    teal:     { bg: 'bg-teal-50 text-teal-600',          border: 'border-teal-100',     dot: 'bg-teal-500' },
    blue:     { bg: 'bg-blue-50 text-blue-600',          border: 'border-blue-100',     dot: 'bg-blue-500' },
    green:    { bg: 'bg-green-50 text-green-600',        border: 'border-green-100',    dot: 'bg-green-500' },
};

function ProgramCard({ program }: { program: Program }) {
    const colorKey = program.color ?? 'primary';
    const colors = COLOR_MAP[colorKey] ?? COLOR_MAP.primary;
    const IconComponent = ICON_MAP[program.icon ?? ''] ?? Lightbulb;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                'group relative flex flex-col rounded-[3rem] border bg-white p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50',
                colors.border,
            )}
        >
            <div className={cn('mb-8 flex h-20 w-20 items-center justify-center rounded-[1.8rem] transition-transform group-hover:scale-110', colors.bg)}>
                <IconComponent className="h-10 w-10" />
            </div>

            <h3 className="mb-4 text-2xl font-black text-slate-900">{program.title}</h3>
            <p className="mb-8 leading-relaxed text-slate-500">{program.description}</p>

            <ul className="mb-10 flex-1 space-y-3">
                {program.pillars.map((pillar, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <div className={cn('h-1.5 w-1.5 rounded-full', colors.dot)} />
                        {pillar}
                    </li>
                ))}
            </ul>

            {(program.stats_label || program.stats_value) && (
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            {program.stats_label}
                        </p>
                        <p className="text-xl font-black text-slate-900">{program.stats_value}</p>
                    </div>
                    <Link href={`/programs/${program.slug}`} className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full transition-all group-hover:w-32 group-hover:px-4',
                        colors.bg,
                    )}>
                        <span className="mr-2 hidden text-xs font-black whitespace-nowrap group-hover:block">
                            Voir plus
                        </span>
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            )}
        </motion.div>
    );
}

export default function NosProgrammes() {
    const { programs } = usePage<Props>().props;

    return (
        <MainLayout>
            <Head title="Nos Programmes | Asproqualee" />
            <HeroSection
                backgroundImage="https://images.unsplash.com/photo-1541913054-211995467000?w=1920&q=80"
                title={<>Bâtir un <span className="text-primary">Avenir Durable</span></>}
                subtitle="Nos programmes transforment durablement l'accès à l'eau et la protection de la biodiversité à travers le Cameroun."
            />
            <section className="py-24 md:px-24">
                <div className="container mx-auto px-4">
                    <div className="mb-20 max-w-3xl">
                        <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary uppercase">
                            Nos Domaines d'Expertise
                        </span>
                        <h2 className="mb-6 text-4xl leading-tight font-black text-slate-900 md:text-5xl">
                            Une approche <span className="text-primary">holistique</span> pour un impact durable.
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-500">
                            Chez AsproQualee, nos programmes sont conçus pour s'auto-alimenter et transformer l'écosystème de l'eau sur le long terme.
                        </p>
                    </div>

                    {programs.length === 0 ? (
                        <p className="py-12 text-center text-muted-foreground">
                            Aucun programme disponible pour le moment.
                        </p>
                    ) : (
                        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {programs.map((prog) => (
                                <ProgramCard key={prog.id} program={prog} />
                            ))}
                        </div>
                    )}

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
                                    Nos programmes ne sont pas isolés. Les données de notre <b>Recherche</b> alimentent nos <b>Infrastructures</b>, qui servent de support à l'<b>Éducation</b>, garantissant ainsi une <b>Restauration</b> naturelle pérenne.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { t: 'Analyse',   d: 'Identifier les zones critiques.' },
                                        { t: 'Action',    d: 'Déployer les solutions techniques.' },
                                        { t: 'Pérennité', d: "Éduquer pour maintenir l'impact." },
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black">
                                                0{i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{step.t}</h4>
                                                <p className="text-sm text-slate-400">{step.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
