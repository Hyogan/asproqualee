<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Program;
use App\Models\Project;
use App\Models\Action;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $siteUrl = config('app.url');

        $staticRoutes = [
            ['loc' => '/',                   'priority' => '1.0',  'changefreq' => 'weekly'],
            ['loc' => '/mission/about',      'priority' => '0.8',  'changefreq' => 'monthly'],
            ['loc' => '/mission/values',     'priority' => '0.7',  'changefreq' => 'monthly'],
            ['loc' => '/water-health',       'priority' => '0.7',  'changefreq' => 'monthly'],
            ['loc' => '/actions',            'priority' => '0.8',  'changefreq' => 'weekly'],
            ['loc' => '/programs',           'priority' => '0.8',  'changefreq' => 'weekly'],
            ['loc' => '/projects',           'priority' => '0.7',  'changefreq' => 'weekly'],
            ['loc' => '/produits',           'priority' => '0.6',  'changefreq' => 'weekly'],
            ['loc' => '/blog',               'priority' => '0.9',  'changefreq' => 'daily'],
            ['loc' => '/donate',             'priority' => '0.9',  'changefreq' => 'monthly'],
            ['loc' => '/get-involved',       'priority' => '0.8',  'changefreq' => 'monthly'],
            ['loc' => '/contact',            'priority' => '0.6',  'changefreq' => 'yearly'],
        ];

        $blogPosts = BlogPost::published()
            ->latest('published_at')
            ->get(['slug', 'published_at', 'updated_at']);

        $programs = Program::where('is_active', true)
            ->get(['slug', 'updated_at']);

        $projects = Project::where('is_active', true)
            ->get(['id', 'updated_at']);

        $actions = Action::where('is_active', true)
            ->get(['id', 'updated_at']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($staticRoutes as $route) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$siteUrl}{$route['loc']}</loc>\n";
            $xml .= "    <changefreq>{$route['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$route['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($blogPosts as $post) {
            $lastmod = ($post->updated_at ?? $post->published_at)?->toAtomString();
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$siteUrl}/blog/post/{$post->slug}</loc>\n";
            if ($lastmod) $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($programs as $program) {
            $lastmod = $program->updated_at?->toAtomString();
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$siteUrl}/programs/{$program->slug}</loc>\n";
            if ($lastmod) $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.6</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($projects as $project) {
            $lastmod = $project->updated_at?->toAtomString();
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$siteUrl}/projects/{$project->id}</loc>\n";
            if ($lastmod) $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.6</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($actions as $action) {
            $lastmod = $action->updated_at?->toAtomString();
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$siteUrl}/actions/{$action->id}</loc>\n";
            if ($lastmod) $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.6</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type'  => 'application/xml',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
