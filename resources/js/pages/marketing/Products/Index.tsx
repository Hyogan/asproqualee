import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    Filter,
    Star,
    Heart,
    Droplet,
    Waves,
    Sprout,
    BookOpen,
    Check,
    ArrowRight,
    ShoppingCart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MainLayout from '@/layouts/app/app-main-layout';
import HeroSection from '@/components/marketing/HeroSection';

// --- Types & Mock Data ---
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    isEcoFriendly: boolean;
    tag: string; // e.g., "Best Seller" or "Nouveau"
}

const products: Product[] = [
    {
        id: 'p1',
        name: 'Gourde Inox Isotherme - 750ml',
        category: 'Zéro-Déchet',
        price: 25.0,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1602143307185-8c1c55939bb0?w=500&q=80',
        isEcoFriendly: true,
        tag: 'Essentiel',
    },
    {
        id: 'p2',
        name: 'Kit de Filtration Charbon Actif',
        category: "Protection de l'Eau",
        price: 18.5,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?w=500&q=80',
        isEcoFriendly: true,
        tag: 'Top Impact',
    },
    {
        id: 'p3',
        name: 'Savon Bio Respectueux des Rivières',
        category: 'Assainissement',
        price: 8.0,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&q=80',
        isEcoFriendly: true,
        tag: 'Artisanal',
    },
    // Add more mock products as needed
];

const shopCategories = [
    { id: 'all', label: 'Tous', icon: <ShoppingBag className="h-6 w-6" /> },
    {
        id: 'Zéro-Déchet',
        label: 'Zéro-Déchet',
        icon: <Sprout className="h-6 w-6" />,
    },
    {
        id: "Protection de l'Eau",
        label: 'Eau Pure',
        icon: <Droplet className="h-6 w-6" />,
    },
    {
        id: 'Assainissement',
        label: 'Hygiène',
        icon: <Waves className="h-6 w-6" />,
    },
    {
        id: 'Education',
        label: 'Livres',
        icon: <BookOpen className="h-6 w-6" />,
    },
];

// --- Components ---

function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group flex flex-col rounded-[2rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-xl hover:shadow-primary/5"
        >
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
                {/* Impact Badge like the reference image */}
                <div className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase shadow-sm backdrop-blur-sm">
                    🇨🇲 Made in Local
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

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
                    <span className="ml-1 text-[10px] text-slate-400">
                        (12 avis)
                    </span>
                </div>

                <h3 className="line-clamp-2 min-h-[40px] text-sm leading-tight font-bold text-slate-800">
                    {product.name}
                </h3>

                <p className="mt-2 text-lg font-black text-primary">
                    {product.price.toFixed(2)} €
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2">
                    <button className="w-full rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
                        Voir le produit
                    </button>
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
    const [activeTab, setActiveTab] = useState('all');

    const filteredProducts =
        activeTab === 'all'
            ? products
            : products.filter((p) => p.category === activeTab);

    return (
        <MainLayout title="Boutique solidaire">
            <HeroSection
                backgroundImage={'backgroundImage'}
                title={''}
                className="h-2.5"
                badgeText="Boutique "
                subtitle=""
            />
            <div className="min-h-screen bg-[#FDFDFD] pb-20">
                <section className="container mx-auto px-4 pt-10 pb-16">
                    <div className="relative overflow-hidden rounded-[3rem] bg-[#E8F4F1] p-8 md:p-16">
                        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/20 blur-3xl" />

                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-1 text-xs font-bold text-teal-700 backdrop-blur-md">
                                <ShoppingBag className="h-3 w-3" />
                                Boutique Solidaire
                            </div>
                            <h1 className="mb-6 text-4xl leading-tight font-black text-slate-900 md:text-6xl">
                                Boutique AsproQualee <br />
                                <span className="text-primary italic">
                                    Association pour l'eau
                                </span>
                            </h1>
                            <p className="mb-8 max-w-lg text-lg text-slate-600">
                                Chaque achat finance directement nos actions de
                                nettoyage de rivières et de sensibilisation à
                                l'assainissement. Solutions Zéro-Plastique,
                                Zéro-Pollution.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-10 rounded-full border-2 border-white bg-slate-200"
                                        />
                                    ))}
                                </div>
                                <p className="flex items-center text-sm font-medium text-slate-500">
                                    +500 contributeurs ce mois-ci
                                </p>
                            </div>
                        </div>

                        {/* Character/Icon placeholder like the "Ghost" in reference */}
                        <div className="absolute right-12 bottom-0 hidden lg:block">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative"
                            >
                                <div className="flex h-80 w-80 items-center justify-center rounded-full bg-primary/10">
                                    <Droplet className="h-40 w-40 text-primary opacity-20" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CATEGORIES GRID */}
                <section className="container mx-auto mb-16 px-4">
                    <h2 className="mb-8 text-2xl font-black text-slate-800">
                        Catégories de Produits
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                        {shopCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className="group flex flex-col items-center gap-4"
                            >
                                <div
                                    className={cn(
                                        'flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all duration-300',
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

                {/* PRODUCT GRID */}
                <section className="container mx-auto mb-24 px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-800">
                            Meilleures Ventes
                        </h2>
                        <div className="flex gap-2">
                            <button className="rounded-lg bg-slate-100 p-2 text-slate-400 hover:bg-slate-200">
                                <Filter className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

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
                </section>

                {/* IMPACT SECTION - Matching the bottom of reference */}
                <section className="container mx-auto px-4">
                    <div className="rounded-[3rem] border border-slate-100 bg-white p-12 text-center">
                        <h2 className="mb-12 text-3xl font-black text-slate-800">
                            La Boutique AsproQualee fait Grandir nos Projets !
                        </h2>
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            {[
                                {
                                    title: 'Biodiversité',
                                    icon: <Sprout className="h-10 w-10" />,
                                    color: 'bg-emerald-50 text-emerald-600',
                                    desc: 'Protection des espèces aquatiques locales.',
                                },
                                {
                                    title: 'Eau Pure',
                                    icon: <Droplet className="h-10 w-10" />,
                                    color: 'bg-blue-50 text-blue-600',
                                    desc: 'Installation de filtres dans les zones isolées.',
                                },
                                {
                                    title: 'Zéro-Plastique',
                                    icon: <Waves className="h-10 w-10" />,
                                    color: 'bg-teal-50 text-teal-600',
                                    desc: 'Nettoyage des déchets plastiques dans le Mfoundi.',
                                },
                            ].map((pillar, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className={cn(
                                            'mb-6 flex h-24 w-24 items-center justify-center rounded-full',
                                            pillar.color,
                                        )}
                                    >
                                        {pillar.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold">
                                        {pillar.title}
                                    </h3>
                                    <p className="mb-4 max-w-[200px] text-sm text-slate-500">
                                        {pillar.desc}
                                    </p>
                                    <button className="flex items-center gap-2 text-xs font-black tracking-tighter text-slate-400 uppercase hover:text-primary">
                                        En savoir plus{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
