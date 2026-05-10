import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, Filter, Search, User } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string | null;
    date: string;
    author: string;
    category: string;
    tags: string[];
    readTime: string | null;
    slug: string;
}

interface PaginatedPosts {
    data: BlogPost[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    posts: PaginatedPosts;
    categories: string[];
}

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300',
                featured
                    ? 'hover:shadow-2xl md:col-span-2 md:flex md:flex-row'
                    : 'hover:scale-[1.02] hover:shadow-xl',
            )}
        >
            <div
                className={cn(
                    'relative overflow-hidden',
                    featured ? 'md:w-1/2' : 'h-56',
                )}
            >
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">
                    {post.category}
                </div>
            </div>

            <div
                className={cn(
                    'p-6',
                    featured && 'flex flex-col justify-center md:w-1/2',
                )}
            >
                <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {post.author}
                    </div>
                    {post.readTime && <span>{post.readTime} de lecture</span>}
                </div>

                <h3
                    className={cn(
                        'mb-3 font-bold transition-colors group-hover:text-primary',
                        featured ? 'text-2xl md:text-3xl' : 'text-xl',
                    )}
                >
                    {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <a
                    href={`/blog/post/${post.slug ?? post.id}`}
                    className="inline-flex items-center font-semibold text-primary transition-all group-hover:gap-2"
                >
                    Lire l'article
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </article>
    );
}

export default function BlogPage() {
    const { posts, categories: rawCategories } = usePage<Props>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const categories = ['Tous', ...rawCategories];

    const filteredPosts = posts.data.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'Tous' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const [featuredPost, ...otherPosts] = filteredPosts;

    return (
        <MainLayout
            title="Actualités & Blog sur l'Eau et la Santé | Asproqualee"
            description="Découvrez nos articles, actions et conseils pour protéger l'eau et améliorer la santé publique. Suivez nos initiatives et restez informés."
        >
            <main className="min-h-screen">
                <HeroSection
                    title="Actualités & Blog"
                    subtitle="Suivez nos actions, découvrez nos conseils et restez informés de nos initiatives pour la protection de l'eau"
                    backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
                    badgeText="Nos Initiatives pour l'Eau et la Santé"
                />

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un article..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background py-3 pr-4 pl-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto">
                                    <Filter className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={cn(
                                                'rounded-lg px-4 py-2 font-medium whitespace-nowrap transition-all',
                                                selectedCategory === category
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                                            )}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        {filteredPosts.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-lg text-muted-foreground">
                                    Aucun article trouvé pour votre recherche.
                                </p>
                            </div>
                        ) : (
                            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
                                {featuredPost && (
                                    <BlogCard post={featuredPost} featured />
                                )}
                                {otherPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}

                        {posts.links.some((l) => l.url && !l.active) && (
                            <div className="mt-12 flex justify-center gap-2">
                                {posts.links.map((link, i) => (
                                    link.url && (
                                        <a
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={cn(
                                                'rounded-lg px-4 py-2 text-sm font-semibold transition-all',
                                                link.active
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                                            )}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary to-primary-deep py-16">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-2xl text-center text-white">
                            <h2 className="mb-4 text-3xl font-bold">
                                Ne manquez aucune actualité
                            </h2>
                            <p className="mb-6 text-lg text-white/90">
                                Inscrivez-vous à notre newsletter pour recevoir
                                nos derniers articles et suivre nos actions
                            </p>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="flex-1 rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-white focus:outline-none"
                                />
                                <button className="rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-all hover:bg-white/90">
                                    S'inscrire
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
