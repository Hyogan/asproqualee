import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Tag extends Record<string, unknown> {
    id: number;
    name: string;
    blog_posts_count: number;
}

interface Props extends Record<string, unknown> {
    tags: Tag[];
}

export default function AdminTags() {
    const { tags } = usePage<Props>().props;
    const [editing, setEditing] = useState<Tag | null>(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, name: '' });

    const createForm = useForm({ name: '' });

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/tags', {
            onSuccess: () => createForm.reset(),
        });
    };

    const editForm = useForm({ name: editing?.name ?? '' });

    const startEdit = (tag: Tag) => {
        setEditing(tag);
        editForm.setData('name', tag.name);
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        editForm.put(`/admin/tags/${editing.id}`, {
            onSuccess: () => setEditing(null),
        });
    };

    const destroy = (tag: Tag) => setDeleteModal({ open: true, id: tag.id, name: tag.name });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Tags', href: '/admin/tags' },
            ]}
        >
            <Head title="Tags — Admin" />

            <div className="max-w-2xl space-y-6 p-6">
                <h1 className="text-2xl font-bold text-foreground">Tags</h1>

                {/* Create */}
                <form
                    onSubmit={submitCreate}
                    className="space-y-3 rounded-xl border border-border bg-card p-5"
                >
                    <h2 className="font-semibold text-foreground">
                        Nouveau tag
                    </h2>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <input
                                value={createForm.data.name}
                                onChange={(e) =>
                                    createForm.setData('name', e.target.value)
                                }
                                placeholder="Nom du tag"
                                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            />
                            {createForm.errors.name && (
                                <p className="mt-1 text-xs text-destructive">
                                    {createForm.errors.name}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={createForm.processing}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter
                        </button>
                    </div>
                </form>

                {/* Tag cloud / list */}
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    {tags.length === 0 ? (
                        <p className="px-6 py-10 text-center text-muted-foreground">
                            Aucun tag.
                        </p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {tags.map((tag) =>
                                editing?.id === tag.id ? (
                                    <li key={tag.id} className="px-5 py-3">
                                        <form
                                            onSubmit={submitEdit}
                                            className="flex items-center gap-3"
                                        >
                                            <input
                                                value={editForm.data.name}
                                                onChange={(e) =>
                                                    editForm.setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90"
                                            >
                                                Enregistrer
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditing(null)}
                                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            {editForm.errors.name && (
                                                <p className="text-xs text-destructive">
                                                    {editForm.errors.name}
                                                </p>
                                            )}
                                        </form>
                                    </li>
                                ) : (
                                    <li
                                        key={tag.id}
                                        className="flex items-center justify-between px-5 py-3 hover:bg-muted/30"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                                #{tag.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {tag.blog_posts_count} article
                                                {tag.blog_posts_count !== 1
                                                    ? 's'
                                                    : ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => startEdit(tag)}
                                                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            >
                                                <PenLine className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => destroy(tag)}
                                                className="rounded-md p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </li>
                                ),
                            )}
                        </ul>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={deleteModal.open}
                onClose={closeModal}
                onConfirm={() => router.delete(`/admin/tags/${deleteModal.id}`)}
                title="Supprimer le tag"
                description={`Voulez-vous vraiment supprimer "#${deleteModal.name}" ? Il sera retiré de tous les articles.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />}
            />
        </AppLayout>
    );
}
