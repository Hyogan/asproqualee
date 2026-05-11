import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { Head, usePage } from '@inertiajs/react';

interface ValueItem {
    title: string;
    description: string;
    image: string;
}

interface ValuesContent {
    vision_title: string;
    vision_description: string;
    vision_image: string;
    values: ValueItem[];
}

interface Props extends Record<string, unknown> {
    content: ValuesContent;
}

export default function MissionPage() {
    const { content } = usePage<Props>().props;

    return (
        <MainLayout
            title="Vision & Valeurs | AsproQualee"
            description={content.vision_description.slice(0, 160)}
        >
            <Head title="Vision & Valeurs | AsproQualee" />
            <main className="min-h-screen">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1601758123927-2d0c447ed1a3?w=1920&q=80"
                    title={<>Vision & Valeurs <br /><span className="text-primary">Ce qui nous guide</span></>}
                    subtitle="Chaque initiative est pensée pour créer un impact durable, guidé par notre vision et nos valeurs fondamentales."
                />

                <section className="container mx-auto flex flex-col items-center gap-8 px-4 py-16 md:flex-row">
                    {content.vision_image && (
                        <div className="md:w-1/2">
                            <img src={content.vision_image} alt={content.vision_title} className="rounded-xl object-cover shadow-lg" />
                        </div>
                    )}
                    <div className="space-y-4 md:w-1/2">
                        <h2 className="text-3xl font-bold text-foreground">{content.vision_title}</h2>
                        <p className="text-lg whitespace-pre-line text-muted-foreground">{content.vision_description}</p>
                    </div>
                </section>

                {content.values.length > 0 && (
                    <section className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-3">
                        {content.values.map((value, idx) => (
                            <div key={idx} className="space-y-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-105 hover:shadow-lg">
                                {value.image && (
                                    <div className="h-48 w-full overflow-hidden">
                                        <img src={value.image} alt={value.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                <section className="bg-gradient-to-br from-primary to-primary/80 py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="mb-4 text-3xl font-bold">Agissez avec nous</h2>
                        <p className="mb-8 text-lg">Engagez-vous dans nos initiatives pour protéger l'eau et promouvoir un développement durable.</p>
                        <a href="/get-involved" className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90">
                            Rejoindre une action
                        </a>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
