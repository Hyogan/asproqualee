import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
    {
        label: 'À Propos',
        href: '/a-propos',
        children: [
            { label: 'Mission & Valeurs', href: '/a-propos/mission' },
            { label: 'Notre Équipe', href: '/a-propos/equipe' },
            { label: 'Gouvernance', href: '/a-propos/gouvernance' },
        ],
    },
    {
        label: 'Nos Programmes',
        href: '/programmes',
        children: [
            {
                label: 'Eau & Assainissement',
                href: '/programmes/eau-assainissement',
            },
            {
                label: 'Éducation & Sensibilisation',
                href: '/programmes/education',
            },
            { label: 'Hygiène & Santé', href: '/programmes/hygiene-sante' },
            {
                label: 'Protection Environnementale',
                href: '/programmes/environnement',
            },
        ],
    },
    {
        label: 'Projets & Impact',
        href: '/projets',
        children: [
            { label: 'Projets en Cours', href: '/projets/en-cours' },
            { label: 'Projets Réalisés', href: '/projets/realises' },
            { label: 'Notre Impact', href: '/projets/impact' },
        ],
    },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Partenaires', href: '/partenaires' },
    {
        label: "S'Engager",
        href: '/sengager',
        children: [
            { label: 'Devenir Bénévole', href: '/sengager/benevolat' },
            { label: 'Faire un Don', href: '/sengager/don' },
            { label: 'Adhérer', href: '/sengager/adhesion' },
        ],
    },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-[#E8E5E0] bg-white/80 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    {/* <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5CBDB9] to-[#4A9C98] shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
                        <Droplet className="h-7 w-7 text-white" />
                        <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-[#F28482]" />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-base font-bold text-[#2D3E3F]">
                            Association
                        </div>
                        <div className="text-xs font-medium text-[#6B7C7D]">
                            Eau & Environnement
                        </div>
                    </div> */}
                    <AppLogo size="md" variant="upgraded" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <div
                            key={item.label}
                            className="relative"
                            onMouseEnter={() =>
                                item.children && setOpenDropdown(item.label)
                            }
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            {item.children ? (
                                <button className="flex items-center gap-1 text-sm font-semibold text-[#2D3E3F] transition-colors hover:text-[#5CBDB9]">
                                    {item.label}
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-sm font-semibold text-[#2D3E3F] transition-colors hover:text-[#5CBDB9]"
                                >
                                    {item.label}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {item.children && openDropdown === item.label && (
                                <div className="absolute top-full left-0 mt-3 w-72 rounded-2xl border-2 border-[#E8E5E0] bg-white shadow-xl">
                                    <div className="p-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="block rounded-xl px-4 py-3 text-sm font-medium text-[#2D3E3F] transition-all hover:bg-[#5CBDB9]/10 hover:text-[#5CBDB9]"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                    <Link
                        href="/contact"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-[#2D3E3F] transition-colors hover:bg-[#F5F3F0]"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/sengager/don"
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <span className="relative z-10">Faire un Don</span>
                        <div className="absolute inset-0 origin-left scale-x-0 transform bg-white/20 transition-transform group-hover:scale-x-100" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="rounded-xl p-2 text-[#2D3E3F] transition-colors hover:bg-[#F5F3F0] lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t-2 border-[#E8E5E0] bg-white lg:hidden">
                    <div className="space-y-2 px-4 py-6">
                        {navigation.map((item) => (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(
                                                    openDropdown === item.label
                                                        ? null
                                                        : item.label,
                                                )
                                            }
                                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-[#2D3E3F] transition-colors hover:bg-[#F5F3F0]"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${
                                                    openDropdown === item.label
                                                        ? 'rotate-180'
                                                        : ''
                                                }`}
                                            />
                                        </button>
                                        {openDropdown === item.label && (
                                            <div className="mt-2 ml-4 space-y-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block rounded-xl px-4 py-2 text-sm font-medium text-[#6B7C7D] transition-all hover:bg-[#5CBDB9]/10 hover:text-[#5CBDB9]"
                                                        onClick={() =>
                                                            setMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block rounded-xl px-4 py-3 text-base font-semibold text-[#2D3E3F] transition-colors hover:bg-[#F5F3F0]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile CTA */}
                        <div className="mt-6 space-y-3 border-t-2 border-[#E8E5E0] pt-6">
                            <Link
                                href="/contact"
                                className="block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-[#2D3E3F] transition-colors hover:bg-[#F5F3F0]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/sengager/don"
                                className="block w-full rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-6 py-3 text-center text-sm font-bold text-white shadow-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Faire un Don
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
