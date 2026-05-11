import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface FocusArea {
    title: string;
    description: string;
    image: string;
}

interface AboutContent {
    subtitle: string;
    intro: string;
    focus_areas: FocusArea[];
    cta_text: string;
}

interface Props extends Record<string, unknown> {
    content: AboutContent;
}

export default function AdminPageAbout() {
    const { content } = usePage<Props>().props;
    const [form, setForm] = useState<AboutContent>(content);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: keyof AboutContent, value: unknown) =>
        setForm(f => ({ ...f, [key]: value }));

    const updateArea = (i: number, field: keyof FocusArea, value: string) =>
        setForm(f => ({
            ...f,
            focus_areas: f.focus_areas.map((a, idx) => idx === i ? { ...a, [field]: value } : a),
        }));

    const addArea = () =>
        setForm(f => ({ ...f, focus_areas: [...f.focus_areas, { title: '', description: '', image: '' }] }));

    const removeArea = (i: number) =>
        setForm(f => ({ ...f, focus_areas: f.focus_areas.filter((_, idx) => idx !== i) }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put('/admin/pages/about', form, { onError: setErrors });
    };

    const field = (key: string) => ({
        className: cn('w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none', errors[key] ? 'border-destructive' : 'border-input'),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Pages du site', href: '#' }, { title: 'Mission', href: '#' }]}>
            <Head title="Page Mission — Admin" />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">Page « Mission »</h1>
                        <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                            Enregistrer
                        </button>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Sous-titre du héros *</label>
                        <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} {...field('subtitle')} />
                        {errors.subtitle && <p className="mt-1 text-xs text-destructive">{errors.subtitle}</p>}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Texte d'introduction *</label>
                        <p className="mb-1 text-xs text-muted-foreground">Séparer les paragraphes par une ligne vide.</p>
                        <textarea value={form.intro} onChange={e => set('intro', e.target.value)} rows={8} {...field('intro')} />
                        {errors.intro && <p className="mt-1 text-xs text-destructive">{errors.intro}</p>}
                    </div>

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">Domaines clés</label>
                            <button type="button" onClick={addArea} className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/70">
                                <Plus className="h-3.5 w-3.5" /> Ajouter
                            </button>
                        </div>
                        <div className="space-y-4">
                            {form.focus_areas.map((area, i) => (
                                <div key={i} className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase">Domaine {i + 1}</span>
                                        <button type="button" onClick={() => removeArea(i)} className="rounded p-1 text-muted-foreground hover:bg-red-50 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <input value={area.title} onChange={e => updateArea(i, 'title', e.target.value)} placeholder="Titre *"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                    <textarea value={area.description} onChange={e => updateArea(i, 'description', e.target.value)} placeholder="Description *" rows={2}
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                    <input value={area.image} onChange={e => updateArea(i, 'image', e.target.value)} placeholder="Image (URL)"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Texte du bouton CTA *</label>
                        <input value={form.cta_text} onChange={e => set('cta_text', e.target.value)} {...field('cta_text')} />
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
