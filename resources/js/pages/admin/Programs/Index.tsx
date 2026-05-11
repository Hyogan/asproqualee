import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Program {
    id: number;
    title: string;
    icon: string | null;
    color: string | null;
    order: number;
    is_active: boolean;
}

interface PaginatedPrograms {
    data: Program[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    programs: PaginatedPrograms;
}

export default function AdminProgramsIndex() {
    const { programs } = usePage<Props>().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, title: '' });

    const destroy = (p: Program) => setDeleteModal({ open: true, id: p.id, title: p.title });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Programmes', href: '/admin/programs' }]}>
            <Head title="Programmes — Admin" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Programmes</h1>
                    <Link href="/admin/programs/create" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                        <Plus className="h-4 w-4" /> Nouveau programme
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Titre</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Icône</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Couleur</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Ordre</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Actif</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {programs.data.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Aucun programme.</td></tr>
                            ) : programs.data.map(p => (
                                <tr key={p.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.icon ?? '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.color ?? '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.order}</td>
                                    <td className="px-4 py-3">
                                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')}>
                                            {p.is_active ? 'Oui' : 'Non'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/programs/${p.id}/edit`} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                <PenLine className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => destroy(p)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {programs.links.some(l => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {programs.links.map((link, i) => link.url ? (
                            <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }}
                                className={cn('rounded-lg px-3 py-1.5 text-sm font-medium transition-all', link.active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70')} />
                        ) : null)}
                    </div>
                )}
            </div>

            <ConfirmModal open={deleteModal.open} onClose={closeModal}
                onConfirm={() => router.delete(`/admin/programs/${deleteModal.id}`, { onFinish: closeModal })}
                title="Supprimer le programme"
                description={`Voulez-vous vraiment supprimer "${deleteModal.title}" ?`}
                confirmText="Supprimer" cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />} />
        </AppLayout>
    );
}
