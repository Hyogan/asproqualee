import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Category extends Record<string, unknown> {
    id: number;
    name: string;
    icon: string | null;
    blog_posts_count: number;
}

interface Props extends Record<string, unknown> {
    categories: Category[];
}

export default function AdminCategories() {
    const { categories } = usePage<Props>().props;
    const [editing, setEditing] = useState<Category | null>(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, id: 0, name: '' });

    // Create form
    const createForm = useForm({ name: '', icon: '' });

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/categories', {
            onSuccess: () => createForm.reset(),
        });
    };

    // Edit form
    const editForm = useForm({ name: editing?.name ?? '', icon: editing?.icon ?? '' });

    const startEdit = (cat: Category) => {
        setEditing(cat);
        editForm.setData({ name: cat.name, icon: cat.icon ?? '' });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        editForm.put(`/admin/categories/${editing.id}`, {
            onSuccess: () => setEditing(null),
        });
    };

    const destroy = (cat: Category) => setDeleteModal({ open: true, id: cat.id, name: cat.name });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Catégories', href: '/admin/categories' }]}>
            <Head title="Catégories — Admin" />

            <div className="p-6 space-y-6 max-w-2xl">
                <h1 className="text-2xl font-bold text-foreground">Catégories</h1>

                {/* Create */}
                <form onSubmit={submitCreate} className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <h2 className="font-semibold text-foreground">Nouvelle catégorie</h2>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <input
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="Nom de la catégorie"
                                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            />
                            {createForm.errors.name && (
                                <p className="mt-1 text-xs text-destructive">{createForm.errors.name}</p>
                            )}
                        </div>
                        <input
                            value={createForm.data.icon}
                            onChange={(e) => createForm.setData('icon', e.target.value)}
                            placeholder="Icône (optionnel)"
                            className="w-36 rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                        />
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

                {/* List */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {categories.length === 0 ? (
                        <p className="px-6 py-10 text-center text-muted-foreground">Aucune catégorie.</p>
                    ) : (
                        <ul className="divide-y divide-border">
                            {categories.map((cat) =>
                                editing?.id === cat.id ? (
                                    <li key={cat.id} className="px-5 py-3">
                                        <form onSubmit={submitEdit} className="flex gap-3 items-center">
                                            <input
                                                value={editForm.data.name}
                                                onChange={(e) => editForm.setData('name', e.target.value)}
                                                className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                            />
                                            <input
                                                value={editForm.data.icon}
                                                onChange={(e) => editForm.setData('icon', e.target.value)}
                                                placeholder="Icône"
                                                className="w-32 rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                            />
                                            <button type="submit" className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90">
                                                Enregistrer
                                            </button>
                                            <button type="button" onClick={() => setEditing(null)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                                                <X className="h-4 w-4" />
                                            </button>
                                            {editForm.errors.name && (
                                                <p className="text-xs text-destructive">{editForm.errors.name}</p>
                                            )}
                                        </form>
                                    </li>
                                ) : (
                                    <li key={cat.id} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30">
                                        <div>
                                            <span className="font-medium text-foreground">{cat.name}</span>
                                            {cat.icon && <span className="ml-2 text-xs text-muted-foreground">{cat.icon}</span>}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted-foreground">
                                                {cat.blog_posts_count} article{cat.blog_posts_count !== 1 ? 's' : ''}
                                            </span>
                                            <button onClick={() => startEdit(cat)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                                                <PenLine className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => destroy(cat)}
                                                disabled={cat.blog_posts_count > 0}
                                                title={cat.blog_posts_count > 0 ? `Utilisée par ${cat.blog_posts_count} article(s)` : 'Supprimer'}
                                                className="rounded-md p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
            </div>
            <ConfirmModal
                open={deleteModal.open}
                onClose={closeModal}
                onConfirm={() => router.delete(`/admin/categories/${deleteModal.id}`)}
                title="Supprimer la catégorie"
                description={`Voulez-vous vraiment supprimer "${deleteModal.name}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />}
            />
        </AppLayout>
    );
}
