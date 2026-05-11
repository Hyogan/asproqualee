import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Construction,
    Droplets, GraduationCap, HeartHandshake, Lightbulb,
    Microscope, Search, ShieldCheck, Sprout, Waves, Globe,
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
    program: Program;
    others: Program[];
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
    GraduationCap, Construction, Search, Droplets,
    BookOpen, ShieldCheck, Microscope, HeartHandshake,
    Lightbulb, Sprout, Waves, Globe,
};

const COLOR_MAP: Record<string, { bg: string; border: string; dot: string; badge: string }> = {
    primary:  { bg: 'bg-primary/10 text-primary',     border: 'border-primary/20',  dot: 'bg-primary',      badge: 'bg-primary text-white' },
    indigo:   { bg: 'bg-indigo-50 text-indigo-600',   border: 'border-indigo-100',  dot: 'bg-indigo-500',   badge: 'bg-indigo-600 text-white' },
    sky:      { bg: 'bg-sky-50 text-sky-600',         border: 'border-sky-100',     dot: 'bg-sky-500',      badge: 'bg-sky-600 text-white' },
    emerald:  { bg: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', dot: 'bg-emerald-500',  badge: 'bg-emerald-600 text-white' },
    teal:     { bg: 'bg-teal-50 text-teal-600',       border: 'border-teal-100',    dot: 'bg-teal-500',     badge: 'bg-teal-600 text-white' },
    blue:     { bg: 'bg-blue-50 text-blue-600',       border: 'border-blue-100',    dot: 'bg-blue-500',     badge: 'bg-blue-600 text-white' },
    green:    { bg: 'bg-green-50 text-green-600',     border: 'border-green-100',   dot: 'bg-green-500',    badge: 'bg-green-600 text-white' },
};

export default function ProgramDetailsPage() {
    const { program, others } = usePage<Props>().props;

    const colorKey = program.color ?? 'primary';
    const colors = COLOR_MAP[colorKey] ?? COLOR_MAP.primary;
    const IconComponent = ICON_MAP[program.icon ?? ''] ?? Lightbulb;

    return (
        <MainLayout>
            <Head title={`${program.title} | Asproqualee`} />
            <main className="min-h-screen bg-[#FDFDFD]">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1541913054-211995467000?w=1920&q=80"
                    title={<span className="text-primary">{program.title}</span>}
                    subtitle={program.description}
                />

                <div className="container mx-auto px-4 py-16">
                    {/* Back */}
                    <Link href="/programs" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-primary">
                        <ArrowLeft className="h-4 w-4" /> Tous les programmes
                    </Link>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Main */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Icon + title block */}
                            <div className="flex items-start gap-6">
                                <div className={cn('flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.8rem]', colors.bg)}>
                                    <IconComponent className="h-10 w-10" />
                                </div>
                                <div>
                                    <span className={cn('mb-2 inline-block rounded-full px-3 py-1 text-xs font-black tracking-widest uppercase', colors.badge)}>
                                        Programme
                                    </span>
                                    <h1 className="text-3xl font-black text-slate-900 md:text-4xl">{program.title}</h1>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-lg leading-relaxed text-slate-600">{program.description}</p>

                            {/* Pillars */}
                            {program.pillars.length > 0 && (
                                <div>
                                    <h2 className="mb-6 text-2xl font-black text-slate-900">Axes d'intervention</h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {program.pillars.map((pillar, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.07 }}
                                                className={cn('flex items-center gap-3 rounded-2xl border p-4', colors.border)}
                                            >
                                                <CheckCircle2 className={cn('h-5 w-5 shrink-0', colors.bg.split(' ')[1])} />
                                                <span className="text-sm font-bold text-slate-700">{pillar}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Stats card */}
                            {(program.stats_label || program.stats_value) && (
                                <div className={cn('rounded-[2rem] border p-8', colors.border)}>
                                    <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        {program.stats_label}
                                    </p>
                                    <p className="text-4xl font-black text-slate-900">{program.stats_value}</p>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="rounded-[2rem] bg-slate-900 p-8 text-white">
                                <h3 className="mb-3 text-lg font-black">Soutenir ce programme</h3>
                                <p className="mb-6 text-sm text-slate-400">Votre contribution aide à développer cet axe d'action sur le terrain.</p>
                                <Link href="/donate" className={cn('flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-black transition-all hover:scale-105', colors.badge)}>
                                    Faire un don <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* Others */}
                            {others.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-sm font-black tracking-widest text-slate-400 uppercase">Autres programmes</h3>
                                    <div className="space-y-3">
                                        {others.map(p => {
                                            const oc = COLOR_MAP[p.color ?? 'primary'] ?? COLOR_MAP.primary;
                                            const OtherIcon = ICON_MAP[p.icon ?? ''] ?? Lightbulb;
                                            return (
                                                <Link key={p.id} href={`/programs/${p.slug}`}
                                                    className={cn('flex items-center gap-3 rounded-2xl border p-4 transition-all hover:shadow-md', oc.border)}>
                                                    <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', oc.bg)}>
                                                        <OtherIcon className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 line-clamp-2">{p.title}</span>
                                                </Link>
                                            );
                                        })}
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
