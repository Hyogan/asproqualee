<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {{-- Theme color (important for mobile UX & PWA signals) --}}
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
            <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)">

 
        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') . 'Association de Protection de l\'Eau et de l\'Environnement' }}</title>
        <meta
            name="description"
            content="{{ $description ?? 'Association engagée pour l’accès à l’eau potable, l’assainissement, la prévention des maladies hydriques et la protection de l’environnement.' }}"
        >

        <meta name="robots" content="index, follow">

        {{-- Canonical (ABSOLUTELY REQUIRED with Inertia) --}}
        <link rel="canonical" href="{{ url()->current() }}">



            {{-- Open Graph --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Asproqualee | Association Eau & Environnement">
    <meta property="og:title" content="{{ $title ?? 'Association de Protection de l’Eau et de l’Environnement' }}">
    <meta property="og:description" content="{{ $description ?? 'Accès à l’eau potable, assainissement et protection de l’environnement.' }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/og-default.png') }}">

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title ?? 'Asproqualee | Association Eau & Environnement' }}">
    <meta name="twitter:description" content="{{ $description ?? 'Protéger l’eau, préserver la vie.' }}">
    <meta name="twitter:image" content="{{ asset('images/og-default.png') }}">

        {{-- =========================
         FAVICONS
    ========================== --}}

        <link rel="icon" href="/images/logo.jpg" sizes="any">
        <link rel="icon" href="/images/logo.jpg" type="image/png">
        {{-- <link rel="icon" href="/images/logo.jpg" type="image/svg+xml"> --}}
        <link rel="apple-touch-icon" href="/images/logo.jpg">

         {{-- =========================
         FONTS – PERF SAFE
    ========================== --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />


        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

    </head>
    
    <body class="font-sans antialiased">
        @inertia


        
{{-- =========================
STRUCTURED DATA (ORG)
========================== --}}
@verbatim
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Association de Protection de l’Eau et de l’Environnement",
    "url": "{{ config('app.url') }}",
    "logo": "{{ asset('images/logo.png') }}",
    "description": "Association engagée pour l’accès à l’eau potable, l’assainissement et la prévention des maladies hydriques.",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
    }
}
</script>
@endverbatim

    </body>
</html>
