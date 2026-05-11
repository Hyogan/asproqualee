import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
interface Category {
    id: number;
    name: string;
}

interface ActionData {
    id: number;
    title: string;
    category_id: number;
    description: string;
    long_description: string | null;
    image: string | null;
    date: string;
    location: string | null;
    participants: number;
    impact_label: string | null;
    impact_value: string | null;
    status: string;
    gallery: string[];
}

interface Props extends Record<string, unknown> {
    categories: Category[];
    action: ActionData | null;
}

export default function AdminActionForm() {
    const { categories, action } = usePage<Props>().props;
    const isEditing = action !== null;

    const [form, setForm] = useState({
        title: action?.title ?? '',
        category_id: action?.category_id ?? categories[0]?.id ?? '',
        description: action?.description ?? '',
        long_description: action?.long_description ?? '',
        image: action?.image ?? '',
        date: action?.date ?? '',
        location: action?.location ?? '',
        participants: action?.participants ?? 0,
        impact_label: action?.impact_label ?? '',
        impact_value: action?.impact_value ?? '',
        status: action?.status ?? 'upcoming',
        gallery: action?.gallery ?? ([] as string[]),
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: string, value: unknown) =>
        setForm((f) => ({ ...f, [key]: value }));

    const addGalleryUrl = () =>
        setForm((f) => ({ ...f, gallery: [...f.gallery, ''] }));

    const updateGalleryUrl = (index: number, value: string) =>
        setForm((f) => ({
            ...f,
            gallery: f.gallery.map((url, i) => (i === index ? value : url)),
        }));

    const removeGalleryUrl = (index: number) =>
        setForm((f) => ({
            ...f,
            gallery: f.gallery.filter((_, i) => i !== index),
        }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            gallery: form.gallery.filter((url) => url.trim() !== ''),
        };

        if (isEditing) {
            router.put(`/admin/actions/${action!.id}`, payload, {
                onError: setErrors,
            });
        } else {
            router.post('/admin/actions', payload, { onError: setErrors });
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
                { title: 'Actions', href: '/admin/actions' },
                {
                    title: isEditing ? 'Modifier' : 'Nouvelle action',
                    href: '#',
                },
            ]}
        >
            <Head
                title={`${isEditing ? 'Modifier' : 'Créer'} une action — Admin`}
            />

            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">
                            {isEditing
                                ? "Modifier l'action"
                                : 'Nouvelle action'}
                        </h1>
                        <button
                            type="submit"
                            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                        >
                            {isEditing ? 'Enregistrer' : 'Créer'}
                        </button>
                    </div>

                    {/* Title + Status */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Titre *
                            </label>
                            <input
                                value={form.title}
                                onChange={(e) => set('title', e.target.value)}
                                placeholder="Titre de l'action"
                                {...field('title')}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Statut *
                            </label>

                            <Select
                                value={form.status}
                                onValueChange={(value) => set('status', value)}
                            >
                                <SelectTrigger className="w-full text-foreground">
                                    <SelectValue placeholder="Choisir un statut" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="upcoming">
                                        À venir
                                    </SelectItem>
                                    <SelectItem value="ongoing">
                                        En cours
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Terminée
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Category + Date */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Catégorie *
                            </label>
                            <Select
                                value={String(form.category_id)}
                                onValueChange={(value) =>
                                    set('category_id', Number(value))
                                }
                            >
                                <SelectTrigger className="w-full text-foreground">
                                    <SelectValue placeholder="Choisir une catégorie" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem
                                            key={c.id}
                                            value={String(c.id)}
                                        >
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && (
                                <p className="mt-1 text-xs text-destructive">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Date *
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => set('date', e.target.value)}
                                {...field('date')}
                            />
                            {errors.date && (
                                <p className="mt-1 text-xs text-destructive">
                                    {errors.date}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location + Participants */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Lieu
                            </label>
                            <input
                                value={form.location}
                                onChange={(e) =>
                                    set('location', e.target.value)
                                }
                                placeholder="Yaoundé, Douala…"
                                {...field('location')}
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Participants
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={form.participants}
                                onChange={(e) =>
                                    set('participants', Number(e.target.value))
                                }
                                {...field('participants')}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Description courte *
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => set('description', e.target.value)}
                            rows={3}
                            placeholder="Résumé affiché dans la liste des actions"
                            {...field('description')}
                        />
                        {errors.description && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Long description */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Description complète
                        </label>
                        <textarea
                            value={form.long_description ?? ''}
                            onChange={(e) =>
                                set('long_description', e.target.value)
                            }
                            rows={6}
                            placeholder="Détails complets affichés sur la page de l'action"
                            {...field('long_description')}
                        />
                    </div>

                    {/* Image + Impact */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">
                                Image principale (URL)
                            </label>
                            <input
                                value={form.image ?? ''}
                                onChange={(e) => set('image', e.target.value)}
                                placeholder="https://..."
                                {...field('image')}
                            />
                            {errors.image && (
                                <p className="mt-1 text-xs text-destructive">
                                    {errors.image}
                                </p>
                            )}
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Impact — libellé
                                </label>
                                <input
                                    value={form.impact_label ?? ''}
                                    onChange={(e) =>
                                        set('impact_label', e.target.value)
                                    }
                                    placeholder="Ex: Tonnes collectées"
                                    {...field('impact_label')}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">
                                    Impact — valeur
                                </label>
                                <input
                                    value={form.impact_value ?? ''}
                                    onChange={(e) =>
                                        set('impact_value', e.target.value)
                                    }
                                    placeholder="Ex: 2.5"
                                    {...field('impact_value')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">
                                Galerie d'images
                            </label>
                            <button
                                type="button"
                                onClick={addGalleryUrl}
                                className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/70"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                Ajouter une image
                            </button>
                        </div>

                        {form.gallery.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                                Aucune image dans la galerie. Cliquez sur
                                "Ajouter une image" pour commencer.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {form.gallery.map((url, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            value={url}
                                            onChange={(e) =>
                                                updateGalleryUrl(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGalleryUrl(index)
                                            }
                                            className="rounded-md p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
