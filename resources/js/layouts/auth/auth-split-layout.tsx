import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps, SharedData } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Left panel — hero image with overlay */}
            <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden">
                <img
                    src="/images/water-protection-hero.jpg"
                    alt="Water protection"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />

                {/* Logo + name */}
                <Link
                    href="/"
                    className="relative z-10 flex items-center gap-3 text-white"
                >
                    <AppLogoIcon size="md" className="rounded-md ring-2 ring-white/30" />
                    <span className="text-xl font-semibold tracking-wide">{name}</span>
                </Link>

                {/* Bottom tagline */}
                <div className="relative z-10">
                    <p className="text-2xl font-bold text-white leading-snug">
                        Protéger l'eau,<br />
                        préserver l'avenir.
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                        Plateforme de gestion qualité &amp; environnement
                    </p>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="flex flex-col items-center justify-center bg-white px-6 py-12 sm:px-12">
                {/* Mobile logo */}
                <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
                    <AppLogoIcon size="md" />
                    <span className="text-lg font-semibold text-gray-900">{name}</span>
                </Link>

                <div className="w-full max-w-sm">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
