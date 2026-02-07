import { cn } from '@/lib/utils';
import { ArrowRight, Droplet } from 'lucide-react';
import React, { useState } from 'react';

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);

    React.useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
                    alt="Hero"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <div
                        className={cn(
                            'mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm transition-all duration-700',
                            isLoaded
                                ? 'translate-y-0 opacity-100'
                                : '-translate-y-4 opacity-0',
                        )}
                    >
                        <div className="flex items-center gap-4 text-sm font-medium text-white/90 md:text-base">
                            <span
                                className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-full bg-primary backdrop-blur-sm transition-all',
                                )}
                            >
                                <Droplet className="h-6 w-6 text-white" />
                            </span>{' '}
                            Association de Protection de l'Eau et de
                            l'Environnement
                        </div>
                    </div>

                    <h1
                        className={cn(
                            'mb-6 text-4xl leading-tight font-bold text-white transition-all duration-700 md:text-6xl lg:text-7xl',
                            isLoaded
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0',
                        )}
                    >
                        Protéger l'Eau
                        <br />
                        Préserver la Vie
                    </h1>

                    <p
                        className={cn(
                            'mx-auto mb-10 max-w-2xl text-lg text-white/90 transition-all delay-300 duration-700 md:text-xl',
                            isLoaded
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0',
                        )}
                    >
                        Nous agissons pour protéger la qualité de l'eau,
                        prévenir les maladies hydriques et préserver
                        l'environnement pour les générations futures.
                    </p>

                    <div
                        className={cn(
                            'flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-700 sm:flex-row',
                            isLoaded
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0',
                        )}
                    >
                        <a
                            href="#actions"
                            className="group hover:bg-primary-deep flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
                        >
                            Nos Actions
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#mission"
                            className="rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
                        >
                            Notre Mission
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-2">
                    <div className="h-3 w-1.5 animate-pulse rounded-full bg-white" />
                </div>
            </div>
        </section>
    );
}
