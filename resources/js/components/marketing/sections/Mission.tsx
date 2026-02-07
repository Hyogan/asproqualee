import { Eye, Target } from 'lucide-react';

export default function MissionSection() {
    return (
        <section id="mission" className="bg-secondary/10 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                            Notre Raison d'Être
                        </h2>
                        <p className="text-xl leading-relaxed text-muted-foreground">
                            L'eau est la source de toute vie. Nous existons pour
                            protéger cette ressource vitale, une communauté à la
                            fois.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                                <Target className="h-8 w-8" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-foreground">
                                Notre Mission
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Protéger et améliorer la qualité de l'eau à
                                travers des actions concrètes, la
                                sensibilisation et la prévention des maladies
                                hydriques.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-8">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                                <Eye className="h-8 w-8" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-foreground">
                                Notre Vision
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                Un monde où chaque communauté a accès à une eau
                                propre et saine pour les générations futures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
