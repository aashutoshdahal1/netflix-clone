import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MovieReview.css";

const MovieReview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  
  // Extract ID from slug (format: movie-title-123)
  const contentId = slug?.split('-').pop();
  const contentType = slug?.includes('tv-') ? 'tv' : 'movie';

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    if (!contentId) return;

    // Fetch content details
    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    // Fetch credits
    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => setCredits(data))
      .catch((err) => console.error(err));

    // Fetch similar content
    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/similar?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => setSimilar(data.results?.slice(0, 6) || []))
      .catch((err) => console.error(err));
  }, [contentId, contentType]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!content) {
    return <div className="error">Content not found</div>;
  }

  const title = content.title || content.name;
  const releaseYear = (content.release_date || content.first_air_date)?.split('-')[0];
  const posterUrl = content.poster_path 
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}` 
    : null;
  const backdropUrl = content.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}` 
    : posterUrl;

  const seoTitle = `${title} (${releaseYear}) Review - Cast, Plot & Analysis | Watchio`;
  const seoDescription = `Read our comprehensive review of ${title} (${releaseYear}). Discover the plot, cast performances, direction, and whether it's worth your time. ${content.overview?.substring(0, 100)}...`;

  return (
    <div className="movie-review-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={backdropUrl}
        url={`https://fmovies.in.net/${contentType}/${slug}/review`}
        type="article"
        keywords={`${title} review, ${title} ${releaseYear}, ${title} analysis, ${title} rating, movie review, film critique`}
        noIndex={false}
      />
      
      <Navbar />
      
      <div className="review-container">
        {/* Hero Section */}
        <div className="review-hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>{title} ({releaseYear}) - Review & Analysis</h1>
              <div className="meta-info">
                <span className="rating">⭐ {content.vote_average?.toFixed(1)}/10</span>
                <span className="votes">({content.vote_count?.toLocaleString()} votes)</span>
                {content.genres && (
                  <span className="genres">
                    {content.genres.map(g => g.name).join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="review-content">
          {/* Quick Summary */}
          <section className="review-section">
            <h2>Overview</h2>
            <p className="overview">{content.overview}</p>
            {posterUrl && (
              <img src={posterUrl} alt={`${title} poster`} className="content-poster" loading="lazy" />
            )}
          </section>

          {/* Plot Analysis */}
          <section className="review-section">
            <h2>Plot & Story</h2>
            <p>
              {title} delivers {content.overview ? 'a compelling narrative that explores ' : 'an engaging story with '}
              various themes and character developments. The {contentType === 'movie' ? 'film' : 'series'} takes 
              viewers on a journey through {content.genres?.map(g => g.name.toLowerCase()).join(' and ')} elements, 
              creating an experience that resonates with audiences.
            </p>
            <p>
              The storytelling approach in {title} balances entertainment with meaningful character arcs. 
              {contentType === 'tv' && content.number_of_seasons && (
                ` Spanning ${content.number_of_seasons} season${content.number_of_seasons > 1 ? 's' : ''} 
                with ${content.number_of_episodes} episodes, the series develops its narrative over time.`
              )}
              The pacing keeps viewers engaged while allowing for emotional depth and plot development.
            </p>
            <p>
              Set against {content.overview ? 'a backdrop that enhances the story' : 'various locations'}, 
              the narrative explores universal themes that connect with diverse audiences. The writing successfully 
              maintains tension and interest throughout, making it a noteworthy addition to the 
              {content.genres?.[0]?.name.toLowerCase()} genre.
            </p>
          </section>

          {/* Cast & Performances */}
          {credits?.cast && credits.cast.length > 0 && (
            <section className="review-section">
              <h2>Cast & Performances</h2>
              <p>
                The ensemble cast brings depth and authenticity to their roles. Leading the cast, 
                {credits.cast.slice(0, 3).map((actor, idx) => (
                  <span key={actor.id}>
                    {idx > 0 && (idx === credits.cast.slice(0, 3).length - 1 ? ' and ' : ', ')}
                    <strong>{actor.name}</strong> as {actor.character}
                  </span>
                ))} deliver compelling performances that anchor the narrative.
              </p>
              <div className="cast-grid">
                {credits.cast.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="cast-member">
                    {actor.profile_path && (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                        alt={actor.name}
                        loading="lazy"
                      />
                    )}
                    <h3>{actor.name}</h3>
                    <p>{actor.character}</p>
                  </div>
                ))}
              </div>
              <Link to={`/${contentType}/${slug}/cast`} className="link-btn">
                View Full Cast →
              </Link>
            </section>
          )}

          {/* Direction & Production */}
          {credits?.crew && (
            <section className="review-section">
              <h2>Direction & Production</h2>
              <p>
                {credits.crew.find(c => c.job === 'Director') && (
                  <>Under the direction of <strong>{credits.crew.find(c => c.job === 'Director').name}</strong>, </>
                )}
                {title} showcases technical excellence and creative vision. The production values are evident 
                in every frame, from cinematography to sound design.
              </p>
              <p>
                The technical aspects of {title} contribute significantly to its impact. The visual storytelling, 
                editing choices, and overall production quality demonstrate professional craftsmanship that elevates 
                the viewing experience.
              </p>
            </section>
          )}

          {/* Verdict */}
          <section className="review-section verdict">
            <h2>Final Verdict</h2>
            <p>
              <strong>{title}</strong> {content.vote_average >= 7 ? 'stands out as' : 'presents'} 
              {content.vote_average >= 8 ? ' an exceptional ' : content.vote_average >= 7 ? ' a solid ' : ' an interesting '}
              entry in the {content.genres?.[0]?.name.toLowerCase() || 'entertainment'} category. 
              With a rating of <strong>{content.vote_average?.toFixed(1)}/10</strong> from 
              {content.vote_count?.toLocaleString()} viewers, it has {content.vote_average >= 7 ? 'resonated well with' : 'found'} 
              audiences.
            </p>
            <p>
              Whether you're a fan of {content.genres?.map(g => g.name.toLowerCase()).join(', ')} or simply looking for 
              quality entertainment, {title} offers {content.vote_average >= 7 ? 'compelling reasons to watch' : 'an experience worth exploring'}.
            </p>
            <div className="rating-badge">
              <span className="score">{content.vote_average?.toFixed(1)}</span>
              <span className="max">/10</span>
            </div>
          </section>

          {/* Similar Content */}
          {similar.length > 0 && (
            <section className="review-section">
              <h2>Similar {contentType === 'movie' ? 'Movies' : 'Series'} You Might Like</h2>
              <div className="similar-grid">
                {similar.map((item) => (
                  <Link 
                    key={item.id} 
                    to={`/${contentType}/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${item.id}/review`}
                    className="similar-item"
                  >
                    {item.poster_path && (
                      <img 
                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                        alt={item.title || item.name}
                        loading="lazy"
                      />
                    )}
                    <h3>{item.title || item.name}</h3>
                    <span className="rating-small">⭐ {item.vote_average?.toFixed(1)}</span>
                  </Link>
                ))}
              </div>
              <Link to={`/${contentType}/${slug}/similar`} className="link-btn">
                View All Similar {contentType === 'movie' ? 'Movies' : 'Series'} →
              </Link>
            </section>
          )}

          {/* Internal Links */}
          <section className="review-section internal-links">
            <h2>More About {title}</h2>
            <div className="links-grid">
              <Link to={`/${contentType}/${slug}/cast`} className="internal-link">
                <span className="icon">👥</span>
                <span>Full Cast & Crew</span>
              </Link>
              <Link to={`/${contentType}/${slug}/ending-explained`} className="internal-link">
                <span className="icon">💡</span>
                <span>Ending Explained</span>
              </Link>
              <Link to={`/${contentType}/${slug}/similar`} className="internal-link">
                <span className="icon">🎬</span>
                <span>Similar Content</span>
              </Link>
              <Link to="/browse/movie" className="internal-link">
                <span className="icon">🔍</span>
                <span>Browse More Movies</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MovieReview;
