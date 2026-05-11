import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    Droplet,
    Filter,
    Heart,
    ShoppingBag,
    ShoppingCart,
    Sprout,
    Star,
    Waves,
} from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string | null;
    image: string | null;
    is_eco_friendly: boolean;
    tag: string | null;
    rating: number;
}

interface Props extends Record<string, unknown> {
    products: Product[];
    categories: string[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    'Zéro-Déchet': <Sprout className="h-6 w-6" />,
    "Protection de l'Eau": <Droplet className="h-6 w-6" />,
    Assainissement: <Waves className="h-6 w-6" />,
    Education: <BookOpen className="h-6 w-6" />,
};

function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group flex flex-col rounded-[2rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-xl hover:shadow-primary/5"
        >
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
                <div className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase shadow-sm backdrop-blur-sm">
                    🇨🇲 Made in Local
                </div>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <ShoppingBag className="h-16 w-16 text-slate-300" />
                    </div>
                )}
                <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <Heart className="h-4 w-4 text-slate-400 hover:text-red-500" />
                </button>
            </div>

            <div className="mt-4 flex flex-1 flex-col px-2">
                <div className="mb-1 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'h-3 w-3',
                                i < product.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200',
                            )}
                        />
                    ))}
                </div>

                {product.tag && (
                    <span className="mb-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                        {product.tag}
                    </span>
                )}

                <h3 className="line-clamp-2 min-h-[40px] text-sm leading-tight font-bold text-slate-800">
                    {product.name}
                </h3>

                <p className="mt-2 text-lg font-black text-primary">
                    {product.price.toFixed(2)} Fcfa
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2">
                    <Link
                        href={`/produits/${product.id}`}
                        className="w-full rounded-xl border border-slate-200 py-2 text-center text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        Voir le produit
                    </Link>
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white transition-all hover:bg-primary active:scale-95">
                        <ShoppingCart className="h-3 w-3" />
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function BoutiquePage() {
    const { products, categories } = usePage<Props>().props;
    const [activeTab, setActiveTab] = useState('all');

    const shopCategories = [
        { id: 'all', label: 'Tous', icon: <ShoppingBag className="h-6 w-6" /> },
        ...categories.map((cat) => ({
            id: cat,
            label: cat,
            icon: CATEGORY_ICONS[cat] ?? <ShoppingBag className="h-6 w-6" />,
        })),
    ];

    const filteredProducts =
        activeTab === 'all'
            ? products
            : products.filter((p) => p.category === activeTab);

    return (
        <MainLayout title="Boutique solidaire">
            <Head title="Boutique | Asproqualee" />
            <HeroSection
                backgroundImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80"
                title={
                    <>
                        Boutique <span className="text-primary">Solidaire</span>
                    </>
                }
                subtitle="Chaque achat finance directement nos actions de nettoyage de rivières et de sensibilisation."
                badgeText="Boutique"
            />
            <div className="min-h-screen bg-[#FDFDFD] pb-20">
                {/* Categories */}
                <section className="container mx-auto mb-8 px-4 pt-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {shopCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className="group flex flex-col items-center gap-3"
                            >
                                <div
                                    className={cn(
                                        'flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300',
                                        activeTab === cat.id
                                            ? 'scale-110 border-primary bg-primary shadow-lg shadow-primary/20'
                                            : 'border-slate-100 bg-white hover:border-primary/30',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'transition-colors',
                                            activeTab === cat.id
                                                ? 'text-white'
                                                : 'text-slate-400 group-hover:text-primary',
                                        )}
                                    >
                                        {cat.icon}
                                    </div>
                                </div>
                                <span
                                    className={cn(
                                        'text-xs font-bold tracking-widest uppercase',
                                        activeTab === cat.id
                                            ? 'text-primary'
                                            : 'text-slate-500',
                                    )}
                                >
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Product grid */}
                <section className="container mx-auto mb-24 px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-800">
                            {activeTab === 'all'
                                ? 'Tous les produits'
                                : activeTab}
                            <span className="ml-2 text-base font-normal text-slate-400">
                                ({filteredProducts.length})
                            </span>
                        </h2>
                        <div className="flex gap-2">
                            <button className="rounded-lg bg-slate-100 p-2 text-slate-400 hover:bg-slate-200">
                                <Filter className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="py-16 text-center text-slate-400">
                            Aucun produit dans cette catégorie.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}
