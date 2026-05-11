import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface ProductData {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string | null;
    image: string | null;
    is_eco_friendly: boolean;
    tag: string | null;
    rating: number;
    is_active: boolean;
    order: number;
}

interface Props extends Record<string, unknown> {
    product: ProductData | null;
}

export default function AdminProductForm() {
    const { product } = usePage<Props>().props;
    const isEditing = product !== null;

    const [form, setForm] = useState({
        name:            product?.name ?? '',
        category:        product?.category ?? '',
        price:           product?.price ?? 0,
        description:     product?.description ?? '',
        image:           product?.image ?? '',
        is_eco_friendly: product?.is_eco_friendly ?? false,
        tag:             product?.tag ?? '',
        rating:          product?.rating ?? 5,
        is_active:       product?.is_active ?? true,
        order:           product?.order ?? 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (key: string, value: unknown) => setForm(f => ({ ...f, [key]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            router.put(`/admin/products/${product!.id}`, form, { onError: setErrors });
        } else {
            router.post('/admin/products', form, { onError: setErrors });
        }
    };

    const field = (key: string) => ({
        className: cn('w-full rounded-lg border bg-background px-4 py-2.5 text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none', errors[key] ? 'border-destructive' : 'border-input'),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Produits', href: '/admin/products' }, { title: isEditing ? 'Modifier' : 'Nouveau', href: '#' }]}>
            <Head title={`${isEditing ? 'Modifier' : 'Créer'} un produit — Admin`} />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">{isEditing ? 'Modifier le produit' : 'Nouveau produit'}</h1>
                        <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90">
                            {isEditing ? 'Enregistrer' : 'Créer'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Nom *</label>
                            <input value={form.name} onChange={e => set('name', e.target.value)} {...field('name')} />
                            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Catégorie *</label>
                            <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="Ex: Zéro-Déchet" {...field('category')} />
                            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Prix (€) *</label>
                            <input type="number" min={0} step="0.01" value={form.price} onChange={e => set('price', parseFloat(e.target.value))} {...field('price')} />
                            {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                        <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value)} rows={3} {...field('description')} />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Image (URL)</label>
                        <input value={form.image ?? ''} onChange={e => set('image', e.target.value)} placeholder="https://..." {...field('image')} />
                        {errors.image && <p className="mt-1 text-xs text-destructive">{errors.image}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Tag</label>
                            <input value={form.tag ?? ''} onChange={e => set('tag', e.target.value)} placeholder="Ex: Best Seller" {...field('tag')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Note (1–5)</label>
                            <input type="number" min={1} max={5} value={form.rating} onChange={e => set('rating', Number(e.target.value))} {...field('rating')} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Ordre</label>
                            <input type="number" min={0} value={form.order} onChange={e => set('order', Number(e.target.value))} {...field('order')} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <input type="checkbox" checked={form.is_eco_friendly} onChange={e => set('is_eco_friendly', e.target.checked)} className="h-4 w-4 rounded border-input text-primary" />
                            Éco-responsable
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="h-4 w-4 rounded border-input text-primary" />
                            Visible sur le site public
                        </label>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
