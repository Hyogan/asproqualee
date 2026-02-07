import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import {
    AlertTriangle,
    CheckCircle2,
    Heart,
    Lightbulb,
    Shield,
    Users,
    XCircle,
    Filter,
    Sun,
    Droplet,
    Flame,
} from 'lucide-react';

function DiseasesPrevention() {
    const diseases = [
        {
            name: 'Choléra',
            risk: 'Élevé',
            description:
                "Infection intestinale aiguë causée par la bactérie Vibrio cholerae, transmise par de l'eau contaminée.",
            prevention: [
                'Eau potable traitée',
                'Hygiène des mains',
                'Assainissement adéquat',
            ],
        },
        {
            name: 'Typhoïde',
            risk: 'Moyen',
            description:
                "Maladie bactérienne causée par Salmonella typhi, transmise par l'eau et les aliments contaminés.",
            prevention: [
                "Filtration de l'eau",
                'Cuisson des aliments',
                'Lavage des mains',
            ],
        },
        {
            name: 'Diarrhées',
            risk: 'Élevé',
            description:
                "Maladies diarrhéiques causées par divers pathogènes présents dans l'eau non potable.",
            prevention: [
                'Eau bouillie ou filtrée',
                'Hygiène personnelle',
                'Toilettes propres',
            ],
        },
        {
            name: 'Hépatite A',
            risk: 'Moyen',
            description:
                "Infection virale du foie transmise par l'eau et les aliments contaminés par des matières fécales.",
            prevention: ['Eau traitée', 'Hygiène alimentaire', 'Vaccination'],
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        Maladies Hydriques : Connaître pour Prévenir
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        L'eau contaminée est responsable de nombreuses maladies
                        évitables. Comprendre ces risques est la première étape
                        vers la prévention.
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                    {diseases.map((disease, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-red-500/30 hover:shadow-xl"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <h3 className="text-xl font-bold text-foreground">
                                    {disease.name}
                                </h3>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        disease.risk === 'Élevé'
                                            ? 'bg-red-500/10 text-red-600'
                                            : 'bg-orange-500/10 text-orange-600'
                                    }`}
                                >
                                    Risque {disease.risk}
                                </span>
                            </div>

                            <p className="mb-4 text-sm text-muted-foreground">
                                {disease.description}
                            </p>

                            <div>
                                <h4 className="mb-2 text-sm font-semibold text-foreground">
                                    Prévention :
                                </h4>
                                <ul className="space-y-1.5">
                                    {disease.prevention.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8">
                    <div className="flex items-start gap-4">
                        <Shield className="h-12 w-12 flex-shrink-0 text-blue-600" />
                        <div>
                            <h3 className="mb-3 text-xl font-bold text-foreground">
                                La Bonne Nouvelle : 80% de Ces Maladies Sont
                                Évitables
                            </h3>
                            <p className="mb-4 text-muted-foreground">
                                Avec un accès à l'eau potable, des installations
                                sanitaires adéquates et une bonne hygiène, la
                                majorité des maladies hydriques peuvent être
                                prévenues.
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                                C'est pourquoi notre mission de protection de
                                l'eau est aussi une mission de santé publique.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WaterQualitySection() {
    const qualityIndicators = [
        {
            name: 'Clarté',
            safe: 'Eau claire et transparente',
            unsafe: 'Eau trouble ou colorée',
            icon: <Droplet className="h-6 w-6" />,
        },
        {
            name: 'Odeur',
            safe: 'Sans odeur désagréable',
            unsafe: "Odeur d'œuf pourri ou chimique",
            icon: <AlertTriangle className="h-6 w-6" />,
        },
        {
            name: 'Goût',
            safe: 'Goût neutre',
            unsafe: 'Goût métallique ou bizarre',
            icon: <XCircle className="h-6 w-6" />,
        },
    ];

    const treatments = [
        {
            title: 'Ébullition',
            description: "Faire bouillir l'eau pendant 1 minute minimum",
            effectiveness: '99.9%',
            icon: <Flame className="mx-auto h-12 w-12 text-red-500" />,
        },
        {
            title: 'Filtration',
            description: 'Utiliser des filtres certifiés',
            effectiveness: '99%',
            icon: <Filter className="mx-auto h-12 w-12 text-blue-500" />,
        },
        {
            title: 'Chloration',
            description: 'Traitement chimique par chlore',
            effectiveness: '95%',
            icon: <Droplet className="mx-auto h-12 w-12 text-teal-500" />,
        },
        {
            title: 'UV/Solaire',
            description: 'Exposition au soleil dans bouteilles claires',
            effectiveness: '90%',
            icon: <Sun className="mx-auto h-12 w-12 text-yellow-500" />,
        },
    ];

    return (
        <section className="bg-secondary/10 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                            Comment Reconnaître une Eau Potable ?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Apprenez à identifier les signes d'une eau sûre et
                            les méthodes de traitement
                        </p>
                    </div>

                    {/* Quality Indicators */}
                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {qualityIndicators.map((indicator, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-border bg-card p-6"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    {indicator.icon}
                                </div>
                                <h3 className="mb-4 text-lg font-bold text-foreground">
                                    {indicator.name}
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                        <span className="text-sm text-muted-foreground">
                                            {indicator.safe}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                                        <span className="text-sm text-muted-foreground">
                                            {indicator.unsafe}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Treatment Methods */}
                    <div>
                        <h3 className="mb-6 text-center text-2xl font-bold text-foreground">
                            Méthodes de Traitement de l'Eau
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {treatments.map((treatment, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-border bg-gradient-to-br from-white to-secondary/30 p-6 text-center transition-all hover:shadow-lg dark:from-card dark:to-secondary/10"
                                >
                                    <div className="mb-4 text-5xl">
                                        {treatment.icon}
                                    </div>
                                    <h4 className="mb-2 font-bold text-foreground">
                                        {treatment.title}
                                    </h4>
                                    <p className="mb-3 text-sm text-muted-foreground">
                                        {treatment.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                                        <CheckCircle2 className="h-3 w-3" />
                                        {treatment.effectiveness} efficace
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HygienePractices() {
    const practices = [
        {
            title: 'Lavage des Mains',
            steps: [
                "Mouiller les mains à l'eau courante",
                'Appliquer du savon',
                'Frotter pendant 20-30 secondes',
                'Rincer abondamment',
                'Sécher avec un linge propre',
            ],
            when: 'Avant de manger, après les toilettes, avant de préparer à manger',
        },
        {
            title: "Gestion de l'Eau à Domicile",
            steps: [
                "Stocker l'eau dans des récipients propres et couverts",
                'Utiliser une louche propre pour puiser',
                "Ne pas tremper les mains dans l'eau de boisson",
                'Nettoyer régulièrement les conteneurs',
                'Garder les récipients en hauteur',
            ],
            when: 'Quotidiennement',
        },
        {
            title: 'Assainissement des Toilettes',
            steps: [
                'Utiliser des toilettes fermées',
                'Nettoyer régulièrement',
                "Garder l'eau loin des latrines",
                'Se laver les mains après usage',
                'Évacuer correctement les eaux usées',
            ],
            when: 'Après chaque utilisation',
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        Bonnes Pratiques d'Hygiène
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Des gestes simples qui sauvent des vies
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    {practices.map((practice, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
                                {index + 1}
                            </div>

                            <h3 className="mb-4 text-xl font-bold text-foreground">
                                {practice.title}
                            </h3>

                            <ol className="mb-4 space-y-2">
                                {practice.steps.map((step, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ol>

                            <div className="border-t border-border pt-4">
                                <p className="text-xs text-muted-foreground">
                                    <strong>Quand :</strong> {practice.when}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImpactStats() {
    const stats = [
        {
            value: '2.2B',
            label: "Personnes sans accès à l'eau potable",
            icon: <Users className="h-8 w-8" />,
        },
        {
            value: '829,000',
            label: 'Décès annuels dus aux maladies diarrhéiques',
            icon: <Heart className="h-8 w-8" />,
        },
        {
            value: '80%',
            label: "Maladies évitables par l'eau propre",
            icon: <Shield className="h-8 w-8" />,
        },
        {
            value: '297,000',
            label: 'Enfants de moins de 5 ans meurent chaque année',
            icon: <AlertTriangle className="h-8 w-8" />,
        },
    ];

    return (
        <section className="bg-gradient-to-br from-red-500/5 to-orange-500/5 py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        L'Urgence d'Agir
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Les chiffres qui nous motivent à agir chaque jour
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-border bg-card p-6 text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
                                {stat.icon}
                            </div>
                            <div className="mb-2 text-3xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="mx-auto max-w-2xl text-sm text-muted-foreground italic">
                        Source : Organisation Mondiale de la Santé (OMS), UNICEF
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function WaterHealthPage() {
    return (
        <MainLayout
            title="Eau et Santé | Prévention des Maladies Hydriques et Qualité de l'Eau"
            description="Découvrez comment protéger votre santé grâce à une eau propre : prévention des maladies hydriques, méthodes de traitement de l'eau, et bonnes pratiques d'hygiène."
        >
            <main className="min-h-screen">
                {/* Hero */}
                {/* <Hero
                title="Eau & Santé Un Lien Vital"
                subtitle="💧 Éducation & Prévention"
                description="Découvrez l'importance cruciale de l'eau propre pour la santé publique et apprenez les gestes qui sauvent des vies."
                primaryCTA={{
                    label: 'Nos actions santé',
                    href: '/actions',
                }}
                secondaryCTA={{
                    label: 'Nous soutenir',
                    href: '/donate',
                }}
                image="https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=1920&q=80"
                height="tall"
            /> */}

                <HeroSection
                    title="Eau & Santé : Un Lien Vital"
                    subtitle="💧 Éducation & Prévention - Découvrez l'importance cruciale de l'eau propre pour la santé publique et apprenez les gestes qui sauvent des vies."
                    backgroundImage="https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=1920&q=80"
                    badgeText="Nous Sommes Là Pour Vous"
                    className="h-[60vh]"
                />

                {/* Impact Stats */}
                <ImpactStats />

                {/* Diseases Prevention */}
                <DiseasesPrevention />

                {/* Water Quality */}
                <WaterQualitySection />

                {/* Hygiene Practices */}
                <HygienePractices />

                {/* CTA */}
                <section className="bg-gradient-to-br from-primary to-primary-deep py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center text-white">
                            <Lightbulb className="mx-auto mb-6 h-16 w-16" />
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                                Ensemble, Éduquons et Protégeons
                            </h2>
                            <p className="mb-8 text-xl text-white/90">
                                Rejoignez nos campagnes de sensibilisation et
                                aidez-nous à diffuser ces bonnes pratiques dans
                                les communautés.
                            </p>
                            <a
                                href="/get-involved"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90 hover:shadow-xl"
                            >
                                Participer aux campagnes
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
