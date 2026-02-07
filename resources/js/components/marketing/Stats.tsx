import { ReactNode } from 'react';

interface StatProps {
    value: string;
    label: string;
    icon?: ReactNode;
    suffix?: string;
}

interface StatsGridProps {
    stats: StatProps[];
    columns?: 2 | 3 | 4;
    variant?: 'default' | 'bordered' | 'minimal';
}

export default function StatsGrid({
    stats,
    columns = 4,
    variant = 'default',
}: StatsGridProps) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid gap-6 ${gridCols[columns]}`}>
            {stats.map((stat, index) => (
                <Stat key={index} {...stat} variant={variant} />
            ))}
        </div>
    );
}

interface StatItemProps extends StatProps {
    variant?: 'default' | 'bordered' | 'minimal';
}

function Stat({
    value,
    label,
    icon,
    suffix,
    variant = 'default',
}: StatItemProps) {
    const variants = {
        default: 'rounded-lg bg-card border border-border p-6 shadow-sm',
        bordered: 'rounded-lg border-2 border-primary/20 bg-primary/5 p-6',
        minimal: 'p-4',
    };

    return (
        <div className={variants[variant]}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">
                            {value}
                        </span>
                        {suffix && (
                            <span className="text-2xl font-semibold text-primary">
                                {suffix}
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                        {label}
                    </p>
                </div>

                {icon && (
                    <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
