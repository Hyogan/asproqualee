export default function CTASection() {
    return (
        <section
            id="donate"
            className="bg-gradient-to-br from-primary to-primary-deep py-16 md:py-24"
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center text-white">
                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                        Rejoignez Notre Mouvement
                    </h2>
                    <p className="mb-8 text-xl text-white/90">
                        Ensemble, protégeons l'eau pour les générations futures
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90 hover:shadow-xl">
                            Devenir bénévole
                        </button>
                        <button className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20">
                            Faire un don
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
