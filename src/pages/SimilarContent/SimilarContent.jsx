import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../CastPage/ContentPages.css";

const SimilarContent = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/similar?language=en-US&page=1`, options)
      .then((res) => res.json())
      .then((data) => {
        setSimilar(data.results || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [contentId, contentType]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!content) return <div className="error">Content not found</div>;

  const title = content.title || content.name;
  const releaseYear = (content.release_date || content.first_air_date)?.split('-')[0];
  const backdropUrl = content.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}` 
    : null;

  const seoTitle = `Similar to ${title} (${releaseYear}) - Recommendations | Watchio`;
  const seoDescription = `Discover ${contentType === 'movie' ? 'movies' : 'TV shows'} similar to ${title} (${releaseYear}). Find recommendations based on genre, themes, and style.`;

  return (
    <div className="content-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={backdropUrl}
        url={`https://fmovies.in.net/${contentType}/${slug}/similar`}
        type="article"
        keywords={`similar to ${title}, like ${title}, ${title} recommendations, ${contentType} recommendations`}
        noIndex={false}
      />
      
      <Navbar />
      
      <div className="page-container">
        <div className="page-header">
          <h1>{contentType === 'movie' ? 'Movies' : 'TV Shows'} Similar to {title} ({releaseYear})</h1>
          <Link to={`/${contentType}/${slug}/review`} className="back-link">← Back to Review</Link>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>If You Liked {title}...</h2>
            <p className="section-intro">
              Based on {content.genres?.map(g => g.name.toLowerCase()).join(', ')} themes and style of {title}, 
              here are {similar.length} {contentType === 'movie' ? 'movies' : 'TV shows'} you might enjoy. 
              These recommendations share similar elements that made {title} appealing to audiences.
            </p>
          </section>

          {similar.length > 0 ? (
            <section className="content-section">
              <h2>Recommended for You</h2>
              <div className="similar-content-grid">
                {similar.map((item) => {
                  const itemTitle = item.title || item.name;
                  const itemSlug = `${itemTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${item.id}`;
                  
                  return (
                    <Link 
                      key={item.id} 
                      to={`/${contentType}/${itemSlug}/review`}
                      className="similar-content-item"
                    >
                      {item.poster_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                          alt={itemTitle}
                          loading="lazy"
                        />
                      ) : (
                        <div className="no-image">🎬</div>
                      )}
                      <h3>{itemTitle}</h3>
                      <span className="rating-small">⭐ {item.vote_average?.toFixed(1)}</span>
                      <p className="release-year">
                        {(item.release_date || item.first_air_date)?.split('-')[0]}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="content-section">
              <p>No similar content found at this time. Check back later for recommendations!</p>
            </section>
          )}

          <section className="content-section">
            <h2>More About {title}</h2>
            <div className="related-links">
              <Link to={`/${contentType}/${slug}/review`} className="related-card">
                <span className="icon">⭐</span>
                <h3>Full Review</h3>
                <p>Read our complete analysis</p>
              </Link>
              <Link to={`/${contentType}/${slug}/cast`} className="related-card">
                <span className="icon">👥</span>
                <h3>Cast & Crew</h3>
                <p>Meet the talent behind it</p>
              </Link>
              <Link to={`/${contentType}/${slug}/ending-explained`} className="related-card">
                <span className="icon">💡</span>
                <h3>Ending Explained</h3>
                <p>Understand the conclusion</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SimilarContent;
