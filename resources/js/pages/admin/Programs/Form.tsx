import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ProgramData {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    color: string | null;
    stats_label: string | null;
    stats_value: string | null;
    pillars: string[];
    order: number;
    is_active: boolean;
}

interface Props extends Record<string, unknown> {
    program: ProgramData | null;
}

const ICON_OPTIONS = [
    'GraduationCap', 'Construction', 'Search', 'Droplets',
    'BookOpen', 'ShieldCheck', 'Microscope', 'HeartHandshake',
    'Lightbulb', 'Sprout', 'Waves', 'Globe',
];

const COLOR_OPTIONS = [
    { value: 'primary', label: 'Primaire (bleu)' },
    { value: 'indigo',  label: 'Indigo' },
    { value: 'sky',     label: 'Ciel' },
    { value: 'emerald', label: 'Émeraude' },
    { value: 'teal',    label: 'Teal' },
    { value: 'blue',    label: 'Bleu' },
    { value: 'green',   label: 'Vert' },
];

export default function AdminProgramForm() {
    const { program } = usePage<Props>().props;
    const isEditing = program !== null;

    const [form, setForm] = useState({
        title:       program?.title ?? '',
        description: program?.description ?? '',
        icon:        program?.icon ?? '',
        color:       program?.color ?? 'primary',
        stats_label: program?.stats_label ?? '',
        stats_value: program?.stats_value ?? '',
        pillars:     program?.pillars ?? [] as string[],
        order:       program?.order ?? 0,
        is_active:   program?.is_active ?? true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

    const addPillar = () => setForm(f => ({ ...f, pillars: [...f.pillars, ''] }));
    const updatePillar = (i: number, v: string) =>
        setForm(f => ({ ...f, pillars: f.pillars.map((p, idx) => idx === i ? v : p) }));
    const removePillar = (i: number) =>
        setForm(f => ({ ...f, pillars: f.pillars.filter((_, idx) => idx !== i) }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, pillars: form.pillars.filter(p => p.trim() !== '') };
        if (isEditing) {
            router.put(`/admin/programs/${program!.id}`, payload, { onError: setErrors });
        } else {
            router.post('/admin/programs', payload, { onError: setErrors });
        }
    };

    const field = (key: string) => ({
        className: cn('w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none', errors[key] ? 'border-destructive' : 'border-input'),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Programmes', href: '/admin/programs' }, { title: isEditing ? 'Modifier' : 'Nouveau', href: '#' }]}>
            <Head title={`${isEditing ? 'Modifier' : 'Créer'} un programme — Admin`} />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">{isEditing ? 'Modifier le programme' : 'Nouveau programme'}</h1>
                        <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                            {isEditing ? 'Enregistrer' : 'Créer'}
                        </button>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Titre *</label>
                        <input value={form.title} onChange={e => set('title', e.target.value)} {...field('title')} />
                        {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Description *</label>
                        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} {...field('description')} />
                        {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Icône</label>
                            <select value={form.icon} onChange={e => set('icon', e.target.value)} {...field('icon')}>
                                <option value="">— Aucune —</option>
                                {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Couleur</label>
                            <select value={form.color} onChange={e => set('color', e.target.value)} {...field('color')}>
                                {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Stat — libellé</label>
                            <input value={form.stats_label ?? ''} onChange={e => set('stats_label', e.target.value)} placeholder="Ex: Élèves sensibilisés" {...field('stats_label')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Stat — valeur</label>
                            <input value={form.stats_value ?? ''} onChange={e => set('stats_value', e.target.value)} placeholder="Ex: 15,000+" {...field('stats_value')} />
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">Piliers / axes</label>
                            <button type="button" onClick={addPillar} className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/70">
                                <Plus className="h-3.5 w-3.5" /> Ajouter
                            </button>
                        </div>
                        {form.pillars.length === 0 ? (
                            <p className="rounded-lg border border-dashed border-border px-4 py-4 text-center text-sm text-muted-foreground">Aucun pilier. Cliquez sur Ajouter.</p>
                        ) : (
                            <div className="space-y-2">
                                {form.pillars.map((p, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input value={p} onChange={e => updatePillar(i, e.target.value)} placeholder="Ex: Kits pédagogiques"
                                            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                        <button type="button" onClick={() => removePillar(i)} className="rounded-md p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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
