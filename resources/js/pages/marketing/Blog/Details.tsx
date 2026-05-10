import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import { Calendar, User } from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string | null;
    date: string;
    author: { id: number; name: string };
    category: { id: number; name: string };
    tags: { id: number; name: string }[];
    read_time: string | null;
    published_at: string | null;
}

interface Props {
    post: BlogPost;
}

export default function BlogDetailsPage() {
    const { post } = usePage<Props>().props;

    return (
        <MainLayout
            title={`${post.title} | Asproqualee`}
            description={post.excerpt}
        >
            <main className="min-h-screen">
                <HeroSection
                    title={post.title}
                    subtitle={post.excerpt}
                    backgroundImage={post.image ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80'}
                    badgeText={post.category.name}
                />

                <section className="py-16">
                    <div className="container mx-auto max-w-3xl px-4">
                        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {post.published_at
                                    ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                      })
                                    : '—'}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                {post.author.name}
                            </div>
                            {post.read_time && (
                                <span>{post.read_time} de lecture</span>
                            )}
                        </div>

                        <div
                            className="prose max-w-full"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                        />

                        <div className="mt-8 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-md bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
