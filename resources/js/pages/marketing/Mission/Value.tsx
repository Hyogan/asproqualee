import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/HeroSection';

export default function MissionPage() {
    const vision = {
        title: 'Notre Vision',
        description: `
            Nous aspirons à un monde où chaque communauté a accès à une eau propre, des infrastructures
            sanitaires sûres et une sensibilisation complète à l'environnement. Notre vision est de
            créer des impacts durables et mesurables qui améliorent la qualité de vie tout en protégeant
            l'écosystème pour les générations futures.
        `,
        image: 'https://images.unsplash.com/photo-1601758123927-2d0c447ed1a3?w=800&q=80',
    };

    const values = [
        {
            title: 'Intégrité',
            description:
                'Nous agissons avec honnêteté, transparence et responsabilité dans toutes nos actions.',
            image: 'https://images.unsplash.com/photo-1581093588401-72d95f98cfdb?w=600&q=80',
        },
        {
            title: 'Durabilité',
            description:
                'Nous privilégions des solutions à long terme qui préservent l’environnement et soutiennent les communautés.',
            image: 'https://images.unsplash.com/photo-1581093458361-1a0b23d7eecf?w=600&q=80',
        },
        {
            title: 'Collaboration',
            description:
                'Nous croyons au travail d’équipe, aux partenariats locaux et à l’engagement communautaire.',
            image: 'https://images.unsplash.com/photo-1562003383-3a9f9d8c1a36?w=600&q=80',
        },
        {
            title: 'Innovation',
            description:
                'Nous cherchons constamment des méthodes nouvelles et efficaces pour résoudre les problèmes environnementaux.',
            image: 'https://images.unsplash.com/photo-1581091012184-dbb5c8e1d295?w=600&q=80',
        },
        {
            title: 'Impact Mesurable',
            description:
                'Chaque projet est suivi et évalué pour garantir des résultats tangibles et améliorer nos pratiques.',
            image: 'https://images.unsplash.com/photo-1581091210562-4c44bfbfa32b?w=600&q=80',
        },
    ];

    return (
        <MainLayout
            title="Vision & Valeurs | AsproQualee"
            description="Découvrez la vision et les valeurs qui guident AsproQualee dans ses actions pour l'eau, l'assainissement et la sensibilisation environnementale."
        >
            <main className="min-h-screen">
                {/* Hero Section */}
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1601758123927-2d0c447ed1a3?w=1920&q=80"
                    title={
                        <>
                            Vision & Valeurs
                            <br />
                            <span className="text-[#03b6ed]">
                                Ce qui nous guide 💡
                            </span>
                        </>
                    }
                    subtitle="Chaque initiative est pensée pour créer un impact durable, guidé par notre vision et nos valeurs fondamentales."
                />

                {/* Vision Section */}
                <section className="container mx-auto flex flex-col items-center gap-8 px-4 py-16 md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={vision.image}
                            alt={vision.title}
                            className="rounded-xl object-cover shadow-lg"
                        />
                    </div>
                    <div className="space-y-4 md:w-1/2">
                        <h2 className="text-3xl font-bold text-foreground">
                            {vision.title}
                        </h2>
                        <p className="text-lg whitespace-pre-line text-muted-foreground">
                            {vision.description}
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-3">
                    {values.map((value, idx) => (
                        <div
                            key={idx}
                            className="space-y-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={value.image}
                                    alt={value.title}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-foreground">
                                    {value.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-primary to-primary-deep py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="mb-4 text-3xl font-bold">
                            Agissez avec nous
                        </h2>
                        <p className="mb-8 text-lg">
                            Engagez-vous dans nos initiatives pour protéger
                            l'eau et promouvoir un développement durable.
                        </p>
                        <a
                            href="/get-involved/volunteer"
                            className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90"
                        >
                            Rejoindre une action
                        </a>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
