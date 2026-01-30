// scripts/generate-sitemap.js
// This script generates a sitemap.xml for your SEO-friendly pages
// Run with: node scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://fmovies.in.net';

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/browse/movie', priority: '0.8', changefreq: 'daily' },
  { url: '/browse/tv', priority: '0.8', changefreq: 'daily' },
  { url: '/search', priority: '0.7', changefreq: 'weekly' },
  // New SEO pages
  { url: '/fmovies.html', priority: '0.9', changefreq: 'weekly' },
  { url: '/fmovies-alternatives.html', priority: '0.8', changefreq: 'weekly' },
  { url: '/fmovies-guide.html', priority: '0.8', changefreq: 'weekly' },
  { url: '/fmovies-safety.html', priority: '0.8', changefreq: 'weekly' },
];

// SEO-optimized movie review pages
const reviewPages = [
  'inception-27205',
  'the-shawshank-redemption-278',
  'the-godfather-238',
  'schindlers-list-424',
  'the-dark-knight-155',
  'pulp-fiction-680',
  'forrest-gump-13',
  'fight-club-550',
  'the-green-mile-497',
  'the-matrix-603',
];

// Example dynamic pages (you would fetch these from TMDB API in production)
// Format: movie-title-123 or tv-series-name-456
const exampleMovies = [
  'inception-27205',
  'the-dark-knight-155',
  'interstellar-157336',
  'the-shawshank-redemption-278',
  'pulp-fiction-680',
];

const exampleSeries = [
  'breaking-bad-1396',
  'game-of-thrones-1399',
  'stranger-things-66732',
  'the-office-2316',
  'friends-1668',
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
  });

  // Add movie pages
  exampleMovies.forEach(slug => {
    const contentPages = ['review', 'cast', 'ending-explained', 'similar'];
    contentPages.forEach(page => {
      xml += `  <url>
    <loc>${BASE_URL}/movie/${slug}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
    });
  });

  // Add series pages
  exampleSeries.forEach(slug => {
    const contentPages = ['review', 'cast', 'ending-explained', 'similar'];
    contentPages.forEach(page => {
      xml += `  <url>
    <loc>${BASE_URL}/series/${slug}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
    });
  });

  // Add SEO-optimized review pages
  reviewPages.forEach(slug => {
    xml += `  <url>
    <loc>${BASE_URL}/reviews/${slug}-review.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
  });

  xml += `</urlset>`;

  // Write to public folder
  const publicDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);

  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${path.join(publicDir, 'sitemap.xml')}`);
  console.log(`📊 Total URLs: ${staticPages.length + (exampleMovies.length * 4) + (exampleSeries.length * 4) + reviewPages.length}`);
  console.log('\n📄 New SEO pages included:');
  console.log('   - /fmovies.html');
  console.log('   - /fmovies-alternatives.html');
  console.log('   - /fmovies-guide.html');
  console.log('   - /fmovies-safety.html');
  console.log(`   - ${reviewPages.length} movie review pages`);
}

// Run the function
generateSitemap();

export { generateSitemap };
