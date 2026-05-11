import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Volunteer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    location: string | null;
    commitment: string | null;
    status: string;
    created_at: string;
}

interface PaginatedVolunteers {
    data: Volunteer[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    volunteers: PaginatedVolunteers;
    filters: { status: string };
}

const STATUS_COLORS: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    active:    'bg-green-100 text-green-700',
    inactive:  'bg-gray-100 text-gray-500',
};

const STATUS_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'pending', label: 'En attente' },
    { value: 'contacted', label: 'Contacté' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
];

export default function AdminVolunteers() {
    const { volunteers, filters } = usePage<Props>().props;

    const updateStatus = (volunteer: Volunteer, status: string) => {
        router.patch(`/admin/volunteers/${volunteer.id}/status`, { status });
    };

    const filterStatus = (status: string) => {
        router.get('/admin/volunteers', status ? { status } : {}, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Bénévoles', href: '/admin/volunteers' }]}>
            <Head title="Bénévoles — Admin" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Candidatures bénévoles</h1>
                    <div className="flex gap-2">
                        {STATUS_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => filterStatus(opt.value)}
                                className={cn(
                                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                    filters.status === opt.value || (!filters.status && opt.value === '')
                                        ? 'bg-primary text-white'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                )}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Nom</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Ville</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Disponibilité</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Statut</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {volunteers.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                                        Aucune candidature.
                                    </td>
                                </tr>
                            ) : (
                                volunteers.data.map((v) => (
                                    <tr key={v.id} className="hover:bg-muted/30">
                                        <td className="px-4 py-3 font-medium text-foreground">{v.first_name} {v.last_name}</td>
                                        <td className="px-4 py-3 text-muted-foreground">{v.email}</td>
                                        <td className="px-4 py-3 text-muted-foreground">{v.location ?? '—'}</td>
                                        <td className="px-4 py-3 text-muted-foreground capitalize">{v.commitment ?? '—'}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(v.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', STATUS_COLORS[v.status] ?? 'bg-muted text-muted-foreground')}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={v.status}
                                                onChange={(e) => updateStatus(v, e.target.value)}
                                                className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                                            >
                                                <option value="pending">En attente</option>
                                                <option value="contacted">Contacter</option>
                                                <option value="active">Activer</option>
                                                <option value="inactive">Désactiver</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {volunteers.links.some((l) => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {volunteers.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={cn(
                                        'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                        link.active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                    )}
                                />
                            ) : null,
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
