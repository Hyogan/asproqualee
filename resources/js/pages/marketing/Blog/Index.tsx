import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Filter, Search, User } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    readTime: string;
}

const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: "Journée Mondiale des Toilettes 2024 : Pourquoi l'Assainissement Compte",
        excerpt:
            "Découvrez l'importance cruciale de l'assainissement et comment nos actions contribuent à améliorer la santé publique dans nos communautés.",
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
        date: '19 Novembre 2024',
        author: 'Équipe Asproqualee',
        category: 'Sensibilisation',
        tags: ['Santé', 'Assainissement', 'ODD'],
        readTime: '5 min',
    },
    {
        id: '2',
        title: 'Nettoyage des Rivières : Protéger les Communautés',
        excerpt:
            "Retour sur notre dernière action de nettoyage du canal Mfoundi et son impact positif sur l'environnement et la santé des riverains.",
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
        date: '15 Décembre 2024',
        author: 'Équipe Terrain',
        category: 'Actions',
        tags: ['Environnement', 'Nettoyage', 'Communauté'],
        readTime: '7 min',
    },
    {
        id: '3',
        title: 'Donner une Seconde Vie aux Déchets Organiques',
        excerpt:
            "Comment le compostage et la valorisation des déchets organiques contribuent à la protection de nos cours d'eau et de notre environnement.",
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
        date: '28 Novembre 2024',
        author: 'Équipe Éducation',
        category: 'Environnement',
        tags: ['Recyclage', 'Compostage', 'Innovation'],
        readTime: '6 min',
    },
    {
        id: '4',
        title: "L'Eau Propre : Un Droit Fondamental pour Tous",
        excerpt:
            "Analyse de l'importance de l'accès à l'eau potable et comment nos actions participent à garantir ce droit pour tous.",
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        date: '5 Décembre 2024',
        author: 'Dr. Kamga',
        category: 'Santé',
        tags: ['Eau potable', 'Droits', 'Santé publique'],
        readTime: '8 min',
    },
];

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
            {/* Image */}
            <div
                className={cn(
                    'relative overflow-hidden',
                    featured ? 'md:w-1/2' : 'h-56',
                )}
            >
                <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white">
                    {post.category}
                </div>
            </div>

            {/* Content */}
            <div
                className={cn(
                    'p-6',
                    featured && 'flex flex-col justify-center md:w-1/2',
                )}
            >
                {/* Meta Info */}
                <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {post.author}
                    </div>
                    <span>{post.readTime} de lecture</span>
                </div>

                {/* Title */}
                <h3
                    className={cn(
                        'mb-3 font-bold transition-colors group-hover:text-primary',
                        featured ? 'text-2xl md:text-3xl' : 'text-xl',
                    )}
                >
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                </p>

                {/* Tags */}
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

                {/* Read More Link */}
                <a
                    href={`/blog/post/${post.id}`}
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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const categories = [
        'Tous',
        'Sensibilisation',
        'Actions',
        'Environnement',
        'Santé',
    ];

    const filteredPosts = blogPosts.filter((post) => {
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
                {/* Header */}
                {/* Hero Section */}
                <HeroSection
                    title="Actualités & Blog"
                    subtitle="Suivez nos actions, découvrez nos conseils et restez informés de nos initiatives pour la protection de l'eau"
                    backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
                    badgeText="Nos Initiatives pour l'Eau et la Santé"
                />

                {/* Search & Filter */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex flex-col gap-4 md:flex-row">
                                {/* Search Bar */}
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un article..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-input bg-background py-3 pr-4 pl-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex items-center gap-2 overflow-x-auto">
                                    <Filter className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }
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

                {/* Blog Posts */}
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
                                {/* Featured Post */}
                                {featuredPost && (
                                    <BlogCard post={featuredPost} featured />
                                )}

                                {/* Other Posts */}
                                {otherPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {filteredPosts.length > 0 && (
                            <div className="mt-12 text-center">
                                <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-deep hover:shadow-lg">
                                    Charger plus d'articles
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter CTA */}
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
