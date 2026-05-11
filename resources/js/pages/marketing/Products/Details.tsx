import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { cn } from '@/lib/utils';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Leaf,
    ShoppingBag,
    ShoppingCart,
    Star,
} from 'lucide-react';

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
    product: Product;
    related: Product[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        'h-4 w-4',
                        i < rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200',
                    )}
                />
            ))}
        </div>
    );
}

export default function ProductDetailsPage() {
    const { product, related } = usePage<Props>().props;

    return (
        <MainLayout>
            <Head title={`${product.name} | Boutique Asproqualee`} />
            <main className="min-h-screen bg-[#FDFDFD]">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80"
                    title={
                        <>
                            Boutique{' '}
                            <span className="text-primary">Solidaire</span>
                        </>
                    }
                    subtitle="Chaque achat finance directement nos actions sur le terrain."
                    badgeText="Boutique"
                />

                <div className="container mx-auto px-4 py-16">
                    <Link
                        href="/produits"
                        className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" /> Retour à la boutique
                    </Link>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-50">
                            {product.tag && (
                                <div className="absolute top-5 left-5 z-10 rounded-full bg-primary px-4 py-1.5 text-xs font-black text-white uppercase shadow">
                                    {product.tag}
                                </div>
                            )}
                            {product.is_eco_friendly && (
                                <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white">
                                    <Leaf className="h-3 w-3" /> Éco
                                </div>
                            )}
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <ShoppingBag className="h-24 w-24 text-slate-300" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div>
                                <span className="text-xs font-black tracking-widest text-primary uppercase">
                                    {product.category}
                                </span>
                                <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
                                    {product.name}
                                </h1>
                            </div>

                            <StarRating rating={product.rating} />

                            <p className="text-4xl font-black text-primary">
                                {product.price.toFixed(2)} Fcfa
                            </p>

                            {product.description && (
                                <p className="text-base leading-relaxed text-slate-600">
                                    {product.description}
                                </p>
                            )}

                            <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                {[
                                    'Produit fabriqué localement au Cameroun',
                                    'Chaque achat soutient nos programmes sur le terrain',
                                    product.is_eco_friendly
                                        ? 'Produit éco-responsable'
                                        : null,
                                ]
                                    .filter(Boolean)
                                    .map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 text-sm text-slate-600"
                                        >
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                            {item}
                                        </div>
                                    ))}
                            </div>

                            <div className="flex gap-3">
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-sm font-black text-white transition-all hover:bg-primary active:scale-95">
                                    <ShoppingCart className="h-4 w-4" /> Ajouter
                                    au panier
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <section className="mt-24">
                            <h2 className="mb-8 text-2xl font-black text-slate-900">
                                Produits similaires
                            </h2>
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                                {related.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/produits/${p.id}`}
                                        className="group flex flex-col rounded-[2rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-xl hover:shadow-primary/5"
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-50">
                                            {p.image ? (
                                                <img
                                                    src={p.image}
                                                    alt={p.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <ShoppingBag className="h-10 w-10 text-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3 px-1">
                                            <p className="line-clamp-2 text-sm font-bold text-slate-800">
                                                {p.name}
                                            </p>
                                            <p className="mt-1 text-sm font-black text-primary">
                                                {p.price.toFixed(2)} Fcfa
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
