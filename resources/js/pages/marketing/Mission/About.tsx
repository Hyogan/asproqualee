import HeroSection from '@/components/marketing/HeroSection';
import MainLayout from '@/layouts/app/app-main-layout';
import { Head, usePage } from '@inertiajs/react';

interface FocusArea {
    title: string;
    description: string;
    image: string;
}

interface AboutContent {
    subtitle: string;
    intro: string;
    focus_areas: FocusArea[];
    cta_text: string;
}

interface Props extends Record<string, unknown> {
    content: AboutContent;
}

export default function AboutPage() {
    const { content } = usePage<Props>().props;
    const paragraphs = content.intro.split(/\n\n+/).filter(Boolean);

    return (
        <MainLayout
            title="Notre Mission | AsproQualee"
            description={content.subtitle}
        >
            <Head title="Notre Mission | AsproQualee" />
            <main className="min-h-screen">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1920&q=80"
                    title={<>Notre Mission <br /><span className="text-primary">Impact Durable</span></>}
                    subtitle={content.subtitle}
                />

                <section className="container mx-auto px-4 py-16">
                    <h2 className="mb-6 text-3xl font-bold text-foreground">Qui nous sommes</h2>
                    {paragraphs.map((p, i) => (
                        <p key={i} className="mb-6 text-lg text-muted-foreground">{p}</p>
                    ))}
                </section>

                {content.focus_areas.length > 0 && (
                    <section className="bg-gradient-to-b from-background to-secondary/10 py-16">
                        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-3">
                            {content.focus_areas.map((area, i) => (
                                <div key={i} className="space-y-4 text-center">
                                    {area.image && (
                                        <img src={area.image} alt={area.title} className="mx-auto h-48 w-full rounded-xl object-cover" />
                                    )}
                                    <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                                    <p className="text-sm text-muted-foreground">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="bg-primary py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="mb-4 text-3xl font-bold">Rejoignez notre mission</h2>
                        <p className="mb-8 text-lg">{content.cta_text}</p>
                        <a href="/get-involved" className="rounded-lg bg-white px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-white/90">
                            Devenir bénévole
                        </a>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}
