import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, DollarSign, Mail, Users } from 'lucide-react';

interface Stats {
    donations: number;
    volunteers: number;
    messages: number;
    blog_posts: number;
}

interface Donation {
    id: number;
    first_name: string | null;
    last_name: string | null;
    amount: number;
    frequency: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recent_donations: Donation[];
}

const STATUS_COLORS: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard({ stats, recent_donations }: Props) {
    const cards = [
        { label: 'Dons reçus',           value: stats.donations,  icon: DollarSign, href: '/admin/donations', color: 'text-primary' },
        { label: 'Candidatures bénévoles', value: stats.volunteers, icon: Users,      href: '/admin/volunteers', color: 'text-secondary' },
        { label: 'Messages non lus',      value: stats.messages,   icon: Mail,       href: '/admin/messages', color: 'text-accent' },
        { label: 'Articles de blog',      value: stats.blog_posts, icon: BookOpen,   href: '/admin/blog', color: 'text-primary' },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }]}>
            <Head title="Tableau de bord — Admin" />

            <div className="p-6 space-y-8">
                <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
                        >
                            <div className="rounded-xl bg-muted p-3">
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                                <div className="text-sm text-muted-foreground">{card.label}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Recent donations */}
                <div className="rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h2 className="font-semibold text-foreground">Derniers dons</h2>
                        <Link href="/admin/donations" className="text-sm font-medium text-primary hover:underline">
                            Voir tout
                        </Link>
                    </div>

                    {recent_donations.length === 0 ? (
                        <p className="px-6 py-8 text-center text-muted-foreground">Aucun don pour l'instant.</p>
                    ) : (
                        <div className="divide-y divide-border">
                            {recent_donations.map((d) => (
                                <div key={d.id} className="flex items-center justify-between px-6 py-3">
                                    <div>
                                        <div className="font-medium text-foreground">
                                            {d.first_name && d.last_name
                                                ? `${d.first_name} ${d.last_name}`
                                                : 'Anonyme'}
                                        </div>
                                        <div className="text-sm text-muted-foreground capitalize">{d.frequency}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-primary">{d.amount} FCFA</span>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[d.status] ?? 'bg-muted text-muted-foreground'}`}>
                                            {d.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
