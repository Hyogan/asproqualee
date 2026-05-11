import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Action {
    id: number;
    title: string;
    category: string;
    date: string;
    location: string | null;
    participants: number;
    status: 'upcoming' | 'ongoing' | 'completed';
}

interface PaginatedActions {
    data: Action[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    actions: PaginatedActions;
    filters: { status: string };
}

const STATUS_COLORS: Record<string, string> = {
    upcoming:  'bg-blue-100 text-blue-700',
    ongoing:   'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<string, string> = {
    upcoming:  'À venir',
    ongoing:   'En cours',
    completed: 'Terminée',
};

const STATUS_OPTIONS = [
    { value: '',          label: 'Toutes' },
    { value: 'upcoming',  label: 'À venir' },
    { value: 'ongoing',   label: 'En cours' },
    { value: 'completed', label: 'Terminées' },
];

export default function AdminActionsIndex() {
    const { actions, filters } = usePage<Props>().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, title: '' });

    const destroy = (action: Action) =>
        setDeleteModal({ open: true, id: action.id, title: action.title });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    const filterStatus = (status: string) => {
        router.get('/admin/actions', status ? { status } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Actions', href: '/admin/actions' },
            ]}
        >
            <Head title="Actions — Admin" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Actions</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => filterStatus(opt.value)}
                                    className={cn(
                                        'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                        filters.status === opt.value ||
                                            (!filters.status && opt.value === '')
                                            ? 'bg-primary text-white'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                    )}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <Link
                            href="/admin/actions/create"
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Nouvelle action
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Titre</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Catégorie</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Lieu</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Participants</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Statut</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {actions.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                                        Aucune action.
                                    </td>
                                </tr>
                            ) : (
                                actions.data.map((action) => (
                                    <tr key={action.id} className="hover:bg-muted/30">
                                        <td className="px-4 py-3 font-medium text-foreground">
                                            {action.title}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {action.category}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {action.date}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {action.location ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {action.participants}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={cn(
                                                'rounded-full px-2.5 py-1 text-xs font-semibold',
                                                STATUS_COLORS[action.status] ?? 'bg-muted text-muted-foreground',
                                            )}>
                                                {STATUS_LABELS[action.status] ?? action.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/actions/${action.id}/edit`}
                                                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                >
                                                    <PenLine className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => destroy(action)}
                                                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {actions.links.some((l) => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {actions.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={cn(
                                        'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                        link.active
                                            ? 'bg-primary text-white'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                    )}
                                />
                            ) : null,
                        )}
                    </div>
                )}
            </div>

            <ConfirmModal
                open={deleteModal.open}
                onClose={closeModal}
                onConfirm={() => router.delete(`/admin/actions/${deleteModal.id}`, { onFinish: closeModal })}
                title="Supprimer l'action"
                description={`Voulez-vous vraiment supprimer "${deleteModal.title}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />}
            />
        </AppLayout>
    );
}
