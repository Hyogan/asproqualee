import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ValueItem {
    title: string;
    description: string;
    image: string;
}

interface ValuesContent {
    vision_title: string;
    vision_description: string;
    vision_image: string;
    values: ValueItem[];
}

interface Props extends Record<string, unknown> {
    content: ValuesContent;
}

export default function AdminPageValues() {
    const { content } = usePage<Props>().props;
    const [form, setForm] = useState<ValuesContent>(content);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: keyof ValuesContent, value: unknown) =>
        setForm(f => ({ ...f, [key]: value }));

    const updateValue = (i: number, field: keyof ValueItem, value: string) =>
        setForm(f => ({
            ...f,
            values: f.values.map((v, idx) => idx === i ? { ...v, [field]: value } : v),
        }));

    const addValue = () =>
        setForm(f => ({ ...f, values: [...f.values, { title: '', description: '', image: '' }] }));

    const removeValue = (i: number) =>
        setForm(f => ({ ...f, values: f.values.filter((_, idx) => idx !== i) }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put('/admin/pages/values', form, { onError: setErrors });
    };

    const field = (key: string) => ({
        className: cn('w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none', errors[key] ? 'border-destructive' : 'border-input'),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Pages du site', href: '#' }, { title: 'Vision & Valeurs', href: '#' }]}>
            <Head title="Page Vision & Valeurs — Admin" />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">Page « Vision & Valeurs »</h1>
                        <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                            Enregistrer
                        </button>
                    </div>

                    <fieldset className="space-y-4 rounded-xl border border-border p-5">
                        <legend className="px-2 text-sm font-semibold text-foreground">Section Vision</legend>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Titre *</label>
                            <input value={form.vision_title} onChange={e => set('vision_title', e.target.value)} {...field('vision_title')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Description *</label>
                            <textarea value={form.vision_description} onChange={e => set('vision_description', e.target.value)} rows={5} {...field('vision_description')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Image (URL)</label>
                            <input value={form.vision_image} onChange={e => set('vision_image', e.target.value)} placeholder="https://..." {...field('vision_image')} />
                        </div>
                    </fieldset>

                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">Valeurs</label>
                            <button type="button" onClick={addValue} className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/70">
                                <Plus className="h-3.5 w-3.5" /> Ajouter
                            </button>
                        </div>
                        <div className="space-y-4">
                            {form.values.map((v, i) => (
                                <div key={i} className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase">Valeur {i + 1}</span>
                                        <button type="button" onClick={() => removeValue(i)} className="rounded p-1 text-muted-foreground hover:bg-red-50 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <input value={v.title} onChange={e => updateValue(i, 'title', e.target.value)} placeholder="Titre *"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                    <textarea value={v.description} onChange={e => updateValue(i, 'description', e.target.value)} placeholder="Description *" rows={2}
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                    <input value={v.image} onChange={e => updateValue(i, 'image', e.target.value)} placeholder="Image (URL)"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
