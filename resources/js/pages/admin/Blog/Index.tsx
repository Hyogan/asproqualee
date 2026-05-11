import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/confirm-modal';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PenLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Post {
    id: number;
    title: string;
    slug: string;
    status: string;
    author: string;
    category: string;
    published_at: string | null;
}

interface PaginatedPosts {
    data: Post[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    posts: PaginatedPosts;
    filters: { status: string };
}

const STATUS_COLORS: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-yellow-100 text-yellow-700',
};

const STATUS_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'published', label: 'Publiés' },
    { value: 'draft', label: 'Brouillons' },
];

export default function AdminBlogIndex() {
    const { posts, filters } = usePage<Props>().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, slug: '', title: '' });

    const destroy = (post: Post) => setDeleteModal({ open: true, slug: post.slug, title: post.title });
    const closeModal = () => setDeleteModal(m => ({ ...m, open: false }));

    const filterStatus = (status: string) => {
        router.get(admin.blog.index().url, status ? { status } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Blog', href: '/admin/blog' },
            ]}
        >
            <Head title="Blog — Admin" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">
                        Articles
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                                <Button
                                    key={opt.value}
                                    onClick={() => filterStatus(opt.value)}
                                    className={cn(
                                        'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                        filters.status === opt.value ||
                                            (!filters.status &&
                                                opt.value === '')
                                            ? 'bg-primary text-white'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                    )}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </div>
                        <Link
                            href="/admin/blog/create"
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Nouvel article
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                    Titre
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                    Catégorie
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                    Auteur
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                    Publication
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                    Statut
                                </th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {posts.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        Aucun article.
                                    </td>
                                </tr>
                            ) : (
                                posts.data.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-foreground">
                                                {post.title}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                /blog/post/{post.slug}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {post.category}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {post.author}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {post.published_at ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={cn(
                                                    'rounded-full px-2.5 py-1 text-xs font-semibold',
                                                    STATUS_COLORS[
                                                        post.status
                                                    ] ??
                                                        'bg-muted text-muted-foreground',
                                                )}
                                            >
                                                {post.status === 'published'
                                                    ? 'Publié'
                                                    : 'Brouillon'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/blog/${post.slug}/edit`}
                                                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                                >
                                                    <PenLine className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        destroy(post)
                                                    }
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

                {posts.links.some((l) => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {posts.links.map((link, i) =>
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
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
                onConfirm={() => router.delete(admin.blog.destroy(deleteModal.slug))}
                title="Supprimer l'article"
                description={`Voulez-vous vraiment supprimer "${deleteModal.title}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                icon={<Trash2 className="h-5 w-5 text-destructive" />}
            />
        </AppLayout>
    );
}
