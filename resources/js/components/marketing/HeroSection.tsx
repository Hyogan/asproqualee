import { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';

interface HeroSectionProps {
    title: ReactNode;
    subtitle?: ReactNode;
    backgroundImage: string;
    badgeText?: string;
    className?: string;
}

export default function HeroSection({
    title,
    subtitle,
    backgroundImage,
    badgeText = 'Nous Sommes Là Pour Vous',
    className = '',
}: HeroSectionProps) {
    return (
        <section
            className={`relative overflow-hidden py-20 lg:py-24 ${className}`}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 z-10 bg-black/70" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 z-20 bg-linear-to-br from-primary/40 via-transparent to-accent/30" />

            {/* Noise / texture */}
            <div
                className="absolute inset-0 z-20 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-30 mx-auto max-w-7xl px-4 text-center lg:px-8">
                {badgeText && (
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3">
                        <MessageCircle className="h-5 w-5 text-white" />
                        <span className="text-sm font-bold text-white">
                            {badgeText}
                        </span>
                    </div>
                )}

                <h1 className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#6B7C7D]">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
