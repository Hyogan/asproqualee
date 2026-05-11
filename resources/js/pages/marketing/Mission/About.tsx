import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/HeroSection';

export default function AboutPage() {
    return (
        <MainLayout
            title="Notre Mission | AsproQualee"
            description="Découvrez notre mission pour la protection de l'eau, l'assainissement et la sensibilisation environnementale."
        >
            <main className="min-h-screen">
                {/* Hero Section */}
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80"
                    title={
                        <>
                            Notre Mission
                            <br />
                            <span className="text-[#03b6ed]">
                                Impact Durable 🌍
                            </span>
                        </>
                    }
                    subtitle="Depuis notre création, nous agissons pour préserver l'eau et améliorer l'accès à l'assainissement dans les communautés locales."
                />

                {/* Mission Overview */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="mb-6 text-3xl font-bold text-foreground">
                        Qui nous sommes
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                        AsproQualee est une organisation dédiée à la protection
                        des ressources en eau, à l'assainissement et à
                        l'éducation environnementale. Nous croyons que chaque
                        action, qu'elle soit petite ou grande, contribue à un
                        impact durable sur les communautés et l'environnement.
                    </p>
                    <p className="mb-6 text-lg text-muted-foreground">
                        Depuis notre création, nous avons mobilisé des centaines
                        de bénévoles et partenaires pour restaurer des rivières,
                        améliorer les infrastructures sanitaires et sensibiliser
                        les populations aux pratiques durables. Notre approche
                        combine intervention terrain, formation et suivi
                        scientifique afin de garantir que nos actions soient
                        mesurables et durables.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Nous collaborons avec les écoles, les collectivités
                        locales et les entreprises pour créer des projets
                        adaptés aux besoins locaux, avec un objectif clair :
                        protéger l'eau et la vie qu'elle soutient.
                    </p>
                </section>

                {/* Key Focus Areas */}
                <section className="bg-gradient-to-b from-background to-secondary/10 py-16">
                    <div className="container mx-auto grid gap-12 px-4 md:grid-cols-3">
                        <div className="space-y-4 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=600&q=80"
                                alt="Water Protection"
                                className="mx-auto h-48 w-full rounded-xl object-cover"
                            />
                            <h3 className="text-xl font-bold text-foreground">
                                Protection de l'eau
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Nous surveillons et restaurons les cours d'eau
                                et les sources d'eau potable pour garantir un
                                accès à l'eau saine aux communautés locales.
                            </p>
                        </div>
                        <div className="space-y-4 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80"
                                alt="Sanitation"
                                className="mx-auto h-48 w-full rounded-xl object-cover"
                            />
                            <h3 className="text-xl font-bold text-foreground">
                                Assainissement
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Nous construisons et entretenons des
                                infrastructures sanitaires, distribuons des kits
                                d'hygiène et organisons des campagnes éducatives
                                pour réduire les maladies liées à l'eau.
                            </p>
                        </div>
                        <div className="space-y-4 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80"
                                alt="Education"
                                className="mx-auto h-48 w-full rounded-xl object-cover"
                            />
                            <h3 className="text-xl font-bold text-foreground">
                                Sensibilisation & Éducation
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Nous organisons des ateliers et des formations
                                pour les enfants, les familles et les
                                communautés afin de promouvoir les pratiques
                                durables et responsables vis-à-vis de l'eau et
                                de l'environnement.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-primary py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="mb-4 text-3xl font-bold">
                            Rejoignez notre mission
                        </h2>
                        <p className="mb-8 text-lg">
                            Participez à nos actions sur le terrain et
                            contribuez directement à un impact durable dans les
                            communautés.
                        </p>
                        <a
                            href="/get-involved/volunteer"
                            className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90"
                        >
                            Devenir bénévole
                        </a>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
