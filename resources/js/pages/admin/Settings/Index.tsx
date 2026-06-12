import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Building2, Globe, Share2 } from 'lucide-react';
import { useState } from 'react';

interface Settings {
    org_name: string;
    tagline: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    years_experience: number;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    site_url: string;
    og_image: string;
    twitter_handle: string;
}

interface Props extends Record<string, unknown> {
    settings: Settings;
}

export default function AdminSettingsIndex() {
    const { settings } = usePage<Props>().props;
    const [form, setForm] = useState<Settings>({ ...settings });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const set = (key: keyof Settings, value: string | number) =>
        setForm(f => ({ ...f, [key]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.put('/admin/settings', form as unknown as Record<string, unknown>, {
            onError: (e) => { setErrors(e); setProcessing(false); },
            onSuccess: () => setProcessing(false),
        });
    };

    const inputClass = (key: keyof Settings) =>
        `w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:ring-2 focus:ring-ring focus:outline-none ${errors[key] ? 'border-destructive' : 'border-input'}`;

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Paramètres', href: '/admin/settings' }]}>
            <Head title="Paramètres — Admin" />
            <form onSubmit={submit} className="p-6">
                <div className="mx-auto max-w-3xl space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">Paramètres du site</h1>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
                        >
                            {processing ? 'Enregistrement…' : 'Enregistrer'}
                        </button>
                    </div>

                    {/* General */}
                    <section className="rounded-xl border border-border bg-card">
                        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                            <Building2 className="h-5 w-5 text-primary" />
                            <h2 className="font-semibold text-foreground">Informations générales</h2>
                        </div>
                        <div className="space-y-5 p-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Nom de l'organisation *</label>
                                    <input value={form.org_name} onChange={e => set('org_name', e.target.value)} className={inputClass('org_name')} />
                                    {errors.org_name && <p className="mt-1 text-xs text-destructive">{errors.org_name}</p>}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Slogan</label>
                                    <input value={form.tagline} onChange={e => set('tagline', e.target.value)} className={inputClass('tagline')} />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Description courte</label>
                                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={inputClass('description')} />
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Adresse</label>
                                    <input value={form.address} onChange={e => set('address', e.target.value)} className={inputClass('address')} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Téléphone</label>
                                    <input value={form.phone} onChange={e => set('phone', e.target.value)} className={inputClass('phone')} />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Email de contact</label>
                                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass('email')} />
                                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Années d'expérience</label>
                                    <input type="number" min={0} value={form.years_experience} onChange={e => set('years_experience', Number(e.target.value))} className={inputClass('years_experience')} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Social */}
                    <section className="rounded-xl border border-border bg-card">
                        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                            <Share2 className="h-5 w-5 text-primary" />
                            <h2 className="font-semibold text-foreground">Réseaux sociaux</h2>
                        </div>
                        <div className="grid gap-5 p-6 md:grid-cols-2">
                            {(['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'] as const).map(network => (
                                <div key={network}>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground capitalize">{network}</label>
                                    <input
                                        type="url"
                                        value={form[network]}
                                        onChange={e => set(network, e.target.value)}
                                        placeholder={`https://${network}.com/asproqualee`}
                                        className={inputClass(network)}
                                    />
                                    {errors[network] && <p className="mt-1 text-xs text-destructive">{errors[network]}</p>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SEO */}
                    <section className="rounded-xl border border-border bg-card">
                        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                            <Globe className="h-5 w-5 text-primary" />
                            <h2 className="font-semibold text-foreground">SEO & partage</h2>
                        </div>
                        <div className="grid gap-5 p-6 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">URL du site</label>
                                <input type="url" value={form.site_url} onChange={e => set('site_url', e.target.value)} className={inputClass('site_url')} />
                                {errors.site_url && <p className="mt-1 text-xs text-destructive">{errors.site_url}</p>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Handle Twitter</label>
                                <input value={form.twitter_handle} onChange={e => set('twitter_handle', e.target.value)} placeholder="@asproqualee" className={inputClass('twitter_handle')} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Image OG par défaut (chemin)</label>
                                <input value={form.og_image} onChange={e => set('og_image', e.target.value)} placeholder="/images/og-default.jpg" className={inputClass('og_image')} />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
                        >
                            {processing ? 'Enregistrement…' : 'Enregistrer les paramètres'}
                        </button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
