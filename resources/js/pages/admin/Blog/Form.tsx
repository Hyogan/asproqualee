import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Undo,
    Heading2, Heading3, Link as LinkIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Category { id: number; name: string }
interface Tag { id: number; name: string }

interface PostData {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string | null;
    category_id: number;
    tag_ids: number[];
    status: string;
    published_at: string | null;
    read_time: string | null;
}

interface Props extends Record<string, unknown> {
    categories: Category[];
    tags: Tag[];
    post: PostData | null;
}

function ToolbarButton({ onClick, active, title, children }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            title={title}
            className={cn(
                'rounded p-1.5 transition-colors',
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
        >
            {children}
        </button>
    );
}

export default function AdminBlogForm() {
    const { categories, tags, post } = usePage<Props>().props;

    const isEditing = post !== null;

    const [form, setForm] = useState({
        title: post?.title ?? '',
        excerpt: post?.excerpt ?? '',
        image: post?.image ?? '',
        category_id: post?.category_id ?? (categories[0]?.id ?? ''),
        tag_ids: post?.tag_ids ?? [] as number[],
        status: post?.status ?? 'draft',
        published_at: post?.published_at ?? '',
        read_time: post?.read_time ?? '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: 'Rédigez votre article ici…' }),
        ],
        content: post?.content ?? '',
    });

    const toggleTag = (id: number) => {
        setForm((prev) => ({
            ...prev,
            tag_ids: prev.tag_ids.includes(id)
                ? prev.tag_ids.filter((t) => t !== id)
                : [...prev.tag_ids, id],
        }));
    };

    const setLink = () => {
        const url = prompt('URL du lien');
        if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
        } else {
            editor?.chain().focus().unsetLink().run();
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const content = editor?.getHTML() ?? '';
        const payload = { ...form, content, tags: form.tag_ids };

        if (isEditing) {
            router.put(`/admin/blog/${post!.id}`, payload, {
                onError: setErrors,
            });
        } else {
            router.post('/admin/blog', payload, {
                onError: setErrors,
            });
        }
    };

    const field = (key: string) => ({
        className: cn(
            'w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none',
            errors[key] ? 'border-destructive' : 'border-input',
        ),
    });

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Blog', href: '/admin/blog' },
                { title: isEditing ? 'Modifier' : 'Nouvel article', href: '#' },
            ]}
        >
            <Head title={`${isEditing ? 'Modifier' : 'Créer'} un article — Admin`} />

            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">
                            {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
                        </h1>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                onClick={() => setForm((f) => ({ ...f, status: 'draft' }))}
                                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                            >
                                Enregistrer brouillon
                            </button>
                            <button
                                type="submit"
                                onClick={() => setForm((f) => ({ ...f, status: 'published' }))}
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                            >
                                Publier
                            </button>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Titre *</label>
                        <input
                            value={form.title}
                            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                            placeholder="Titre de l'article"
                            {...field('title')}
                        />
                        {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Résumé *</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                            rows={2}
                            placeholder="Courte description affichée dans les listes d'articles"
                            {...field('excerpt')}
                        />
                        {errors.excerpt && <p className="mt-1 text-xs text-destructive">{errors.excerpt}</p>}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Contenu *</label>
                        <div className={cn('overflow-hidden rounded-lg border', errors.content ? 'border-destructive' : 'border-input')}>
                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1.5">
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Gras">
                                    <Bold className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italique">
                                    <Italic className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')} title="Barré">
                                    <Strikethrough className="h-4 w-4" />
                                </ToolbarButton>
                                <div className="mx-1 h-5 w-px bg-border" />
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Titre 2">
                                    <Heading2 className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Titre 3">
                                    <Heading3 className="h-4 w-4" />
                                </ToolbarButton>
                                <div className="mx-1 h-5 w-px bg-border" />
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Liste">
                                    <List className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Liste numérotée">
                                    <ListOrdered className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Citation">
                                    <Quote className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={setLink} active={editor?.isActive('link')} title="Lien">
                                    <LinkIcon className="h-4 w-4" />
                                </ToolbarButton>
                                <div className="mx-1 h-5 w-px bg-border" />
                                <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} title="Annuler">
                                    <Undo className="h-4 w-4" />
                                </ToolbarButton>
                                <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} title="Rétablir">
                                    <Redo className="h-4 w-4" />
                                </ToolbarButton>
                            </div>
                            <EditorContent
                                editor={editor}
                                className="prose max-w-full min-h-[320px] px-4 py-3 text-sm text-foreground focus-within:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px]"
                            />
                        </div>
                        {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
                    </div>

                    {/* Image + Read time */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Image (URL)</label>
                            <input
                                value={form.image}
                                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                                placeholder="https://..."
                                {...field('image')}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Temps de lecture</label>
                            <input
                                value={form.read_time}
                                onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))}
                                placeholder="5 min"
                                {...field('read_time')}
                            />
                        </div>
                    </div>

                    {/* Category + Published at */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Catégorie *</label>
                            <select
                                value={form.category_id}
                                onChange={(e) => setForm((f) => ({ ...f, category_id: Number(e.target.value) }))}
                                {...field('category_id')}
                            >
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-xs text-destructive">{errors.category_id}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Date de publication</label>
                            <input
                                type="date"
                                value={form.published_at}
                                onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
                                {...field('published_at')}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => toggleTag(tag.id)}
                                    className={cn(
                                        'rounded-full px-3 py-1 text-sm font-medium transition-all',
                                        form.tag_ids.includes(tag.id)
                                            ? 'bg-primary text-white'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                    )}
                                >
                                    #{tag.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
