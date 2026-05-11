import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    category: string;
    status: 'en-cours' | 'terminé' | 'planifié';
    location: string | null;
    progress: number;
    is_active: boolean;
    order: number;
}

interface PaginatedProjects {
    data: Project[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    projects: PaginatedProjects;
}

const STATUS_STYLES: Record<string, string> = {
    'en-cours': 'bg-blue-100 text-blue-700',
    'terminé':  'bg-green-100 text-green-700',
    'planifié': 'bg-gray-100 text-gray-500',
};

const STATUS_LABELS: Record<string, string> = {
    'en-cours': 'En cours',
    'terminé':  'Terminé',
    'planifié': 'Planifié',
};

export default function AdminProjectsIndex() {
    const { projects } = usePage<Props>().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, title: '' });

    const destroy = (p: Project) => setDeleteModal({ open: true, id: p.id, title: p.title });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Projets', href: '/admin/projects' }]}>
            <Head title="Projets — Admin" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Projets</h1>
                    <Link href="/admin/projects/create" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                        <Plus className="h-4 w-4" /> Nouveau projet
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Titre</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Catégorie</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Statut</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Lieu</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Progression</th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">Actif</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.data.length === 0 ? (
                                <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">Aucun projet.</td></tr>
                            ) : projects.data.map(p => (
                                <tr key={p.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                                    <td className="px-4 py-3">
                                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', STATUS_STYLES[p.status] ?? STATUS_STYLES['planifié'])}>
                                            {STATUS_LABELS[p.status] ?? p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.location ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                                                <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground">{p.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')}>
                                            {p.is_active ? 'Oui' : 'Non'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/projects/${p.id}/edit`} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
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

                {projects.links.some(l => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {projects.links.map((link, i) => link.url ? (
                            <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }}
                                className={cn('rounded-lg px-3 py-1.5 text-sm font-medium transition-all', link.active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70')} />
                        ) : null)}
                    </div>
                )}
            </div>

            <ConfirmModal open={deleteModal.open} onClose={closeModal}
                onConfirm={() => router.delete(`/admin/projects/${deleteModal.id}`, { onFinish: closeModal })}
                title="Supprimer le projet"
                description={`Voulez-vous vraiment supprimer "${deleteModal.title}" ?`}
                confirmText="Supprimer" cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />} />
        </AppLayout>
    );
}
