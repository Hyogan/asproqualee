import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/Hero';
import Section, { SectionHeader } from '@/components/marketing/Section';
import StatsGrid from '@/components/marketing/Stats';
import { ProgramCard, ProjectCard } from '@/components/marketing/Card';
import {
    Droplet,
    GraduationCap,
    Heart,
    MapPin,
    Sprout,
    Users,
} from 'lucide-react';
import MissionSection from '@/components/marketing/sections/Mission';
import ActionsSection from '@/components/marketing/sections/Actions';
import CTASection from '@/components/marketing/sections/CTA';

interface HomeProps {
    stats: {
        beneficiaries: string;
        projects: string;
        volunteers: string;
        litersDistributed: string;
    };
    featuredProjects: Array<{
        id: number;
        title: string;
        description: string;
        image: string;
        location: string;
        impact: string;
        slug: string;
    }>;
    recentNews: Array<{
        id: number;
        title: string;
        excerpt: string;
        image: string;
        date: string;
        category: string;
        slug: string;
    }>;
    canRegister?: boolean;
}

export default function Welcome({
    canRegister = true,
    stats,
    featuredProjects,
    recentNews,
}: HomeProps) {
    const { auth } = usePage<SharedData>().props;

    const programs = [
        {
            icon: <Droplet className="h-6 w-6" />,
            title: 'Eau & Assainissement',
            description:
                "Accès à l'eau potable et systèmes d'assainissement durables pour les communautés.",
            href: '/programmes/eau-assainissement',
        },
        {
            icon: <GraduationCap className="h-6 w-6" />,
            title: 'Éducation & Sensibilisation',
            description:
                "Programmes éducatifs sur l'hygiène, la santé et la protection de l'environnement.",
            href: '/programmes/education',
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: 'Hygiène & Santé',
            description:
                "Promotion des bonnes pratiques d'hygiène et prévention des maladies hydriques.",
            href: '/programmes/hygiene-sante',
        },
        {
            icon: <Sprout className="h-6 w-6" />,
            title: 'Protection Environnementale',
            description:
                'Conservation des ressources en eau et restauration des écosystèmes aquatiques.',
            href: '/programmes/environnement',
        },
    ];

    const impactStats = [
        {
            value: stats.beneficiaries,
            label: 'Bénéficiaires',
            icon: <Users className="h-6 w-6" />,
            suffix: '+',
        },
        {
            value: stats.projects,
            label: 'Projets Réalisés',
            icon: <MapPin className="h-6 w-6" />,
        },
        {
            value: stats.volunteers,
            label: 'Bénévoles Actifs',
            icon: <Heart className="h-6 w-6" />,
            suffix: '+',
        },
        {
            value: stats.litersDistributed,
            label: "Litres d'Eau Potable",
            icon: <Droplet className="h-6 w-6" />,
            suffix: 'L',
        },
    ];

    return (
        <MainLayout>
            <HeroSection />

            {/* Impact Stats */}
            <Section background="muted">
                <StatsGrid stats={impactStats} columns={4} />
            </Section>

            <MissionSection />

            {/* Programs Section */}
            <Section>
                <SectionHeader
                    subtitle="Nos Actions"
                    title="Des Programmes qui Transforment des Vies"
                    description="Découvrez comment nous intervenons sur le terrain pour créer un impact durable dans les domaines de l'eau, de l'assainissement, de l'éducation et de l'environnement."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {programs.map((program) => (
                        <ProgramCard key={program.title} {...program} />
                    ))}
                </div>
            </Section>

            {/* Featured Projects */}
            <Section background="muted">
                <SectionHeader
                    subtitle="Projets en Vedette"
                    title="Notre Impact sur le Terrain"
                    description="Découvrez quelques-uns de nos projets phares qui changent concrètement la vie des communautés."
                />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            location={project.location}
                            impact={project.impact}
                            href={`/projets/${project.slug}`}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/projets"
                        className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
                    >
                        Voir Tous Nos Projets
                    </a>
                </div>
            </Section>
            <ActionsSection />
            {/* Mission Statement */}
            <Section>
                <div className="mx-auto max-w-4xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                Pourquoi Nous Agissons
                            </h2>
                            <div className="prose prose-lg space-y-4 text-muted-foreground">
                                <p>
                                    L'eau est un droit humain fondamental.
                                    Pourtant, des millions de personnes n'ont
                                    toujours pas accès à l'eau potable et à des
                                    installations sanitaires adéquates.
                                </p>
                                <p>
                                    Notre association travaille main dans la
                                    main avec les communautés locales pour
                                    développer des solutions durables qui
                                    respectent l'environnement et favorisent
                                    l'autonomie.
                                </p>
                                <p>
                                    Chaque projet que nous menons est pensé pour
                                    créer un impact à long terme, en combinant
                                    infrastructures, éducation et mobilisation
                                    communautaire.
                                </p>
                            </div>
                            <div className="mt-8">
                                <a
                                    href="/a-propos/mission"
                                    className="inline-flex items-center text-base font-semibold text-primary transition-colors hover:text-primary/80"
                                >
                                    En savoir plus sur notre mission
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <img
                                src="/images/mission-image.jpg"
                                alt="Notre mission sur le terrain"
                                className="rounded-2xl shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-xl">
                                <div className="text-4xl font-bold">15+</div>
                                <div className="text-sm opacity-90">
                                    Années d'Expérience
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <CTASection />
        </MainLayout>
    );
}
