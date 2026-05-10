import Section from '@/components/marketing/Section';
import MainLayout from '@/layouts/app/app-main-layout';
import { Link } from '@inertiajs/react';
import { CheckCircle, Heart } from 'lucide-react';

export default function DonationThankYou() {
    return (
        <MainLayout
            title="Merci pour votre don | Asproqualee"
            description="Votre générosité contribue directement à nos actions sur le terrain."
        >
            <Section>
                <div className="mx-auto max-w-2xl py-24 text-center">
                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#84C7A6] to-[#5CBDB9]">
                        <CheckCircle className="h-12 w-12 text-white" />
                    </div>

                    <h1 className="mb-4 text-4xl font-bold text-[#2D3E3F]">
                        Merci pour votre générosité&nbsp;
                        <Heart className="inline h-8 w-8 text-[#F28482]" />
                    </h1>

                    <p className="mb-4 text-xl leading-relaxed text-[#6B7C7D]">
                        Votre don a bien été enregistré. Notre équipe le traitera dans les plus brefs délais et vous enverra une confirmation par email.
                    </p>

                    <p className="mb-10 text-base text-[#6B7C7D]">
                        Chaque contribution, quelle que soit sa taille, nous aide à protéger l'accès à l'eau potable et à améliorer les conditions sanitaires dans les communautés que nous servons.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5CBDB9] to-[#4A9C98] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            Retour à l'accueil
                        </Link>
                        <Link
                            href="/actions"
                            className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E8E5E0] bg-white px-8 py-4 text-base font-bold text-[#2D3E3F] transition-all hover:bg-[#F5F3F0]"
                        >
                            Voir nos actions
                        </Link>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
