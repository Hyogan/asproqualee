import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

// Base Card - Softer Design
interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div
            className={`rounded-2xl border-2 border-[#E8E5E0] bg-white shadow-sm ${
                hover
                    ? 'transition-all duration-300 hover:-translate-y-2 hover:border-[#5CBDB9]/30 hover:shadow-lg'
                    : ''
            } ${className}`}
        >
            {children}
        </div>
    );
}

// Project Card - Friendlier
interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    location?: string;
    impact?: string;
    href: string;
}

export function ProjectCard({
    title,
    description,
    image,
    location,
    impact,
    href,
}: ProjectCardProps) {
    return (
        <Link href={href} className="group block">
            <Card hover className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {impact && (
                        <div className="absolute right-4 bottom-4 rounded-xl bg-gradient-to-r from-[#F28482] to-[#FFB5B3] px-4 py-2 text-sm font-bold text-white shadow-lg">
                            {impact}
                        </div>
                    )}
                    {/* Decorative corner */}
                    <div className="absolute top-0 left-0 h-20 w-20 rounded-br-[3rem] bg-[#5CBDB9] opacity-80" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                    {location && (
                        <div className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-[#5CBDB9]">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#5CBDB9]" />
                            {location}
                        </div>
                    )}

                    <h3 className="mb-3 text-xl font-bold text-[#2D3E3F] transition-colors group-hover:text-[#5CBDB9]">
                        {title}
                    </h3>

                    <p className="mb-4 flex-1 leading-relaxed text-[#6B7C7D]">
                        {description}
                    </p>

                    <div className="flex items-center text-sm font-bold text-[#5CBDB9]">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// News Card - Softer
interface NewsCardProps {
    title: string;
    excerpt: string;
    image?: string;
    date: string;
    category?: string;
    href: string;
}

export function NewsCard({
    title,
    excerpt,
    image,
    date,
    category,
    href,
}: NewsCardProps) {
    return (
        <Link href={href} className="group block">
            <Card hover className="flex h-full flex-col overflow-hidden">
                {image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#5CBDB9]/10 to-[#84C7A6]/10">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-3 text-sm">
                        <time className="text-[#6B7C7D]">{date}</time>
                        {category && (
                            <>
                                <span className="text-[#E8E5E0]">•</span>
                                <span className="inline-flex items-center rounded-full bg-[#84C7A6]/10 px-3 py-1 text-xs font-semibold text-[#4A9C98]">
                                    {category}
                                </span>
                            </>
                        )}
                    </div>

                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-[#2D3E3F] transition-colors group-hover:text-[#5CBDB9]">
                        {title}
                    </h3>

                    <p className="mb-4 line-clamp-3 flex-1 leading-relaxed text-[#6B7C7D]">
                        {excerpt}
                    </p>

                    <div className="flex items-center text-sm font-bold text-[#5CBDB9]">
                        Lire l'article
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Program Card - Playful
interface ProgramCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
    color?: 'teal' | 'coral' | 'mint' | 'blue';
}

export function ProgramCard({
    icon,
    title,
    description,
    href,
    color = 'teal',
}: ProgramCardProps) {
    const colors = {
        teal: {
            bg: 'bg-[#5CBDB9]/10',
            hoverBg: 'group-hover:bg-[#5CBDB9]',
            text: 'text-[#5CBDB9]',
            hoverText: 'group-hover:text-white',
        },
        coral: {
            bg: 'bg-[#F28482]/10',
            hoverBg: 'group-hover:bg-[#F28482]',
            text: 'text-[#F28482]',
            hoverText: 'group-hover:text-white',
        },
        mint: {
            bg: 'bg-[#84C7A6]/10',
            hoverBg: 'group-hover:bg-[#84C7A6]',
            text: 'text-[#84C7A6]',
            hoverText: 'group-hover:text-white',
        },
        blue: {
            bg: 'bg-[#90C9E8]/10',
            hoverBg: 'group-hover:bg-[#90C9E8]',
            text: 'text-[#90C9E8]',
            hoverText: 'group-hover:text-white',
        },
    };

    const colorScheme = colors[color];

    return (
        <Link href={href} className="group block">
            <Card hover className="relative h-full overflow-hidden p-8">
                {/* Decorative blob */}
                <div
                    className={`absolute -top-10 -right-10 h-32 w-32 ${colorScheme.bg} rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-100`}
                />

                <div className="relative">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorScheme.bg} ${colorScheme.text} ${colorScheme.hoverBg} ${colorScheme.hoverText} mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                        {icon}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-[#2D3E3F] transition-colors group-hover:text-[#5CBDB9]">
                        {title}
                    </h3>

                    <p className="mb-6 leading-relaxed text-[#6B7C7D]">
                        {description}
                    </p>

                    <div
                        className={`flex items-center text-sm font-bold ${colorScheme.text}`}
                    >
                        Découvrir
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}
