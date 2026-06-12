import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, DollarSign, Folder, GraduationCap, Mail, ShoppingBag, Users, Zap } from 'lucide-react';

interface Stats {
    donations: number;
    donations_total: number;
    volunteers: number;
    volunteers_pending: number;
    messages: number;
    blog_posts: number;
    actions: number;
    programs: number;
    products: number;
    projects: number;
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

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    status: string;
    created_at: string;
}

interface VolunteerRow {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recent_donations: Donation[];
    recent_messages: Message[];
    recent_volunteers: VolunteerRow[];
}

const DONATION_STATUS: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const VOLUNTEER_STATUS: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    active:    'bg-green-100 text-green-700',
    inactive:  'bg-gray-100 text-gray-500',
};

const MESSAGE_STATUS: Record<string, string> = {
    new:      'bg-primary/10 text-primary',
    read:     'bg-muted text-muted-foreground',
    resolved: 'bg-green-100 text-green-700',
};

export default function AdminDashboard({ stats, recent_donations, recent_messages, recent_volunteers }: Props) {
    const cards = [
        { label: 'Dons reçus',       value: stats.donations,  sub: `${stats.donations_total.toLocaleString()} FCFA confirmés`, icon: DollarSign,    href: '/admin/donations',  color: 'text-primary' },
        { label: 'Bénévoles',        value: stats.volunteers, sub: `${stats.volunteers_pending} en attente`,                   icon: Users,         href: '/admin/volunteers', color: 'text-secondary' },
        { label: 'Messages non lus', value: stats.messages,   sub: 'nouveaux messages',                                       icon: Mail,          href: '/admin/messages',   color: 'text-accent' },
        { label: 'Articles',         value: stats.blog_posts, sub: 'publiés',                                                 icon: BookOpen,      href: '/admin/blog',       color: 'text-primary' },
        { label: 'Actions',          value: stats.actions,    sub: 'campagnes',                                               icon: Zap,           href: '/admin/actions',    color: 'text-blue-500' },
        { label: 'Programmes',       value: stats.programs,   sub: 'actifs',                                                  icon: GraduationCap, href: '/admin/programs',   color: 'text-indigo-500' },
        { label: 'Produits',         value: stats.products,   sub: 'référencés',                                              icon: ShoppingBag,   href: '/admin/products',   color: 'text-emerald-500' },
        { label: 'Projets',          value: stats.projects,   sub: 'en cours',                                                icon: Folder,        href: '/admin/projects',   color: 'text-amber-500' },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }]}>
            <Head title="Tableau de bord — Admin" />

            <div className="space-y-8 p-6">
                <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>

                {/* Stats grid */}
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
                            <div className="min-w-0">
                                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                                <div className="text-sm font-medium text-foreground">{card.label}</div>
                                <div className="truncate text-xs text-muted-foreground">{card.sub}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom row: recent donations + recent messages + recent volunteers */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Recent donations */}
                    <div className="rounded-xl border border-border bg-card">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-semibold text-foreground">Derniers dons</h2>
                            <Link href="/admin/donations" className="text-xs font-medium text-primary hover:underline">Voir tout</Link>
                        </div>
                        {recent_donations.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Aucun don.</p>
                        ) : (
                            <div className="divide-y divide-border">
                                {recent_donations.map((d) => (
                                    <div key={d.id} className="flex items-center justify-between px-5 py-3">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium text-foreground">
                                                {d.first_name && d.last_name ? `${d.first_name} ${d.last_name}` : 'Anonyme'}
                                            </div>
                                            <div className="text-xs text-muted-foreground capitalize">{d.frequency}</div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-2 pl-3">
                                            <span className="text-sm font-bold text-primary">{d.amount.toLocaleString()} F</span>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${DONATION_STATUS[d.status] ?? 'bg-muted text-muted-foreground'}`}>
                                                {d.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent messages */}
                    <div className="rounded-xl border border-border bg-card">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-semibold text-foreground">Derniers messages</h2>
                            <Link href="/admin/messages" className="text-xs font-medium text-primary hover:underline">Voir tout</Link>
                        </div>
                        {recent_messages.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Aucun message.</p>
                        ) : (
                            <div className="divide-y divide-border">
                                {recent_messages.map((m) => (
                                    <Link key={m.id} href={`/admin/messages/${m.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium text-foreground">{m.name}</div>
                                            <div className="truncate text-xs text-muted-foreground">{m.subject ?? m.email}</div>
                                        </div>
                                        <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${MESSAGE_STATUS[m.status] ?? 'bg-muted text-muted-foreground'}`}>
                                            {m.status}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent volunteers */}
                    <div className="rounded-xl border border-border bg-card">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-semibold text-foreground">Derniers bénévoles</h2>
                            <Link href="/admin/volunteers" className="text-xs font-medium text-primary hover:underline">Voir tout</Link>
                        </div>
                        {recent_volunteers.length === 0 ? (
                            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Aucune candidature.</p>
                        ) : (
                            <div className="divide-y divide-border">
                                {recent_volunteers.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between px-5 py-3">
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium text-foreground">{v.first_name} {v.last_name}</div>
                                            <div className="truncate text-xs text-muted-foreground">{v.email}</div>
                                        </div>
                                        <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${VOLUNTEER_STATUS[v.status] ?? 'bg-muted text-muted-foreground'}`}>
                                            {v.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
