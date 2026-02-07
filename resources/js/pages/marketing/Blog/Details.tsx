import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/HeroSection';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// BlogPost type
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

// Sample blog posts (same as your previous file)
const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: "Journée Mondiale des Toilettes 2024 : Pourquoi l'Assainissement Compte",
        excerpt:
            "Découvrez l'importance cruciale de l'assainissement et comment nos actions contribuent à améliorer la santé publique dans nos communautés.",
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80',
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
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1200&q=80',
        date: '15 Décembre 2024',
        author: 'Équipe Terrain',
        category: 'Actions',
        tags: ['Environnement', 'Nettoyage', 'Communauté'],
        readTime: '7 min',
    },
    // Add more posts as needed...
];

export default function BlogDetailsPage() {
    // const { id } = router.query;
    let id = '1';

    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        return (
            <MainLayout title="Article non trouvé | Asproqualee">
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-lg text-muted-foreground">
                        Article introuvable.
                    </p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            title={`${post.title} | Asproqualee`}
            description={post.excerpt}
        >
            <main className="min-h-screen">
                {/* Hero Section */}
                <HeroSection
                    title={post.title}
                    subtitle={post.excerpt}
                    backgroundImage={post.image}
                    badgeText={post.category}
                />

                {/* Post Content */}
                <section className="py-16">
                    <div className="container mx-auto max-w-3xl px-4">
                        {/* Meta Info */}
                        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

                        {/* Content Body */}
                        <div className="prose max-w-full">
                            <p>{post.excerpt}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Integer nec odio. Praesent
                                libero. Sed cursus ante dapibus diam. Sed nisi.
                                Nulla quis sem at nibh elementum imperdiet.
                            </p>
                            <p>
                                Duis sagittis ipsum. Praesent mauris. Fusce nec
                                tellus sed augue semper porta. Mauris massa.
                                Vestibulum lacinia arcu eget nulla.
                            </p>
                            <h2>Pourquoi c'est important ?</h2>
                            <p>
                                Curabitur sodales ligula in libero. Sed
                                dignissim lacinia nunc. Curabitur tortor.
                                Pellentesque nibh. Aenean quam.
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-md bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
