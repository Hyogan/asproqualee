import HeroSection from '@/components/marketing/HeroSection';
import Section from '@/components/marketing/Section';
import MainLayout from '@/layouts/app/app-main-layout';
import { useForm } from '@inertiajs/react';
import { CheckCircle, CreditCard, Droplet, Heart, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Donate() {
    const { data, setData, post, processing } = useForm({
        amount: '',
        customAmount: '',
        frequency: 'once',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        anonymous: false,
        newsletter: true,
    });

    const [step, setStep] = useState(1);

    const amounts = [
        {
            value: '5 000',
            impact: "10 familles accèdent à l'eau potable pendant 1 semaine",
        },
        {
            value: '50 000',
            impact: "Formation d'un comité de gestion communautaire",
        },
        { value: '100 000', impact: "Installation d'une pompe manuelle" },
        {
            value: '250 000 ',
            impact: "Construction d'un point d'eau pour 50 personnes",
        },
    ];

    const selectedAmount = data.amount || data.customAmount;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/donate');
    };

    return (
        <MainLayout
            title="Faire un Don"
            description="Votre don finance directement des projets qui transforment des vies. Chaque euro compte."
        >
            {/* Hero */}
            <HeroSection
                backgroundImage={'backgroundImage'}
                title={''}
                className="h-2.5"
                badgeText="Faire un don "
                subtitle=""
            />
            <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F3F0] via-white to-[#E8F5F4] py-20 lg:py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-[#5CBDB9]/5 blur-3xl" />
                    <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#F28482]/5 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#F28482]/10 px-6 py-3">
                            <Heart className="h-5 w-5 text-[#F28482]" />
                            <span className="text-sm font-bold text-[#F28482]">
                                Chaque Geste Compte
                            </span>
                        </div>

                        <h1 className="mb-6 text-4xl leading-tight font-bold text-[#2D3E3F] sm:text-5xl lg:text-6xl">
                            Transformez une Vie
                            <br />
                            <span className="text-[#5CBDB9]">
                                Avec Votre Don
                            </span>
                        </h1>

                        <p className="mb-8 text-xl leading-relaxed text-[#6B7C7D]">
                            100% de votre don finance directement nos projets
                            sur le terrain. Aucun frais administratif n'est
                            prélevé grâce au soutien de nos partenaires.
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-[#6B7C7D]">
                                <Shield className="h-5 w-5 text-[#84C7A6]" />
                                <span>Paiement 100% sécurisé</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#6B7C7D]">
                                <CheckCircle className="h-5 w-5 text-[#84C7A6]" />
                                <span>Reçu fiscal automatique</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#6B7C7D]">
                                <Heart className="h-5 w-5 text-[#84C7A6]" />
                                <span>0% frais de gestion</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation form */}
            <Section>
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-3xl border-2 border-[#E8E5E0] bg-white p-8 shadow-xl lg:p-10">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    {/* Step 1: Amount */}
                                    <div>
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#5CBDB9] to-[#4A9C98] font-bold text-white">
                                                1
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#2D3E3F]">
                                                Choisissez Votre Montant
                                            </h3>
                                        </div>

                                        {/* Frequency */}
                                        <div className="mb-6 flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData('frequency', 'once')
                                                }
                                                className={`flex-1 rounded-2xl py-4 font-semibold transition-all ${
                                                    data.frequency === 'once'
                                                        ? 'bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] text-white shadow-lg'
                                                        : 'bg-[#F5F3F0] text-[#6B7C7D] hover:bg-[#E8E5E0]'
                                                }`}
                                            >
                                                Don Ponctuel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        'frequency',
                                                        'monthly',
                                                    )
                                                }
                                                className={`flex-1 rounded-2xl py-4 font-semibold transition-all ${
                                                    data.frequency === 'monthly'
                                                        ? 'bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] text-white shadow-lg'
                                                        : 'bg-[#F5F3F0] text-[#6B7C7D] hover:bg-[#E8E5E0]'
                                                }`}
                                            >
                                                Don Mensuel
                                                <span className="mt-1 block text-xs opacity-80">
                                                    Impact durable
                                                </span>
                                            </button>
                                        </div>

                                        {/* Preset amounts */}
                                        <div className="mb-6 grid grid-cols-2 gap-4">
                                            {amounts.map((item) => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setData(
                                                            'amount',
                                                            item.value,
                                                        );
                                                        setData(
                                                            'customAmount',
                                                            '',
                                                        );
                                                    }}
                                                    className={`rounded-2xl border-2 p-6 text-left transition-all ${
                                                        data.amount ===
                                                        item.value
                                                            ? 'border-[#5CBDB9] bg-[#5CBDB9]/5 shadow-md'
                                                            : 'border-[#E8E5E0] hover:border-[#5CBDB9]/30'
                                                    }`}
                                                >
                                                    <div className="mb-2 text-3xl font-bold text-[#2D3E3F]">
                                                        {item.value}Fcfa
                                                    </div>
                                                    <div className="text-sm leading-relaxed text-[#6B7C7D]">
                                                        {item.impact}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Custom amount */}
                                        <div>
                                            <label className="mb-3 block text-sm font-semibold text-[#2D3E3F]">
                                                Ou choisissez votre montant
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={data.customAmount}
                                                    onChange={(e) => {
                                                        setData(
                                                            'customAmount',
                                                            e.target.value,
                                                        );
                                                        setData('amount', '');
                                                    }}
                                                    className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 py-4 pr-12 pl-5 text-lg font-semibold text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                                    placeholder="50"
                                                    min="5"
                                                />
                                                <span className="absolute top-1/2 right-5 -translate-y-1/2 text-lg font-semibold text-[#6B7C7D]">
                                                    Fcfa
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2: Info */}
                                    <div className="border-t-2 border-[#E8E5E0] pt-8">
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#5CBDB9] to-[#4A9C98] font-bold text-white">
                                                2
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#2D3E3F]">
                                                Vos Coordonnées
                                            </h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                <div>
                                                    <label className="mb-3 block text-sm font-semibold text-[#2D3E3F]">
                                                        Prénom{' '}
                                                        <span className="text-[#F28482]">
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
                                                        className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-3 block text-sm font-semibold text-[#2D3E3F]">
                                                        Nom{' '}
                                                        <span className="text-[#F28482]">
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
                                                        className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-3 block text-sm font-semibold text-[#2D3E3F]">
                                                    Email{' '}
                                                    <span className="text-[#F28482]">
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
                                                    className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                                    required
                                                />
                                                <p className="mt-2 text-sm text-[#6B7C7D]">
                                                    Pour recevoir votre reçu
                                                    fiscal
                                                </p>
                                            </div>

                                            <div>
                                                <label className="mb-3 block text-sm font-semibold text-[#2D3E3F]">
                                                    Téléphone{' '}
                                                    <span className="font-normal text-[#6B7C7D]">
                                                        (optionnel)
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
                                                    className="w-full rounded-2xl border-2 border-[#E8E5E0] bg-[#F5F3F0]/50 px-5 py-4 text-[#2D3E3F] transition-all focus:border-[#5CBDB9] focus:bg-white focus:outline-none"
                                                />
                                            </div>

                                            {/* Checkboxes */}
                                            <div className="space-y-4 pt-4">
                                                <label className="group flex cursor-pointer items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.anonymous}
                                                        onChange={(e) =>
                                                            setData(
                                                                'anonymous',
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="mt-1 h-5 w-5 rounded border-2 border-[#E8E5E0] text-[#5CBDB9] focus:ring-[#5CBDB9] focus:ring-offset-0"
                                                    />
                                                    <span className="text-sm text-[#6B7C7D] transition-colors group-hover:text-[#2D3E3F]">
                                                        Je souhaite rester
                                                        anonyme
                                                    </span>
                                                </label>

                                                <label className="group flex cursor-pointer items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            data.newsletter
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'newsletter',
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="mt-1 h-5 w-5 rounded border-2 border-[#E8E5E0] text-[#5CBDB9] focus:ring-[#5CBDB9] focus:ring-offset-0"
                                                    />
                                                    <span className="text-sm text-[#6B7C7D] transition-colors group-hover:text-[#2D3E3F]">
                                                        Je souhaite recevoir des
                                                        nouvelles de
                                                        l'association (1
                                                        email/mois maximum)
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="border-t-2 border-[#E8E5E0] pt-8">
                                        <button
                                            type="submit"
                                            disabled={
                                                !selectedAmount || processing
                                            }
                                            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-10 py-5 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                <CreditCard className="h-6 w-6" />
                                                {processing
                                                    ? 'Traitement...'
                                                    : `Finaliser mon Don de ${selectedAmount}Fcfa`}
                                            </span>
                                            <div className="absolute inset-0 origin-left scale-x-0 transform bg-white/20 transition-transform group-hover:scale-x-100" />
                                        </button>

                                        <p className="mt-4 text-center text-sm text-[#6B7C7D]">
                                            🔒 Paiement sécurisé • Reçu fiscal
                                            envoyé automatiquement
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar - Impact & Trust */}
                        <div className="space-y-6">
                            {/* Current impact */}
                            <div className="rounded-3xl border-2 border-[#5CBDB9]/20 bg-gradient-to-br from-[#5CBDB9]/10 to-[#84C7A6]/10 p-8">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5CBDB9] to-[#4A9C98]">
                                    <Droplet className="h-6 w-6 text-white" />
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-[#2D3E3F]">
                                    Votre Impact Direct
                                </h3>

                                {selectedAmount && (
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#5CBDB9]" />
                                            <p className="text-sm leading-relaxed text-[#6B7C7D]">
                                                {amounts.find(
                                                    (a) =>
                                                        a.value ===
                                                        selectedAmount,
                                                )?.impact ||
                                                    'Votre don finance directement nos projets sur le terrain'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 border-t-2 border-[#5CBDB9]/20 pt-6">
                                    <div className="space-y-2 text-sm text-[#6B7C7D]">
                                        <p className="flex items-center gap-2">
                                            <span className="font-semibold text-[#2D3E3F]">
                                                66%
                                            </span>
                                            de réduction d'impôt
                                        </p>
                                        <p className="text-xs">
                                            Un don de {selectedAmount || '50'}
                                            Fcfa ne vous coûte réellement que{' '}
                                            <span className="font-semibold text-[#2D3E3F]">
                                                {Math.round(
                                                    (parseFloat(
                                                        selectedAmount,
                                                    ) || 50) * 0.34,
                                                )}
                                                Fcfa
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Why trust us */}
                            <div className="rounded-3xl border-2 border-[#E8E5E0] bg-white p-8 shadow-md">
                                <h3 className="mb-6 text-lg font-bold text-[#2D3E3F]">
                                    Pourquoi Nous Faire Confiance ?
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#84C7A6]" />
                                        <p className="text-sm text-[#6B7C7D]">
                                            <span className="font-semibold text-[#2D3E3F]">
                                                100% des dons
                                            </span>{' '}
                                            financent les projets
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#84C7A6]" />
                                        <p className="text-sm text-[#6B7C7D]">
                                            <span className="font-semibold text-[#2D3E3F]">
                                                Transparence totale
                                            </span>{' '}
                                            sur l'utilisation des fonds
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#84C7A6]" />
                                        <p className="text-sm text-[#6B7C7D]">
                                            <span className="font-semibold text-[#2D3E3F]">
                                                Rapports d'impact
                                            </span>{' '}
                                            envoyés régulièrement
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t-2 border-[#E8E5E0] pt-6">
                                    <a
                                        href="/mentions-legales/transparence"
                                        className="text-sm font-semibold text-[#5CBDB9] transition-colors hover:text-[#4A9C98]"
                                    >
                                        Voir nos rapports financiers →
                                    </a>
                                </div>
                            </div>

                            {/* Recent donors */}
                            <div className="rounded-3xl bg-[#F5F3F0] p-8">
                                <h3 className="mb-4 text-lg font-bold text-[#2D3E3F]">
                                    Ils Ont Déjà Fait un Geste 💚
                                </h3>

                                <div className="space-y-3 text-sm text-[#6B7C7D]">
                                    <p>
                                        <span className="font-semibold text-[#2D3E3F]">
                                            Sophie L.
                                        </span>{' '}
                                        a donné 50Fcfa
                                    </p>
                                    <p>
                                        <span className="font-semibold text-[#2D3E3F]">
                                            Marc D.
                                        </span>{' '}
                                        a donné 100Fcfa
                                    </p>
                                    <p>
                                        <span className="font-semibold text-[#2D3E3F]">
                                            Un donateur anonyme
                                        </span>{' '}
                                        a donné 250Fcfa
                                    </p>
                                </div>

                                <div className="mt-4 text-xs text-[#6B7C7D]">
                                    Et 127 autres donateurs ce mois-ci
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
