import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    Handshake,
    Heart,
    MessageSquare,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface TabProps {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const tabs: TabProps[] = [
    {
        id: 'volunteer',
        label: 'Bénévolat',
        icon: <Users className="h-5 w-5" />,
    },
    {
        id: 'partnership',
        label: 'Partenariat',
        icon: <Handshake className="h-5 w-5" />,
    },
    {
        id: 'donate',
        label: 'Faire un don',
        icon: <Heart className="h-5 w-5" />,
    },
    {
        id: 'event',
        label: 'Organiser un événement',
        icon: <Calendar className="h-5 w-5" />,
    },
];

function VolunteerTab() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        availability: '',
        skills: '',
        motivation: '',
    });

    const benefits = [
        'Participer à des actions concrètes sur le terrain',
        "Recevoir une formation sur la protection de l'eau",
        'Rejoindre une communauté engagée',
        'Développer de nouvelles compétences',
        'Contribuer à un impact mesurable',
        'Attestation de bénévolat',
    ];

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Info */}
            <div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                    Devenez Bénévole
                </h3>
                <p className="mb-6 text-muted-foreground">
                    Rejoignez notre équipe de bénévoles passionnés et participez
                    activement à la protection de l'eau et de l'environnement.
                    Que vous ayez quelques heures par mois ou davantage, votre
                    contribution compte !
                </p>

                <div className="mb-6">
                    <h4 className="mb-3 font-semibold text-foreground">
                        Ce que vous gagnerez :
                    </h4>
                    <ul className="space-y-2">
                        {benefits.map((benefit, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl bg-secondary/30 p-6">
                    <h4 className="mb-3 font-semibold text-foreground">
                        Types de missions :
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Actions de nettoyage de cours d'eau</p>
                        <p>• Sensibilisation dans les écoles</p>
                        <p>• Distribution de kits d'hygiène</p>
                        <p>• Organisation d'événements</p>
                        <p>• Support administratif</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="mb-4 text-xl font-bold text-foreground">
                    Inscrivez-vous
                </h4>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Nom complet *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            placeholder="Votre nom"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            placeholder="votre@email.com"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Téléphone *
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            placeholder="+237 000 000 000"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Disponibilité
                        </label>
                        <select
                            value={formData.availability}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    availability: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                        >
                            <option value="">Sélectionnez...</option>
                            <option value="weekend">
                                Week-ends uniquement
                            </option>
                            <option value="weekday">En semaine</option>
                            <option value="flexible">Flexible</option>
                            <option value="occasional">
                                Occasionnellement
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Vos compétences
                        </label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    skills: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            placeholder="Communication, organisation, technique..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Votre motivation
                        </label>
                        <textarea
                            value={formData.motivation}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    motivation: e.target.value,
                                })
                            }
                            rows={4}
                            className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                            placeholder="Pourquoi souhaitez-vous nous rejoindre ?"
                        />
                    </div>

                    <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-deep hover:shadow-lg">
                        Envoyer ma candidature
                    </button>
                </div>
            </div>
        </div>
    );
}

function PartnershipTab() {
    const partnershipTypes = [
        {
            title: 'Entreprises',
            description:
                'Engagez votre entreprise dans une démarche RSE concrète',
            benefits: [
                'Visibilité sur nos actions',
                "Bénévolat d'entreprise",
                "Rapports d'impact",
            ],
        },
        {
            title: 'ONG & Associations',
            description: 'Collaborons pour amplifier notre impact',
            benefits: [
                'Projets communs',
                'Partage de ressources',
                'Réseautage',
            ],
        },
        {
            title: 'Institutions Publiques',
            description: "Partenariats pour des projets d'envergure",
            benefits: [
                'Expertise technique',
                'Déploiement à grande échelle',
                'Politique publique',
            ],
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                    Devenez Partenaire
                </h3>
                <p className="text-lg text-muted-foreground">
                    Ensemble, nous pouvons multiplier notre impact. Que vous
                    soyez une entreprise, une ONG ou une institution, explorons
                    comment collaborer pour protéger l'eau.
                </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {partnershipTypes.map((type, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                    >
                        <h4 className="mb-3 text-xl font-bold text-foreground">
                            {type.title}
                        </h4>
                        <p className="mb-4 text-muted-foreground">
                            {type.description}
                        </p>
                        <ul className="space-y-2">
                            {type.benefits.map((benefit, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
                <h4 className="mb-4 text-2xl font-bold text-foreground">
                    Intéressé par un partenariat ?
                </h4>
                <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
                    Contactez-nous pour discuter de comment nous pouvons
                    travailler ensemble et créer un impact durable.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="/contact"
                        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-deep hover:shadow-lg"
                    >
                        Nous contacter
                    </a>
                    <a
                        href="https://wa.me/237000000000"
                        className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:bg-green-600 hover:shadow-lg"
                    >
                        <MessageSquare className="h-5 w-5" />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function GetInvolvedPage() {
    const [activeTab, setActiveTab] = useState('volunteer');

    return (
        <main className="min-h-screen pt-24">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                            Rejoignez Notre Mouvement
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Il existe de nombreuses façons de contribuer à notre
                            mission. Trouvez celle qui vous correspond le mieux.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <section className="sticky top-20 z-40 border-b border-border bg-background py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all',
                                    activeTab === tab.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                                )}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content */}
            <section className="py-16">
                <div className="container mx-auto max-w-6xl px-4">
                    {activeTab === 'volunteer' && <VolunteerTab />}
                    {activeTab === 'partnership' && <PartnershipTab />}
                    {activeTab === 'donate' && (
                        <div className="py-12 text-center">
                            <Heart className="mx-auto mb-6 h-16 w-16 text-primary" />
                            <h3 className="mb-4 text-3xl font-bold text-foreground">
                                Soutenez Notre Action
                            </h3>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                                Votre don nous permet de mener des actions
                                concrètes pour la protection de l'eau et
                                l'amélioration de la santé des communautés.
                            </p>
                            <a
                                href="/donate"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-deep hover:shadow-lg"
                            >
                                Faire un don
                                <ArrowRight className="h-5 w-5" />
                            </a>
                        </div>
                    )}
                    {activeTab === 'event' && (
                        <div className="py-12 text-center">
                            <Calendar className="mx-auto mb-6 h-16 w-16 text-primary" />
                            <h3 className="mb-4 text-3xl font-bold text-foreground">
                                Organisez un Événement
                            </h3>
                            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                                Mobilisez votre communauté, votre école ou votre
                                entreprise autour d'un événement de
                                sensibilisation ou de collecte de fonds. Nous
                                vous accompagnons !
                            </p>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-deep hover:shadow-lg"
                            >
                                Discutons de votre projet
                                <ArrowRight className="h-5 w-5" />
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
