import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import marketing from '@/routes/marketing';
import { usePage } from '@inertiajs/react';
import {
    Activity,
    Briefcase,
    ChevronDown,
    HandHeart,
    Layers,
    Menu,
    Newspaper,
    ShoppingBag,
    X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface NavEl {
    label: string;
    href: string;
    description?: string; // Added description for richer mega-menus
    icon?: ReactNode | null;
    children?: NavEl[];
    className?: string;
}

const navigationItems: NavEl[] = [
    { label: 'Accueil', href: '/' },
    {
        label: 'Notre Mission',
        href: '/mission',
        children: [
            { label: 'Qui sommes-nous', href: '/mission/about', description: 'Notre histoire, nos engagements.' },
            { label: 'Vision & Valeurs', href: '/mission/values', description: 'Ce qui guide nos actions quotidiennes.' },
        ],
    },
    {
        label: 'Nos Actions',
        href: '/actions',
        children: [
            {
                label: 'Nos actions',
                href: '/actions/',
                icon: <Activity className="h-5 w-5 text-blue-500" />,
                description: 'Découvrez l’impact direct de notre travail sur le terrain.'
            },
            {
                label: 'Nos projets',
                href: '/projects',
                icon: <Briefcase className="h-5 w-5 text-emerald-500" />,
                description: 'Initiatives en cours de développement.'
            },
            {
                label: 'Nos programmes',
                href: '/programs',
                icon: <Layers className="h-5 w-5 text-purple-500" />,
                description: 'Cadres stratégiques à long terme.'
            },
        ],
    },
    {
        label: 'Eau & Santé',
        href: '/water-health',
    },
    {
        label: 'Plus',
        href: '#',
        children: [
            {
                label: "S'impliquer",
                href: '/get-involved',
                icon: <HandHeart className="h-5 w-5 text-rose-500" />,
                description: 'Devenez bénévole ou partenaire.'
            },
            {
                label: 'Actualités',
                href: '/blog',
                icon: <Newspaper className="h-5 w-5 text-amber-500" />,
                description: 'Articles, rapports et dernières nouvelles.'
            },
            {
                label: 'Produits',
                href: '/produits',
                icon: <ShoppingBag className="h-5 w-5 text-teal-500" />,
                description: 'Soutenez-nous via notre boutique.'
            },
        ],
    },
];

function isActive(href: string, currentPath: string): boolean {
    if (href === '/') return currentPath === '/';
    if (href === '#') return false;
    return currentPath === href || currentPath.startsWith(href + '/');
}

function hasActiveChild(children: NavEl[] | undefined, currentPath: string): boolean {
    return !!children?.some((child) => isActive(child.href, currentPath));
}

export function Header() {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* HEADER container layout shifts down slightly & floating on scroll */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                    'fixed right-0 left-0 z-50 transition-all duration-300 mx-auto',
                    isScrolled 
                        ? 'top-4 max-w-6xl w-[92%] rounded-2xl bg-white/90 shadow-xl border border-slate-200/50 backdrop-blur-xl px-2' 
                        : 'top-0 max-w-full w-full bg-transparent px-0'
                )}
            >
                <div className="container mx-auto px-4 lg:px-8">
                    <div className={cn("flex items-center justify-between transition-all duration-300", isScrolled ? "h-16" : "h-24")}>
                        
                        {/* Logo Block */}
                        <a href="/" className="group flex items-center gap-3 shrink-0">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                                <AppLogoIcon className="h-9 w-9" />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={cn('text-md font-bold tracking-tight transition-colors', isScrolled || isMobileMenuOpen ? 'text-slate-900' : 'text-white')}>
                                    AsproQualee
                                </span>
                                <span className={cn('text-[10px] font-medium transition-colors tracking-wide', isScrolled || isMobileMenuOpen ? 'text-slate-500' : 'text-white/70')}>
                                    Protéger l'eau, préserver la vie
                                </span>
                            </div>
                        </a>

                        {/* Modern Desktop Navigation Menu */}
                        <nav 
                            className="hidden items-center gap-1 lg:flex relative h-full"
                            onMouseLeave={() => {
                                setHoveredTab(null);
                                setActiveDropdown(null);
                            }}
                        >
                            {navigationItems.map((item) => {
                                const isItemActive = isActive(item.href, currentPath) || hasActiveChild(item.children, currentPath);
                                const isOpen = activeDropdown === item.label;

                                return (
                                    <div
                                        key={item.href}
                                        className="relative flex items-center h-full px-1"
                                        onMouseEnter={() => {
                                            setHoveredTab(item.label);
                                            if (item.children) setActiveDropdown(item.label);
                                            else setActiveDropdown(null);
                                        }}
                                    >
                                        <a
                                            href={item.href}
                                            className={cn(
                                                'relative z-10 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                                                isScrolled 
                                                    ? (isItemActive ? 'text-primary font-semibold' : 'text-slate-600') 
                                                    : (isItemActive ? 'text-white font-semibold' : 'text-white/80'),
                                                isScrolled ? 'hover:text-slate-900' : 'hover:text-white'
                                            )}
                                        >
                                            {item.label}
                                            {item.children && (
                                                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200 opacity-70", isOpen && "rotate-180")} />
                                            )}
                                        </a>

                                        {/* Hover Slider highlight effect */}
                                        {hoveredTab === item.label && (
                                            <motion.div
                                                layoutId="nav-active-pill"
                                                className={cn("absolute inset-y-3 inset-x-0 -z-0 rounded-lg", isScrolled ? "bg-slate-100" : "bg-white/10")}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}

                                        {/* Premium Grid Mega Dropdown Layout */}
                                        <AnimatePresence>
                                            {item.children && isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute top-[85%] left-1/2 -translate-x-1/2 mt-1 w-[340px] md:w-[420px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl"
                                                >
                                                    <div className="grid gap-1">
                                                        {item.children.map((child) => (
                                                            <a
                                                                key={child.href}
                                                                href={child.href}
                                                                className={cn(
                                                                    'group flex items-start gap-3.5 rounded-xl p-3 text-left transition-all hover:bg-slate-50',
                                                                    isActive(child.href, currentPath) && 'bg-blue-50/50'
                                                                )}
                                                            >
                                                                {child.icon ? (
                                                                    <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                                        {child.icon}
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-2 w-2 rounded-full bg-slate-300 mt-2 group-hover:bg-primary" />
                                                                )}
                                                                <div>
                                                                    <div className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                                                                        {child.label}
                                                                    </div>
                                                                    {child.description && (
                                                                        <p className="mt-0.5 text-xs text-slate-500 leading-normal line-clamp-2 font-normal">
                                                                            {child.description}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Desktop Action Segment */}
                        <div className="hidden items-center gap-4 lg:flex shrink-0">
                            <a
                                href={marketing.contactUs().url}
                                className={cn(
                                    'text-sm font-medium transition-colors',
                                    isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'
                                )}
                            >
                                Contact
                            </a>
                            <motion.a
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                href="/donate"
                                className={cn(
                                    "rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all text-white",
                                    isScrolled ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10" : "bg-accent shadow-black/10"
                                )}
                            >
                                Faire un don
                            </motion.a>
                        </div>

                        {/* Mobile Menu Trigger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className={cn(
                                'rounded-xl p-2.5 transition-colors lg:hidden',
                                isMobileMenuOpen || isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                            )}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE MENU PANEL (Kept original logic, updated semantics) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white lg:hidden"
                    >
                        <motion.nav
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.05 } },
                            }}
                            className="flex h-full flex-col gap-5 px-6 pt-28 pb-10"
                        >
                            {navigationItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            'block text-lg font-bold text-slate-900',
                                            (isActive(item.href, currentPath) || hasActiveChild(item.children, currentPath)) && 'text-blue-600'
                                        )}
                                    >
                                        {item.label}
                                    </a>

                                    {item.children && (
                                        <div className="mt-2 ml-4 border-l-2 border-slate-100 pl-4 space-y-3">
                                            {item.children.map((child) => (
                                                <a
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={cn(
                                                        'flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900',
                                                        isActive(child.href, currentPath) && 'font-bold text-blue-600'
                                                    )}
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="mt-auto space-y-3"
                            >
                                <a
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700"
                                >
                                    Contact
                                </a>
                                <a
                                    href="/donate"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-xl bg-blue-600 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/10"
                                >
                                    Faire un don
                                </a>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}