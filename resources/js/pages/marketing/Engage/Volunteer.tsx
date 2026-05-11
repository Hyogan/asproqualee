// import Section from '@/Components/Section';
// import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/components/marketing/HeroSection';
import Section from '@/components/marketing/Section';
import MainLayout from '@/layouts/app/app-main-layout';
import { useForm } from '@inertiajs/react';
import { CheckCircle, Heart, Send, Users } from 'lucide-react';
import { useState } from 'react';

export default function Volunteer() {
    const { data, setData, post, processing, errors } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        availability: '',
        skills: [] as string[],
        motivation: '',
        experience: '',
        commitment: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const skillsOptions = [
        { value: 'construction', label: 'Travaux de construction' },
        { value: 'teaching', label: 'Enseignement / Formation' },
        { value: 'healthcare', label: 'Santé / Hygiène' },
        { value: 'communication', label: 'Communication / Média' },
        { value: 'admin', label: 'Gestion administrative' },
        { value: 'fundraising', label: 'Collecte de fonds' },
        { value: 'tech', label: 'Informatique / Web' },
        { value: 'translation', label: 'Traduction' },
        { value: 'other', label: 'Autre compétence' },
    ];

    const commitmentOptions = [
        { value: 'punctual', label: 'Mission ponctuelle (1 jour à 1 semaine)' },
        {
            value: 'regular',
            label: 'Engagement régulier (quelques heures/semaine)',
        },
        { value: 'longterm', label: 'Long terme (plusieurs mois)' },
        { value: 'flexible', label: 'Flexible selon les besoins' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/volunteer/apply', {
            onSuccess: () => setSubmitted(true),
        });
    };

    const toggleSkill = (skill: string) => {
        const newSkills = data.skills.includes(skill)
            ? data.skills.filter((s) => s !== skill)
            : [...data.skills, skill];
        setData('skills', newSkills);
    };

    if (submitted) {
        return (
            <MainLayout
                title="Candidature Reçue"
                description="Merci pour votre engagement"
            >
                <Section>
                    <div className="mx-auto max-w-3xl py-20 text-center">
                        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#7dc044] to-[#03b6ed]">
                            <Heart className="h-12 w-12 text-white" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold text-[#0b2a3d]">
                            Merci pour Votre Générosité ! 💚
                        </h1>

                        <p className="mb-8 text-xl leading-relaxed text-[#4a6a7d]">
                            Votre candidature a bien été reçue. Notre équipe va
                            l'étudier et vous contactera dans les prochains
                            jours pour échanger sur les opportunités de
                            bénévolat qui correspondent à votre profil.
                        </p>

                        <div className="mb-8 rounded-3xl bg-[#03b6ed]/10 p-8">
                            <p className="mb-2 text-lg font-semibold text-[#0b2a3d]">
                                Et en attendant ?
                            </p>
                            <p className="text-[#4a6a7d]">
                                Suivez-nous sur les réseaux sociaux pour
                                découvrir les coulisses de nos projets et
                                rencontrer notre communauté de bénévoles !
                            </p>
                        </div>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="/"
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#03b6ed] to-[#0299c9] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                Retour à l'Accueil
                            </a>
                            <a
                                href="/actualites"
                                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E8E5E0] bg-white px-8 py-4 text-base font-bold text-[#0b2a3d] transition-all hover:bg-[#F5F3F0]"
                            >
                                Nos Actualités
                            </a>
                        </div>
                    </div>
                </Section>
            </MainLayout>
        );
    }

    return (
        <MainLayout
            title="Devenir Bénévole"
            description="Rejoignez notre équipe de bénévoles passionnés et contribuez concrètement à transformer des vies."
        >
            {/* Hero */}
            {/* <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F3F0] via-white to-[#E8F5F4] py-20 lg:py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-[#7dc044]/5 blur-3xl" />
                    <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#055288]/5 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#7dc044]/10 px-6 py-3">
                                <Users className="h-5 w-5 text-[#7dc044]" />
                                <span className="text-sm font-bold text-[#0299c9]">
                                    Rejoignez l'Aventure
                                </span>
                            </div>

                            <h1 className="mb-6 text-4xl leading-tight font-bold text-[#0b2a3d] sm:text-5xl lg:text-6xl">
                                Devenez Bénévole,
                                <br />
                                <span className="text-[#03b6ed]">
                                    Transformez des Vies
                                </span>
                            </h1>

                            <p className="mb-8 text-xl leading-relaxed text-[#4a6a7d]">
                                Que vous ayez quelques heures par mois ou
                                souhaitiez vous engager sur le long terme, il y
                                a une place pour vous dans notre équipe.
                                Ensemble, créons un impact durable.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#7dc044]" />
                                    <p className="text-[#4a6a7d]">
                                        <span className="font-semibold text-[#0b2a3d]">
                                            50+ bénévoles actifs
                                        </span>{' '}
                                        dans toute la région
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#7dc044]" />
                                    <p className="text-[#4a6a7d]">
                                        <span className="font-semibold text-[#0b2a3d]">
                                            Missions variées
                                        </span>{' '}
                                        selon vos compétences et disponibilités
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#7dc044]" />
                                    <p className="text-[#4a6a7d]">
                                        <span className="font-semibold text-[#0b2a3d]">
                                            Formation et accompagnement
                                        </span>{' '}
                                        pour chaque bénévole
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="/images/volunteers/team.jpg"
                                    alt="Bénévoles sur le terrain"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl">
                                <div className="text-3xl font-bold text-[#03b6ed]">
                                    +50
                                </div>
                                <div className="text-sm text-[#4a6a7d]">
                                    Bénévoles Actifs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <HeroSection
                backgroundImage="/images/volunteers/team.jpg"
                badgeText="Rejoignez l'Aventure"
                title={
                    <>
                        Devenez Bénévole,
                        <br />
                        <span className="text-primary">
                            Transformez des Vies
                        </span>
                    </>
                }
                subtitle={
                    <>
                        Que vous ayez quelques heures par mois ou souhaitiez
                        vous engager sur le long terme, il y a une place pour
                        vous dans notre équipe. Ensemble, créons un impact
                        durable.
                    </>
                }
            />

            {/* Application Form */}
            <Section>
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-[#0b2a3d]">
                            Parlez-Nous de Vous
                        </h2>
                        <p className="text-lg text-[#4a6a7d]">
                            Prenez quelques minutes pour nous aider à mieux vous
                            connaître et à trouver la mission qui vous
                            correspond.
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-[#E8E5E0] bg-white p-8 shadow-xl lg:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Personal Info */}
                            <div>
                                <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0b2a3d]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#03b6ed] to-[#0299c9] text-sm font-bold text-white">
                                        1
                                    </div>
                                    Informations Personnelles
                                </h3>

                                <div className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                                Prénom{' '}
                                                <span className="text-[#055288]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.firstName}
                                                onChange={(e) =>
                                                    setData(
                                                        'firstName',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                                Nom{' '}
                                                <span className="text-[#055288]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.lastName}
                                                onChange={(e) =>
                                                    setData(
                                                        'lastName',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                                Email{' '}
                                                <span className="text-[#055288]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                                Téléphone{' '}
                                                <span className="text-[#055288]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'phone',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                            Ville / Région{' '}
                                            <span className="text-[#055288]">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.location}
                                            onChange={(e) =>
                                                setData(
                                                    'location',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                            placeholder="Ex: Yaoundé, Douala..."
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Skills & Availability */}
                            <div className="border-t-2 border-[#E8E5E0] pt-10">
                                <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0b2a3d]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#03b6ed] to-[#0299c9] text-sm font-bold text-white">
                                        2
                                    </div>
                                    Vos Compétences et Disponibilités
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-4 block text-sm font-semibold text-[#0b2a3d]">
                                            Compétences et Domaines d'Intérêt{' '}
                                            <span className="font-normal text-[#4a6a7d]">
                                                (plusieurs choix possibles)
                                            </span>
                                        </label>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {skillsOptions.map((skill) => (
                                                <label
                                                    key={skill.value}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                                                        data.skills.includes(
                                                            skill.value,
                                                        )
                                                            ? 'border-[#03b6ed] bg-[#03b6ed]/5'
                                                            : 'border-[#E8E5E0] hover:border-[#03b6ed]/30'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={data.skills.includes(
                                                            skill.value,
                                                        )}
                                                        onChange={() =>
                                                            toggleSkill(
                                                                skill.value,
                                                            )
                                                        }
                                                        className="h-5 w-5 rounded border-2 border-[#E8E5E0] text-[#03b6ed] focus:ring-[#03b6ed]"
                                                    />
                                                    <span className="text-sm font-medium text-[#0b2a3d]">
                                                        {skill.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                            Type d'Engagement Souhaité{' '}
                                            <span className="text-[#055288]">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={data.commitment}
                                            onChange={(e) =>
                                                setData(
                                                    'commitment',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                            required
                                        >
                                            <option value="">
                                                Choisissez votre engagement...
                                            </option>
                                            {commitmentOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                            Vos Disponibilités
                                        </label>
                                        <textarea
                                            value={data.availability}
                                            onChange={(e) =>
                                                setData(
                                                    'availability',
                                                    e.target.value,
                                                )
                                            }
                                            rows={3}
                                            className="w-full resize-none rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                            placeholder="Ex: Disponible les week-ends, ou 2 jours par semaine, ou pendant les vacances scolaires..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Motivation */}
                            <div className="border-t-2 border-[#E8E5E0] pt-10">
                                <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#0b2a3d]">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#03b6ed] to-[#0299c9] text-sm font-bold text-white">
                                        3
                                    </div>
                                    Votre Motivation
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                            Pourquoi souhaitez-vous devenir
                                            bénévole ?{' '}
                                            <span className="text-[#055288]">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            value={data.motivation}
                                            onChange={(e) =>
                                                setData(
                                                    'motivation',
                                                    e.target.value,
                                                )
                                            }
                                            rows={5}
                                            className="w-full resize-none rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                            placeholder="Partagez avec nous ce qui vous motive à nous rejoindre..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm font-semibold text-[#0b2a3d]">
                                            Expérience Associative ou Bénévolat
                                            Antérieur{' '}
                                            <span className="font-normal text-[#4a6a7d]">
                                                (optionnel)
                                            </span>
                                        </label>
                                        <textarea
                                            value={data.experience}
                                            onChange={(e) =>
                                                setData(
                                                    'experience',
                                                    e.target.value,
                                                )
                                            }
                                            rows={4}
                                            className="w-full resize-none rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#0b2a3d] transition-all focus:border-[#03b6ed] focus:bg-white focus:outline-none"
                                            placeholder="Si vous avez déjà fait du bénévolat, parlez-nous de cette expérience..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="border-t-2 border-[#E8E5E0] pt-10">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#03b6ed] to-[#0299c9] px-10 py-5 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {processing
                                            ? 'Envoi en cours...'
                                            : 'Envoyer Ma Candidature'}
                                        {!processing && (
                                            <Send className="h-6 w-6" />
                                        )}
                                    </span>
                                    <div className="absolute inset-0 origin-left scale-x-0 transform bg-white/20 transition-transform group-hover:scale-x-100" />
                                </button>

                                <p className="mt-6 text-center text-sm text-[#4a6a7d]">
                                    En envoyant ce formulaire, vous acceptez
                                    d'être contacté par notre équipe pour
                                    échanger sur les opportunités de bénévolat.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>

            {/* FAQ / Reassurance */}
            <Section background="muted">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-12 text-center text-3xl font-bold text-[#0b2a3d]">
                        Questions Fréquentes
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Dois-je avoir de l'expérience pour devenir bénévole ?",
                                a: "Pas du tout ! Nous accueillons des personnes de tous horizons. Ce qui compte, c'est votre motivation et votre envie d'apprendre. Nous vous formerons sur les aspects techniques.",
                            },
                            {
                                q: "Combien de temps dois-je m'engager ?",
                                a: "C'est vous qui décidez ! Certains bénévoles viennent ponctuellement pour des événements, d'autres s'engagent sur du long terme. Nous nous adaptons à vos disponibilités.",
                            },
                            {
                                q: 'Y a-t-il des frais à prévoir ?',
                                a: "Non, le bénévolat est gratuit. Pour certaines missions sur le terrain, nous prenons en charge les frais de déplacement et d'hébergement si nécessaire.",
                            },
                            {
                                q: 'Que se passe-t-il après ma candidature ?',
                                a: 'Nous vous contacterons dans les 5 jours pour un premier échange téléphonique. Ensuite, nous vous proposerons des missions adaptées à votre profil et vos disponibilités.',
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-3xl bg-white p-8 shadow-md"
                            >
                                <h3 className="mb-3 text-lg font-bold text-[#0b2a3d]">
                                    {faq.q}
                                </h3>
                                <p className="leading-relaxed text-[#4a6a7d]">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
