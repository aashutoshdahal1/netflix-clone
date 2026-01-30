#!/usr/bin/env node

/**
 * Generate SEO-Optimized Movie Review Pages
 * 
 * This script creates 10 high-quality, SEO-optimized movie review pages
 * targeting popular search queries related to "fmovies"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Top 10 popular movies to create reviews for
const movies = [
  {
    id: 27205,
    slug: 'inception-27205',
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    stars: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    genre: 'Sci-Fi Thriller',
    rating: '8.8/10',
    runtime: '148 min',
    keywords: 'inception, christopher nolan, dream heist, leonardo dicaprio, mind bending movies'
  },
  {
    id: 278,
    slug: 'the-shawshank-redemption-278',
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    stars: ['Tim Robbins', 'Morgan Freeman'],
    genre: 'Drama',
    rating: '9.3/10',
    runtime: '142 min',
    keywords: 'shawshank redemption, prison movie, morgan freeman, tim robbins, best movies'
  },
  {
    id: 238,
    slug: 'the-godfather-238',
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    genre: 'Crime Drama',
    rating: '9.2/10',
    runtime: '175 min',
    keywords: 'godfather, mafia movie, al pacino, marlon brando, classic films'
  },
  {
    id: 424,
    slug: 'schindlers-list-424',
    title: "Schindler's List",
    year: 1993,
    director: 'Steven Spielberg',
    stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
    genre: 'Historical Drama',
    rating: '9.0/10',
    runtime: '195 min',
    keywords: 'schindlers list, holocaust movie, steven spielberg, liam neeson, historical drama'
  },
  {
    id: 155,
    slug: 'the-dark-knight-155',
    title: 'The Dark Knight',
    year: 2008,
    director: 'Christopher Nolan',
    stars: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    genre: 'Superhero Action',
    rating: '9.0/10',
    runtime: '152 min',
    keywords: 'dark knight, batman, heath ledger joker, christopher nolan, superhero movies'
  },
  {
    id: 680,
    slug: 'pulp-fiction-680',
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    genre: 'Crime Drama',
    rating: '8.9/10',
    runtime: '154 min',
    keywords: 'pulp fiction, quentin tarantino, john travolta, uma thurman, cult classic'
  },
  {
    id: 13,
    slug: 'forrest-gump-13',
    title: 'Forrest Gump',
    year: 1994,
    director: 'Robert Zemeckis',
    stars: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    genre: 'Drama',
    rating: '8.8/10',
    runtime: '142 min',
    keywords: 'forrest gump, tom hanks, life is like a box of chocolates, inspirational movies'
  },
  {
    id: 550,
    slug: 'fight-club-550',
    title: 'Fight Club',
    year: 1999,
    director: 'David Fincher',
    stars: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
    genre: 'Psychological Thriller',
    rating: '8.8/10',
    runtime: '139 min',
    keywords: 'fight club, brad pitt, edward norton, david fincher, plot twist movies'
  },
  {
    id: 497,
    slug: 'the-green-mile-497',
    title: 'The Green Mile',
    year: 1999,
    director: 'Frank Darabont',
    stars: ['Tom Hanks', 'Michael Clarke Duncan', 'David Morse'],
    genre: 'Fantasy Drama',
    rating: '8.6/10',
    runtime: '189 min',
    keywords: 'green mile, tom hanks, michael clarke duncan, prison drama, stephen king'
  },
  {
    id: 603,
    slug: 'the-matrix-603',
    title: 'The Matrix',
    year: 1999,
    director: 'Lana Wachowski, Lilly Wachowski',
    stars: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    genre: 'Sci-Fi Action',
    rating: '8.7/10',
    runtime: '136 min',
    keywords: 'matrix, keanu reeves, red pill blue pill, wachowski, sci-fi action'
  }
];

// Generate HTML for each movie
movies.forEach((movie, index) => {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${movie.title} (${movie.year}) Review - Watch on FMovies | fmovies.in.net</title>
  <meta name="description" content="Comprehensive review of ${movie.title} (${movie.year}). Read our in-depth analysis, ratings, and watch on FMovies. Directed by ${movie.director}. Rating: ${movie.rating}" />
  <link rel="canonical" href="https://fmovies.in.net/movie/${movie.slug}/review" />
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="${movie.keywords}, fmovies, watch ${movie.title.toLowerCase()}, ${movie.title.toLowerCase()} review, ${movie.title.toLowerCase()} fmovies" />
  
  <meta property="og:title" content="${movie.title} (${movie.year}) Review - FMovies" />
  <meta property="og:description" content="Watch ${movie.title} on FMovies. ${movie.genre} directed by ${movie.director}. Rating: ${movie.rating}" />
  <meta property="og:url" content="https://fmovies.in.net/movie/${movie.slug}/review" />
  <meta property="og:type" content="article" />
  
  <!-- Movie Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": "${movie.title}",
    "datePublished": "${movie.year}",
    "director": {
      "@type": "Person",
      "name": "${movie.director}"
    },
    "genre": "${movie.genre}",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${movie.rating.split('/')[0]}",
      "bestRating": "10",
      "ratingCount": "1000"
    }
  }
  </script>
  
  <!-- Review Schema Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Movie",
      "name": "${movie.title}"
    },
    "author": {
      "@type": "Organization",
      "name": "Watchio"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "${movie.rating.split('/')[0]}",
      "bestRating": "10"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Watchio - fmovies.in.net"
    }
  }
  </script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      color: #1a1a1a;
      background: #f5f5f5;
    }
    .hero {
      background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
      color: white;
      padding: 60px 24px;
      text-align: center;
    }
    .hero h1 {
      font-size: 2.5em;
      margin-bottom: 16px;
      font-weight: 800;
    }
    .meta {
      font-size: 1.1em;
      opacity: 0.9;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 60px 40px;
    }
    h2 {
      color: #e50914;
      margin: 32px 0 16px 0;
      font-size: 1.8em;
      border-left: 5px solid #e50914;
      padding-left: 20px;
    }
    h3 {
      color: #333;
      margin: 24px 0 12px 0;
      font-size: 1.3em;
    }
    p { margin-bottom: 16px; color: #444; }
    .rating-box {
      background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      margin: 24px 0;
    }
    .rating-number {
      font-size: 3em;
      font-weight: 800;
      color: white;
    }
    .cta {
      display: inline-block;
      padding: 14px 32px;
      background: #e50914;
      color: white;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      margin: 16px 8px;
    }
    .cta:hover {
      background: #b20710;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
      background: #f8f9fa;
      padding: 24px;
      border-radius: 12px;
    }
    .info-item {
      text-align: center;
    }
    .info-label {
      font-weight: 700;
      color: #e50914;
      display: block;
      margin-bottom: 8px;
    }
    ul { margin: 16px 0 16px 32px; }
    li { margin-bottom: 10px; }
    @media (max-width: 768px) {
      .container { padding: 40px 24px; }
      .hero h1 { font-size: 2em; }
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>${movie.title} (${movie.year})</h1>
    <p class="meta">Directed by ${movie.director} | ${movie.genre} | ${movie.runtime}</p>
    <div style="margin-top: 24px;">
      <a href="/" class="cta">Watch on FMovies</a>
      <a href="/movie/${movie.slug}/cast" class="cta" style="background: transparent; border: 2px solid white;">View Cast</a>
    </div>
  </div>

  <div class="container">
    <article>
      <div class="rating-box">
        <div class="rating-number">${movie.rating}</div>
        <div style="color: white; font-size: 1.2em; margin-top: 8px;">Our Rating</div>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Director</span>
          <span>${movie.director}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Year</span>
          <span>${movie.year}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Genre</span>
          <span>${movie.genre}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Runtime</span>
          <span>${movie.runtime}</span>
        </div>
      </div>

      <h2>Overview</h2>
      <p><strong>${movie.title}</strong> is a ${movie.year} ${movie.genre} film directed by ${movie.director}, starring ${movie.stars.join(', ')}. This cinematic masterpiece has captivated audiences worldwide and remains one of the most highly-rated films in cinema history.</p>

      <p>Available to watch on <strong>FMovies (fmovies.in.net)</strong>, this film offers an unforgettable viewing experience that showcases the pinnacle of filmmaking excellence. Whether you're a longtime fan or discovering it for the first time, ${movie.title} delivers on every level.</p>

      <h2>Plot Summary</h2>
      <p>${movie.title} presents a compelling narrative that keeps viewers engaged from start to finish. The film's intricate storytelling, combined with ${movie.director}'s masterful direction, creates a cinematic experience that resonates long after the credits roll.</p>

      <p>The story unfolds with precision and purpose, introducing characters and conflicts that feel both authentic and profound. Each scene is meticulously crafted to serve the larger narrative while maintaining individual impact and significance.</p>

      <h2>Performance Analysis</h2>
      <h3>Lead Performances</h3>
      <p>${movie.stars[0]} delivers a career-defining performance that showcases their range and depth as an actor. Their portrayal brings nuance and authenticity to the character, making every moment feel genuine and emotionally resonant.</p>

      <p>${movie.stars[1] || 'The supporting cast'} provides excellent support, creating a dynamic ensemble that elevates the entire production. The chemistry between the cast members feels natural and contributes significantly to the film's overall impact.</p>

      <h3>Supporting Cast</h3>
      <p>The supporting cast members each bring their unique talents to the film, creating memorable characters that enhance the story. Every performance, no matter how small, contributes to the rich tapestry of the narrative.</p>

      <h2>Direction & Cinematography</h2>
      <p>${movie.director}'s direction is nothing short of masterful. Every frame is composed with intention, every scene paced perfectly to maintain tension and emotional impact. The director's vision is clear and executed with precision throughout the film.</p>

      <p>The cinematography complements the direction beautifully, using visual language to enhance the storytelling. Lighting, camera angles, and composition all work together to create a visually stunning experience that serves the narrative.</p>

      <h2>Themes & Analysis</h2>
      <p>${movie.title} explores profound themes that resonate with universal human experiences. The film tackles complex subjects with intelligence and sensitivity, inviting viewers to engage with deeper meanings and interpretations.</p>

      <p>Key themes include:</p>
      <ul>
        <li>The nature of human resilience and determination</li>
        <li>Moral complexity and ethical decision-making</li>
        <li>The power of hope and redemption</li>
        <li>Social commentary on contemporary issues</li>
        <li>The human condition and our search for meaning</li>
      </ul>

      <h2>Technical Excellence</h2>
      <h3>Score & Sound Design</h3>
      <p>The film's musical score enhances every scene, creating emotional depth and atmosphere. The sound design is equally impressive, using audio to immerse viewers in the world of the film and heighten dramatic moments.</p>

      <h3>Production Design</h3>
      <p>Attention to detail in production design creates an authentic and immersive world. From costumes to set decoration, every element feels carefully considered and contributes to the overall aesthetic and believability of the film.</p>

      <h2>Why Watch ${movie.title} on FMovies?</h2>
      <p>FMovies (fmovies.in.net) offers the perfect platform to experience this cinematic masterpiece:</p>
      <ul>
        <li><strong>High-Quality Streaming:</strong> Watch in HD with excellent video and audio quality</li>
        <li><strong>Instant Access:</strong> No downloads required, start watching immediately</li>
        <li><strong>Multiple Servers:</strong> Reliable streaming with backup options</li>
        <li><strong>Mobile Friendly:</strong> Watch on any device, anywhere</li>
        <li><strong>Free Access:</strong> No subscription fees or hidden costs</li>
      </ul>

      <h2>Critical Reception</h2>
      <p>${movie.title} has received widespread critical acclaim since its release. Critics have praised its storytelling, performances, direction, and technical achievements. The film holds a ${movie.rating} rating, reflecting its status as a modern classic.</p>

      <p>Audiences have equally embraced the film, with many considering it one of the greatest films ever made. Its impact on popular culture and cinema continues to be felt years after its initial release.</p>

      <h2>Awards & Recognition</h2>
      <p>The film has garnered numerous awards and nominations, recognizing excellence in various categories including acting, directing, writing, and technical achievements. These accolades cement its place in cinema history.</p>

      <h2>Similar Movies You Might Enjoy</h2>
      <p>If you enjoyed ${movie.title}, you might also like:</p>
      <ul>
        <li>Other films by ${movie.director}</li>
        <li>Movies in the ${movie.genre} genre</li>
        <li>Films featuring ${movie.stars[0]}</li>
        <li><a href="/movie/${movie.slug}/similar">View all similar movies →</a></li>
      </ul>

      <h2>Final Verdict</h2>
      <p><strong>${movie.title}</strong> is essential viewing for any film enthusiast. It represents the best of what cinema can achieve—powerful storytelling, exceptional performances, masterful direction, and technical excellence all combined into a cohesive and impactful whole.</p>

      <p>Whether you're watching for the first time or revisiting this classic, ${movie.title} offers a rich and rewarding experience. Stream it now on <strong>FMovies (fmovies.in.net)</strong> and discover why it's considered one of the greatest films of all time.</p>

      <div class="rating-box" style="margin-top: 40px;">
        <div style="color: white; font-size: 1.5em; margin-bottom: 12px;">Our Final Rating</div>
        <div class="rating-number">${movie.rating}</div>
        <div style="color: white; margin-top: 16px;">
          <strong>Highly Recommended</strong>
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="/" class="cta">Watch ${movie.title} Now</a>
        <a href="/movie/${movie.slug}/cast" class="cta" style="background: #667eea;">View Full Cast</a>
        <a href="/movie/${movie.slug}/ending-explained" class="cta" style="background: #764ba2;">Ending Explained</a>
      </div>

      <h2>More About ${movie.title}</h2>
      <p>Explore more content related to ${movie.title}:</p>
      <ul>
        <li><a href="/movie/${movie.slug}/cast">Complete Cast & Crew Information</a></li>
        <li><a href="/movie/${movie.slug}/ending-explained">Ending Explained & Analysis</a></li>
        <li><a href="/movie/${movie.slug}/similar">Similar Movies & Recommendations</a></li>
        <li><a href="/browse/movie">Browse More Movies on FMovies</a></li>
        <li><a href="/fmovies.html">About FMovies</a></li>
      </ul>

      <footer style="text-align: center; padding: 24px; color: #666; margin-top: 48px; border-top: 1px solid #eee;">
        <p><strong>Review by Watchio — fmovies.in.net</strong></p>
        <p>Published: December 2025 | <a href="/">Home</a> | <a href="/fmovies.html">FMovies Guide</a></p>
      </footer>
    </article>
  </div>
</body>
</html>`;

  // Write the file
  const filename = `${movie.slug}-review.html`;
  const filepath = path.join(__dirname, '..', 'public', 'reviews', filename);

  // Create reviews directory if it doesn't exist
  const reviewsDir = path.join(__dirname, '..', 'public', 'reviews');
  if (!fs.existsSync(reviewsDir)) {
    fs.mkdirSync(reviewsDir, { recursive: true });
  }

  fs.writeFileSync(filepath, html);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n🎉 Successfully generated 10 SEO-optimized movie review pages!');
console.log('\n📁 Files created in: /public/reviews/');
console.log('\n📝 Next steps:');
console.log('   1. Update sitemap.xml to include these new pages');
console.log('   2. Submit updated sitemap to Google Search Console');
console.log('   3. Request indexing for each new page');
console.log('   4. Monitor rankings for movie-specific keywords\n');
