import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    background?: 'default' | 'muted' | 'accent' | 'primary';
    padding?: 'none' | 'sm' | 'default' | 'lg';
    container?: boolean;
}

export default function Section({
    children,
    className = '',
    background = 'default',
    padding = 'default',
    container = true,
}: SectionProps) {
    const bgClasses = {
        default: 'bg-background',
        muted: 'bg-muted/30',
        accent: 'bg-accent/5',
        primary: 'bg-primary/5',
    };

    const paddingClasses = {
        none: '',
        sm: 'py-8 lg:py-12',
        default: 'py-12 lg:py-20',
        lg: 'py-16 lg:py-28',
    };

    const content = container ? (
        <div className="mx-auto max-w-7xl px-4 lg:px-8">{children}</div>
    ) : (
        children
    );

    return (
        <section
            className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
        >
            {content}
        </section>
    );
}

// Section Header Component
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    align?: 'left' | 'center';
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    description,
    align = 'center',
    className = '',
}: SectionHeaderProps) {
    const alignClasses =
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left';

    return (
        <div className={`mb-12 lg:mb-16 ${alignClasses} ${className}`}>
            {subtitle && (
                <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
                    {subtitle}
                </p>
            )}

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    );
}
