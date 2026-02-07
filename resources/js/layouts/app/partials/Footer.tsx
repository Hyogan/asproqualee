import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import {
    Droplet,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';

const footerLinks = {
    association: {
        title: 'Association',
        links: [
            { label: 'Mission & Valeurs', href: '/a-propos/mission' },
            { label: 'Notre Équipe', href: '/a-propos/equipe' },
            { label: 'Gouvernance', href: '/a-propos/gouvernance' },
            { label: 'Transparence', href: '/mentions-legales/transparence' },
        ],
    },
    programmes: {
        title: 'Nos Programmes',
        links: [
            {
                label: 'Eau & Assainissement',
                href: '/programmes/eau-assainissement',
            },
            { label: 'Éducation', href: '/programmes/education' },
            { label: 'Hygiène & Santé', href: '/programmes/hygiene-sante' },
            { label: 'Environnement', href: '/programmes/environnement' },
        ],
    },
    engagement: {
        title: "S'Engager",
        links: [
            { label: 'Devenir Bénévole', href: '/sengager/benevolat' },
            { label: 'Faire un Don', href: '/sengager/don' },
            { label: 'Adhérer', href: '/sengager/adhesion' },
            { label: 'Partenaires', href: '/partenaires' },
        ],
    },
    ressources: {
        title: 'Ressources',
        links: [
            { label: 'Actualités', href: '/actualites' },
            { label: 'Événements', href: '/actualites/evenements' },
            { label: 'Publications', href: '/actualites/articles' },
            { label: 'Contact', href: '/contact' },
        ],
    },
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-muted/30">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <AppLogoIcon />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">
                                    Association
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Eau & Environnement
                                </div>
                            </div>
                        </Link>

                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            Nous œuvrons pour l'accès à l'eau potable,
                            l'assainissement, l'hygiène et la protection de
                            l'environnement dans nos communautés.
                        </p>

                        {/* Contact Info */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>
                                    123 Avenue de l'Eau, 75000 Paris, France
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                <span>+33 1 23 45 67 89</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <a
                                    href="mailto:contact@association-eau.org"
                                    className="transition-colors hover:text-primary"
                                >
                                    contact@association-eau.org
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-4 text-sm font-semibold text-foreground">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Association Eau & Environnement.
                            Tous droits réservés.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <Link
                                href="/mentions-legales/confidentialite"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Confidentialité
                            </Link>
                            <span className="text-border">•</span>
                            <Link
                                href="/mentions-legales/conditions"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Conditions
                            </Link>
                            <span className="text-border">•</span>
                            <Link
                                href="/mentions-legales"
                                className="text-muted-foreground transition-colors hover:text-primary"
                            >
                                Mentions Légales
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
