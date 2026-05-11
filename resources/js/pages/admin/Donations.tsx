import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Donation {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    amount: number;
    frequency: string;
    anonymous: boolean;
    status: string;
    created_at: string;
}

interface PaginatedDonations {
    data: Donation[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    donations: PaginatedDonations;
    filters: { status: string };
}

const STATUS_COLORS: Record<string, string> = {
    pending:   'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmé' },
    { value: 'cancelled', label: 'Annulé' },
];

export default function AdminDonations() {
    const { donations, filters } = usePage<Props>().props;

    const updateStatus = (donation: Donation, status: string) => {
        router.patch(`/admin/donations/${donation.id}/status`, { status });
    };

    const filterStatus = (status: string) => {
        router.get('/admin/donations', status ? { status } : {}, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Dons', href: '/admin/donations' }]}>
            <Head title="Dons — Admin" />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Dons</h1>
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
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Donateur</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                                <th className="px-4 py-3 text-right font-semibold text-foreground">Montant</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Fréquence</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Statut</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {donations.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                                        Aucun don trouvé.
                                    </td>
                                </tr>
                            ) : (
                                donations.data.map((d) => (
                                    <tr key={d.id} className="hover:bg-muted/30">
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {d.anonymous ? 'Anonyme' : `${d.first_name ?? ''} ${d.last_name ?? ''}`}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{d.email}</td>
                                        <td className="px-4 py-3 text-right font-bold text-primary">{d.amount} FCFA</td>
                                        <td className="px-4 py-3 capitalize text-muted-foreground">{d.frequency}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(d.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', STATUS_COLORS[d.status] ?? 'bg-muted text-muted-foreground')}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={d.status}
                                                onChange={(e) => updateStatus(d, e.target.value)}
                                                className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                                            >
                                                <option value="pending">En attente</option>
                                                <option value="confirmed">Confirmer</option>
                                                <option value="cancelled">Annuler</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {donations.links.some((l) => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {donations.links.map((link, i) =>
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
