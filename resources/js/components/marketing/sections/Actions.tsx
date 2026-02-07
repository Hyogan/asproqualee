import { ArrowRight, Droplet, Sprout, Users, Waves } from 'lucide-react';

export default function ActionsSection() {
    const actions = [
        {
            title: "Protection de l'Eau",
            description:
                "Surveillance et amélioration de la qualité des sources d'eau.",
            icon: <Droplet className="h-7 w-7" />,
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
        },
        {
            title: 'Assainissement',
            description: "Éducation et mise en place de solutions d'hygiène.",
            icon: <Users className="h-7 w-7" />,
            image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
        },
        {
            title: 'Développement Fluvial',
            description: "Nettoyage et réhabilitation des cours d'eau.",
            icon: <Waves className="h-7 w-7" />,
            image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80',
        },
        {
            title: 'Sensibilisation',
            description: "Campagnes d'éducation environnementale.",
            icon: <Sprout className="h-7 w-7" />,
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
        },
    ];

    return (
        <section id="actions" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        Nos Domaines d'Action
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Découvrez comment nous protégeons l'eau et
                        l'environnement
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {actions.map((action, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:scale-[1.02] hover:shadow-2xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={action.image}
                                    alt={action.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="relative p-6">
                                <div className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg">
                                    {action.icon}
                                </div>
                                <h3 className="mt-4 mb-3 text-xl font-bold text-foreground">
                                    {action.title}
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    {action.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-primary transition-all group-hover:gap-2">
                                    En savoir plus{' '}
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
