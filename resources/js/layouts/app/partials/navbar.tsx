import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import { ChevronDown, Droplet, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navigationItems = [
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
        children: [
            { label: "Protection de l'eau", href: '/actions/water-protection' },
            { label: 'Assainissement', href: '/actions/sanitation' },
            {
                label: 'Développement fluvial',
                href: '/actions/river-development',
            },
            { label: 'Sensibilisation', href: '/actions/awareness' },
        ],
    },
    { label: 'Eau & Santé', href: '/water-health' },
    { label: "S'impliquer", href: '/get-involved' },
    { label: 'Actualités', href: '/news' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/95 shadow-md backdrop-blur-md dark:bg-background/95'
                    : 'bg-transparent',
            )}
        >
            <div className="container mx-auto px-4 md:px-18">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="group flex items-center gap-3">
                        {/* <div
                            className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                                isScrolled
                                    ? 'bg-primary'
                                    : 'bg-white/20 backdrop-blur-sm',
                            )}
                        >
                            <Droplet
                                className={cn(
                                    'h-7 w-7 transition-colors',
                                    isScrolled ? 'text-white' : 'text-white',
                                )}
                            />
                        </div> */}
                        <AppLogoIcon />
                        <div className="flex flex-col">
                            <span
                                className={cn(
                                    'text-lg leading-tight font-bold transition-colors',
                                    isScrolled
                                        ? 'text-foreground'
                                        : 'text-white',
                                )}
                            >
                                AsproQualee
                            </span>
                            <span
                                className={cn(
                                    'text-xs leading-tight transition-colors',
                                    isScrolled
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
                                        'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                                        isScrolled
                                            ? 'text-foreground hover:bg-secondary hover:text-primary'
                                            : 'text-white hover:bg-white/10',
                                    )}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </a>

                                {/* Dropdown */}
                                {item.children &&
                                    activeDropdown === item.label && (
                                        <div className="absolute top-full left-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-white shadow-xl dark:bg-card">
                                            {item.children.map((child) => (
                                                <a
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary hover:text-white"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <a
                            href="/contact"
                            className={cn(
                                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                                isScrolled
                                    ? 'text-foreground hover:bg-secondary'
                                    : 'text-white hover:bg-white/10',
                            )}
                        >
                            Contact
                        </a>
                        <a
                            href="/donate"
                            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 hover:shadow-lg"
                        >
                            Faire un don
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            'rounded-lg p-2 transition-colors lg:hidden',
                            isScrolled
                                ? 'text-foreground hover:bg-secondary'
                                : 'text-white hover:bg-white/10',
                        )}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="border-t border-border bg-white lg:hidden dark:bg-background">
                    <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
                        {navigationItems.map((item) => (
                            <div key={item.href}>
                                <a
                                    href={item.href}
                                    className="block rounded-lg px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                                >
                                    {item.label}
                                </a>
                                {item.children && (
                                    <div className="mt-1 ml-4 flex flex-col gap-1">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                            <a
                                href="/contact"
                                className="rounded-lg px-4 py-3 text-center font-medium text-foreground transition-colors hover:bg-secondary"
                            >
                                Contact
                            </a>
                            <a
                                href="/donate"
                                className="rounded-lg bg-accent px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-accent/90"
                            >
                                Faire un don
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
