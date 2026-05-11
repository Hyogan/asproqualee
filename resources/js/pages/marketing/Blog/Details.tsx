import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { Head, Link } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Author { id: number; name: string }
interface Category { id: number; name: string }
interface Tag { id: number; name: string }

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string | null;
    read_time: string | null;
    published_at: string | null;
    author: Author | null;
    category: Category | null;
    tags: Tag[];
}

interface Props extends Record<string, unknown> {
    post: BlogPost;
}

export default function BlogDetailsPage() {
    const { post } = usePage<Props>().props;

    const authorName = post.author?.name ?? 'Asproqualee';
    const categoryName = post.category?.name ?? '';

    return (
        <MainLayout
            title={`${post.title} | Asproqualee`}
            description={post.excerpt}
        >
            <Head title={`${post.title} | Asproqualee`} />

            <main className="min-h-screen">
                <HeroSection
                    title={post.title}
                    subtitle={post.excerpt}
                    backgroundImage={post.image ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80'}
                    badgeText={categoryName}
                />

                <section className="py-16">
                    <div className="container mx-auto max-w-3xl px-4">

                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux actualités
                        </Link>

                        {/* Meta */}
                        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {post.published_at && (
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.published_at).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4" />
                                {authorName}
                            </div>
                            {post.read_time && (
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {post.read_time} de lecture
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-full"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                        />

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="rounded-md bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Back to blog */}
                        <div className="mt-10">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Voir tous les articles
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
