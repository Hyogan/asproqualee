import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Tag } from 'lucide-react';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props extends Record<string, unknown> {
    message: Message;
}

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-500',
    resolved: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<string, string> = {
    new: 'Nouveau',
    read: 'Lu',
    resolved: 'Résolu',
};

export default function AdminMessageShow() {
    const { message } = usePage<Props>().props;

    const updateStatus = (status: string) => {
        router.patch(`/admin/messages/${message.id}/status`, { status }, {
            preserveScroll: true,
        });
    };

    const mailtoHref = [
        `mailto:${message.email}`,
        `?subject=${encodeURIComponent(`Re: ${message.subject ?? 'Votre message'}`)}`,
        `&body=${encodeURIComponent(`\n\n---\nMessage original de ${message.name} :\n${message.message}`)}`,
    ].join('');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Messages', href: '/admin/messages' },
                { title: message.name, href: '#' },
            ]}
        >
            <Head title={`Message de ${message.name} — Admin`} />

            <div className="p-6">
                <div className="mx-auto max-w-3xl space-y-6">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/admin/messages"
                            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux messages
                        </Link>
                        <select
                            value={message.status}
                            onChange={(e) => updateStatus(e.target.value)}
                            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                        >
                            <option value="new">Nouveau</option>
                            <option value="read">Marquer lu</option>
                            <option value="resolved">Résolu</option>
                        </select>
                    </div>

                    {/* Message card */}
                    <div className="overflow-hidden rounded-xl border border-border bg-card">

                        {/* Sender info */}
                        <div className="border-b border-border bg-muted/30 px-6 py-4">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-lg font-semibold text-foreground">
                                            {message.name}
                                        </h1>
                                        <span
                                            className={cn(
                                                'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                                                STATUS_COLORS[message.status] ?? 'bg-muted text-muted-foreground',
                                            )}
                                        >
                                            {STATUS_LABELS[message.status] ?? message.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <a
                                            href={`mailto:${message.email}`}
                                            className="flex items-center gap-1.5 hover:text-foreground"
                                        >
                                            <Mail className="h-3.5 w-3.5" />
                                            {message.email}
                                        </a>
                                        {message.phone && (
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5" />
                                                {message.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(message.created_at).toLocaleString('fr-FR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Subject */}
                        {message.subject && (
                            <div className="flex items-center gap-2 border-b border-border px-6 py-3">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                    {message.subject}
                                </span>
                            </div>
                        )}

                        {/* Body */}
                        <div className="px-6 py-5">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                                {message.message}
                            </p>
                        </div>
                    </div>

                    {/* Reply action */}
                    <div className="flex justify-end">
                        <a
                            href={mailtoHref}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                        >
                            <Mail className="h-4 w-4" />
                            Répondre par email
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
