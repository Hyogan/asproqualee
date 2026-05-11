import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ProjectData {
    id: number;
    title: string;
    category: string;
    status: 'en-cours' | 'terminé' | 'planifié';
    description: string;
    image: string | null;
    location: string | null;
    progress: number;
    impact_goal: string | null;
    impact_value: string | null;
    is_active: boolean;
    order: number;
}

interface Props extends Record<string, unknown> {
    project: ProjectData | null;
}

export default function AdminProjectForm() {
    const { project } = usePage<Props>().props;
    const isEditing = project !== null;

    const [form, setForm] = useState({
        title:        project?.title ?? '',
        category:     project?.category ?? '',
        status:       project?.status ?? 'planifié',
        description:  project?.description ?? '',
        image:        project?.image ?? '',
        location:     project?.location ?? '',
        progress:     project?.progress ?? 0,
        impact_goal:  project?.impact_goal ?? '',
        impact_value: project?.impact_value ?? '',
        is_active:    project?.is_active ?? true,
        order:        project?.order ?? 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            router.put(`/admin/projects/${project!.id}`, form, { onError: setErrors });
        } else {
            router.post('/admin/projects', form, { onError: setErrors });
        }
    };

    const field = (key: string) => ({
        className: cn('w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none', errors[key] ? 'border-destructive' : 'border-input'),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Projets', href: '/admin/projects' }, { title: isEditing ? 'Modifier' : 'Nouveau', href: '#' }]}>
            <Head title={`${isEditing ? 'Modifier' : 'Créer'} un projet — Admin`} />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">{isEditing ? 'Modifier le projet' : 'Nouveau projet'}</h1>
                        <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                            {isEditing ? 'Enregistrer' : 'Créer'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Titre *</label>
                            <input value={form.title} onChange={e => set('title', e.target.value)} {...field('title')} />
                            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Catégorie *</label>
                            <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="Ex: Eau & Assainissement" {...field('category')} />
                            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Statut *</label>
                            <select value={form.status} onChange={e => set('status', e.target.value)} {...field('status')}>
                                <option value="planifié">Planifié</option>
                                <option value="en-cours">En cours</option>
                                <option value="terminé">Terminé</option>
                            </select>
                            {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Description *</label>
                        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} {...field('description')} />
                        {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Image (URL)</label>
                            <input value={form.image ?? ''} onChange={e => set('image', e.target.value)} placeholder="https://..." {...field('image')} />
                            {errors.image && <p className="mt-1 text-xs text-destructive">{errors.image}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Lieu</label>
                            <input value={form.location ?? ''} onChange={e => set('location', e.target.value)} placeholder="Ex: Yaoundé, Cameroun" {...field('location')} />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Progression (0–100 %)</label>
                        <div className="flex items-center gap-4">
                            <input type="range" min={0} max={100} value={form.progress} onChange={e => set('progress', Number(e.target.value))} className="flex-1 accent-primary" />
                            <input type="number" min={0} max={100} value={form.progress} onChange={e => set('progress', Number(e.target.value))} className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Impact — libellé</label>
                            <input value={form.impact_goal ?? ''} onChange={e => set('impact_goal', e.target.value)} placeholder="Ex: Bénéficiaires directs" {...field('impact_goal')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Impact — valeur</label>
                            <input value={form.impact_value ?? ''} onChange={e => set('impact_value', e.target.value)} placeholder="Ex: 5,000+" {...field('impact_value')} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Ordre d'affichage</label>
                            <input type="number" min={0} value={form.order} onChange={e => set('order', Number(e.target.value))} {...field('order')} />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" />
                            <label htmlFor="is_active" className="text-sm font-medium text-foreground">Visible sur le site public</label>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
