import HeroSection from '@/components/marketing/HeroSection';
import Section from '@/components/marketing/Section';
import MainLayout from '@/layouts/app/app-main-layout';
import { useForm } from '@inertiajs/react';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => setSubmitted(true),
        });
    };
    const backgroundImage = '/images/water-protection-hero.jpg';

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Notre Bureau',
            content: "123 Avenue de l'Eau\n75000 Paris, France",
            color: 'teal' as const,
        },
        {
            icon: Phone,
            title: 'Téléphone',
            content: '+33 1 23 45 67 89\nLun - Ven : 9h - 18h',
            color: 'coral' as const,
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'contact@association-eau.org\nRéponse sous 48h',
            color: 'mint' as const,
        },
    ];

    const reasons = [
        { value: 'info', label: "Demande d'information" },
        { value: 'partnership', label: 'Proposition de partenariat' },
        { value: 'volunteer', label: 'Bénévolat' },
        { value: 'donation', label: 'Question sur les dons' },
        { value: 'media', label: 'Demande média/presse' },
        { value: 'other', label: 'Autre sujet' },
    ];

    if (submitted) {
        return (
            <MainLayout
                title="Message Envoyé"
                description="Merci pour votre message"
            >
                <Section>
                    <div className="mx-auto max-w-2xl py-20 text-center">
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#84C7A6] to-[#5CBDB9]">
                            <MessageCircle className="h-12 w-12 text-white" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold text-[#2D3E3F]">
                            Merci pour Votre Message ! 💚
                        </h1>

                        <p className="mb-8 text-xl leading-relaxed text-[#6B7C7D]">
                            Nous avons bien reçu votre message et nous vous
                            répondrons dans les plus brefs délais, généralement
                            sous 48 heures.
                        </p>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="/"
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                Retour à l'Accueil
                            </a>
                            <a
                                href="/projets"
                                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E8E5E0] bg-white px-8 py-4 text-base font-bold text-[#2D3E3F] transition-all hover:bg-[#F5F3F0]"
                            >
                                Découvrir Nos Projets
                            </a>
                        </div>
                    </div>
                </Section>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            title="Contactez-Nous"
            description="Une question ? Un projet ? Nous sommes là pour vous écouter et vous accompagner."
        >
            {/* Hero */}
            <HeroSection
                backgroundImage={backgroundImage}
                title={
                    <>
                        Parlons de Votre Projet
                        <br />
                        <span className="text-[#5CBDB9]">
                            ou de Vos Questions
                        </span>
                    </>
                }
                subtitle="Que vous souhaitiez en savoir plus sur nos actions, nous rejoindre, ou simplement échanger, nous serions ravis de vous entendre."
            />

            {/* Contact info cards */}
            <Section background="muted">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-6 sm:grid-cols-3">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            const colors = {
                                teal: 'from-[#5CBDB9] to-[#4A9C98]',
                                coral: 'from-[#F28482] to-[#FFB5B3]',
                                mint: 'from-[#84C7A6] to-[#A8DABC]',
                            };

                            return (
                                <div
                                    key={index}
                                    className="rounded-3xl bg-white p-8 shadow-md transition-all hover:shadow-lg"
                                >
                                    <div
                                        className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${colors[info.color]} mb-6 flex items-center justify-center`}
                                    >
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>

                                    <h3 className="mb-3 text-xl font-bold text-[#2D3E3F]">
                                        {info.title}
                                    </h3>

                                    <p className="leading-relaxed whitespace-pre-line text-[#6B7C7D]">
                                        {info.content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* Form section */}
            <Section>
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-[#2D3E3F]">
                            Envoyez-Nous un Message
                        </h2>
                        <p className="text-lg text-[#6B7C7D]">
                            Remplissez le formulaire ci-dessous et nous vous
                            répondrons rapidement.
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-[#E8E5E0] bg-white p-8 shadow-xl lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name & Email */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-3 block text-sm font-semibold text-[#2D3E3F]"
                                    >
                                        Votre Nom{' '}
                                        <span className="text-[#F28482]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all placeholder:text-[#6B7C7D]/50 focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                        placeholder="Marie Dupont"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-[#F28482]">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-3 block text-sm font-semibold text-[#2D3E3F]"
                                    >
                                        Votre Email{' '}
                                        <span className="text-[#F28482]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all placeholder:text-[#6B7C7D]/50 focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                        placeholder="marie@exemple.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-[#F28482]">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-3 block text-sm font-semibold text-[#2D3E3F]"
                                >
                                    Téléphone{' '}
                                    <span className="font-normal text-[#6B7C7D]">
                                        (optionnel)
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all placeholder:text-[#6B7C7D]/50 focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                    placeholder="+33 6 12 34 56 78"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-3 block text-sm font-semibold text-[#2D3E3F]"
                                >
                                    Sujet de Votre Message{' '}
                                    <span className="text-[#F28482]">*</span>
                                </label>
                                <select
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) =>
                                        setData('subject', e.target.value)
                                    }
                                    className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                    required
                                >
                                    <option value="">
                                        Choisissez un sujet...
                                    </option>
                                    {reasons.map((reason) => (
                                        <option
                                            key={reason.value}
                                            value={reason.value}
                                        >
                                            {reason.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject && (
                                    <p className="mt-2 text-sm text-[#F28482]">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-3 block text-sm font-semibold text-[#2D3E3F]"
                                >
                                    Votre Message{' '}
                                    <span className="text-[#F28482]">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    rows={6}
                                    className="w-full resize-none rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all placeholder:text-[#6B7C7D]/50 focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                    placeholder="Parlez-nous de votre projet, de vos questions, ou de ce qui vous intéresse..."
                                    required
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-[#F28482]">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {processing
                                            ? 'Envoi en cours...'
                                            : 'Envoyer le Message'}
                                        {!processing && (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </span>
                                    <div className="absolute inset-0 origin-left scale-x-0 transform bg-white/20 transition-transform group-hover:scale-x-100" />
                                </button>

                                <div className="flex items-center gap-2 text-sm text-[#6B7C7D]">
                                    <Clock className="h-4 w-4" />
                                    <span>Réponse sous 48h</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Trust message */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-[#6B7C7D]">
                            🔒 Vos données sont protégées et ne seront jamais
                            partagées avec des tiers.
                        </p>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
