import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import marketing from '@/routes/marketing';
import {
    Activity,
    Briefcase,
    ChevronDown,
    Layers,
    LucideIcon,
    Menu,
    X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface NavEl {
    label: string;
    href: string;
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
            { label: 'Qui sommes-nous', href: '/mission/about' },
            { label: 'Vision & Valeurs', href: '/mission/values' },
        ],
    },
    {
        label: 'Nos Actions',
        href: '/actions',
        // children: [
        //     { label: "Protection de l'eau", href: '/actions/water-protection' },
        //     { label: 'Assainissement', href: '/actions/sanitation' },
        //     {
        //         label: 'Développement fluvial',
        //         href: '/actions/river-development',
        //     },
        //     { label: 'Sensibilisation', href: '/actions/awareness' },
        // ],

        children: [
            {
                label: 'Nos actions',
                href: '/actions/',
                icon: <Activity className="h-5 w-5" />,
            },
            {
                label: 'Nos projets',
                href: '/projects',
                icon: <Briefcase className="h-5 w-5" />,
            },
            {
                label: 'Nos programmes',
                href: '/programs',
                icon: <Layers className="h-5 w-5" />,
            },
        ],
    },
    {
        label: 'Eau & Santé',
        href: '/water-health',
        className: '',
    },
    // { label: "S'impliquer", href: '/get-involved' },
    // { label: 'Actualités', href: '/blog', className: '' },
    // { label: 'produits', href: '/produits' },

    {
        label: 'Plus',
        href: '#',
        children: [
            { label: "S'impliquer", href: '/get-involved' },
            { label: 'Actualités', href: '/blog' },
            { label: 'Produits', href: '/produits' },
        ],
    },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* HEADER */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={cn(
                    'fixed top-0 right-0 left-0 z-50 transition-colors duration-300',
                    isScrolled || isMobileMenuOpen
                        ? 'bg-white/95 shadow-md backdrop-blur-md'
                        : 'bg-transparent',
                )}
            >
                <div className="container mx-auto px-4 md:px-18">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <a href="/" className="group flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -3 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <AppLogoIcon />
                            </motion.div>

                            <div className="flex flex-col">
                                <span
                                    className={cn(
                                        'text-lg font-bold transition-colors',
                                        isScrolled || isMobileMenuOpen
                                            ? 'text-foreground'
                                            : 'text-white',
                                    )}
                                >
                                    AsproQualee
                                </span>
                                <span
                                    className={cn(
                                        'text-xs transition-colors',
                                        isScrolled || isMobileMenuOpen
                                            ? 'text-muted-foreground'
                                            : 'text-white/80',
                                    )}
                                >
                                    Protéger l'eau, préserver la vie
                                </span>
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-1 lg:flex">
                            {navigationItems.map((item) => (
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() =>
                                        item.children &&
                                        setActiveDropdown(item.label)
                                    }
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <a
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                            isScrolled
                                                ? 'text-foreground hover:bg-secondary'
                                                : 'text-white hover:bg-white/10',
                                            item.className,
                                        )}
                                    >
                                        {item.label}
                                        {item.children && (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </a>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {item.children &&
                                            activeDropdown === item.label && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -8,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="absolute top-full left-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-white shadow-xl dark:bg-card"
                                                >
                                                    {item.children.map(
                                                        (child) => (
                                                            <a
                                                                key={child.href}
                                                                href={
                                                                    child.href
                                                                }
                                                                className="flex items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary hover:text-white"
                                                            >
                                                                {child.icon && (
                                                                    <>
                                                                        {
                                                                            child.icon
                                                                        }
                                                                    </>
                                                                )}
                                                                {child.label}
                                                            </a>
                                                        ),
                                                    )}
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden items-center gap-3 lg:flex">
                            <a
                                href={marketing.contactUs().url}
                                className={cn(
                                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                    isScrolled
                                        ? 'text-foreground hover:bg-secondary'
                                        : 'text-white hover:bg-white/10',
                                )}
                            >
                                Contact
                            </a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="/donate"
                                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
                            >
                                Faire un don
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                            className={`cursor-pointer rounded-lg p-2 ${isMobileMenuOpen || isScrolled ? 'text-foreground' : 'text-white'} hover:bg-secondary lg:hidden`}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-white lg:hidden dark:bg-background"
                    >
                        <motion.nav
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                            className="flex h-full flex-col gap-6 px-6 pt-24"
                        >
                            {navigationItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="block text-xl font-semibold text-foreground"
                                    >
                                        {item.label}
                                    </a>

                                    {item.children && (
                                        <div className="mt-3 ml-4 space-y-2">
                                            {item.children.map((child) => (
                                                <a
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="block flex items-center gap-2 text-base text-muted-foreground hover:text-primary"
                                                >
                                                    {child.icon && (
                                                        <>{child.icon}</>
                                                    )}
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="mt-auto space-y-3"
                            >
                                <a
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-xl border border-border py-3 text-center font-medium"
                                >
                                    Contact
                                </a>
                                <a
                                    href="/donate"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block rounded-xl bg-accent py-4 text-center text-lg font-bold text-white shadow-lg"
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
