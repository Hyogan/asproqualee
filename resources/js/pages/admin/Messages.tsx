import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string;
    created_at: string;
}

interface PaginatedMessages {
    data: Message[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props extends Record<string, unknown> {
    messages: PaginatedMessages;
    filters: { status: string };
}

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-500',
    resolved: 'bg-green-100 text-green-700',
};

const STATUS_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'new', label: 'Nouveaux' },
    { value: 'read', label: 'Lus' },
    { value: 'resolved', label: 'Résolus' },
];

export default function AdminMessages() {
    const { messages, filters } = usePage<Props>().props;

    const updateStatus = (msg: Message, status: string) => {
        router.patch(`/admin/messages/${msg.id}/status`, { status });
    };

    const filterStatus = (status: string) => {
        router.get('/admin/messages', status ? { status } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Admin', href: '/admin' },
                { title: 'Messages', href: '/admin/messages' },
            ]}
        >
            <Head title="Messages — Admin" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">
                        Messages de contact
                    </h1>
                    <div className="flex gap-2">
                        {STATUS_OPTIONS.map((opt) => (
                            <Button
                                key={opt.value}
                                onClick={() => filterStatus(opt.value)}
                                className={cn(
                                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                                    filters.status === opt.value ||
                                        (!filters.status && opt.value === '')
                                        ? 'bg-primary text-white'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/70',
                                )}
                            >
                                {opt.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {messages.data.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
                            Aucun message.
                        </div>
                    ) : (
                        messages.data.map((msg) => (
                            <div
                                key={msg.id}
                                className="rounded-xl border border-border bg-card p-5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="mb-1 flex items-center gap-3">
                                            <span className="font-semibold text-foreground">
                                                {msg.name}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {msg.email}
                                            </span>
                                            {msg.phone && (
                                                <span className="text-sm text-muted-foreground">
                                                    {msg.phone}
                                                </span>
                                            )}
                                            <span
                                                className={cn(
                                                    'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                                                    STATUS_COLORS[msg.status] ??
                                                        'bg-muted text-muted-foreground',
                                                )}
                                            >
                                                {msg.status}
                                            </span>
                                        </div>
                                        {msg.subject && (
                                            <div className="mb-2 text-sm font-medium text-foreground">
                                                {msg.subject}
                                            </div>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-end gap-2">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(
                                                msg.created_at,
                                            ).toLocaleDateString('fr-FR')}
                                        </span>
                                        <select
                                            value={msg.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    msg,
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-md border border-input bg-background px-2 py-1 text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                                        >
                                            <option value="new">Nouveau</option>
                                            <option value="read">
                                                Marquer lu
                                            </option>
                                            <option value="resolved">
                                                Résolu
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {messages.links.some((l) => l.url && !l.active) && (
                    <div className="flex justify-center gap-2">
                        {messages.links.map((link, i) =>
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
        </AppLayout>
    );
}
