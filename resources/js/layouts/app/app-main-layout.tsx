import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Footer from './partials/Footer';
import { Header } from './partials/navbar';

const SITE_NAME = 'AsproQualee';
const SITE_URL  = 'https://asproqualee.org'; // update to production URL

interface MainLayoutProps {
    title?: string;
    description?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    canonical?: string;
    noindex?: boolean;
}

export default function MainLayout({
    children,
    title = "AsproQualee — Association pour l'Eau, l'Assainissement et l'Environnement",
    description = "Nous œuvrons pour l'accès à l'eau potable, l'assainissement, l'hygiène et la protection de l'environnement dans nos communautés.",
    ogImage = '/images/og-default.jpg',
    ogType = 'website',
    canonical,
    noindex = false,
}: PropsWithChildren<MainLayoutProps>) {
    const { url } = usePage();
    const pageUrl   = `${SITE_URL}${url.split('?')[0]}`;
    const canonUrl  = canonical ?? pageUrl;

    const fullTitle = title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`;

    const absoluteImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

    const orgSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description,
        sameAs: [],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'CM',
        },
    });

    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                {noindex && <meta name="robots" content="noindex,nofollow" />}

                {/* Open Graph */}
                <meta property="og:site_name"   content={SITE_NAME} />
                <meta property="og:type"         content={ogType} />
                <meta property="og:url"          content={pageUrl} />
                <meta property="og:title"        content={fullTitle} />
                <meta property="og:description"  content={description} />
                <meta property="og:image"        content={absoluteImage} />
                <meta property="og:image:width"  content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:locale"       content="fr_FR" />

                {/* Twitter Card */}
                <meta name="twitter:card"        content="summary_large_image" />
                <meta name="twitter:site"        content="@asproqualee" />
                <meta name="twitter:title"       content={fullTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image"       content={absoluteImage} />

                {/* Canonical */}
                <link rel="canonical" href={canonUrl} />

                {/* Language */}
                <meta httpEquiv="Content-Language" content="fr" />

                {/* JSON-LD */}
                <script type="application/ld+json">{orgSchema}</script>
            </Head>

            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
}
