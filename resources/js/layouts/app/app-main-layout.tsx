import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Footer from './partials/Footer';
import { Header } from './partials/navbar';
// import Header from './partials/Header';

interface MainLayoutProps {
    title?: string;
    description?: string;
    ogImage?: string;
    canonical?: string;
}

export default function MainLayout({
    children,
    title = "Asproqualee | Association pour l'Eau, l'Assainissement et l'Environnement",
    description = "Nous œuvrons pour l'accès à l'eau potable, l'assainissement, l'hygiène et la protection de l'environnement dans nos communautés.",
    ogImage = '/images/og-default.jpg',
    canonical,
}: PropsWithChildren<MainLayoutProps>) {
    const fullTitle = title.includes('Association')
        ? title
        : `${title} | Association Eau & Environnement`;

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="description" content={description} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={ogImage} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />

                {/* Canonical */}
                {canonical && <link rel="canonical" href={canonical} />}

                {/* Viewport & Language */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta httpEquiv="Content-Language" content="fr" />
            </Head>

            <div className="flex min-h-screen flex-col">
                <Header />

                <main className="flex-1">{children}</main>

                <Footer />
            </div>
        </>
    );
}
