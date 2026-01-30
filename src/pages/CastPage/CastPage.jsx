import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ContentPages.css";

const CastPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [credits, setCredits] = useState(null);
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

    fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setCredits(data);
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

  const seoTitle = `${title} (${releaseYear}) Cast & Crew - Full List | Watchio`;
  const seoDescription = `Complete cast and crew information for ${title} (${releaseYear}). Discover all actors, directors, producers, and behind-the-scenes talent involved in this production.`;

  return (
    <div className="content-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={backdropUrl}
        url={`https://fmovies.in.net/${contentType}/${slug}/cast`}
        type="article"
        keywords={`${title} cast, ${title} actors, ${title} crew, ${title} director, cast list`}
        noIndex={false}
      />
      
      <Navbar />
      
      <div className="page-container">
        <div className="page-header">
          <h1>{title} ({releaseYear}) - Complete Cast & Crew</h1>
          <Link to={`/${contentType}/${slug}/review`} className="back-link">← Back to Review</Link>
        </div>

        <div className="page-content">
          {/* Cast Section */}
          {credits?.cast && credits.cast.length > 0 && (
            <section className="content-section">
              <h2>Main Cast ({credits.cast.length} actors)</h2>
              <p className="section-intro">
                {title} features a talented ensemble cast bringing the characters to life. Below is the complete 
                list of actors and the roles they portray in this {contentType === 'movie' ? 'film' : 'series'}.
              </p>
              <div className="cast-full-grid">
                {credits.cast.map((actor) => (
                  <div key={actor.id} className="cast-card">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                        alt={actor.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-image">👤</div>
                    )}
                    <div className="cast-info">
                      <h3>{actor.name}</h3>
                      <p className="character">as {actor.character || 'Unknown'}</p>
                      {actor.known_for_department && (
                        <span className="department">{actor.known_for_department}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Crew Section */}
          {credits?.crew && credits.crew.length > 0 && (
            <section className="content-section">
              <h2>Production Crew ({credits.crew.length} members)</h2>
              <p className="section-intro">
                Behind every great {contentType === 'movie' ? 'film' : 'series'} is a dedicated crew. Here are the 
                talented professionals who worked behind the scenes to bring {title} to your screen.
              </p>
              
              {/* Group by department */}
              {['Directing', 'Writing', 'Production', 'Camera', 'Editing', 'Sound', 'Art', 'Costume & Make-Up', 'Visual Effects'].map(dept => {
                const deptCrew = credits.crew.filter(c => c.department === dept);
                if (deptCrew.length === 0) return null;
                
                return (
                  <div key={dept} className="crew-department">
                    <h3>{dept}</h3>
                    <div className="crew-list">
                      {deptCrew.map((person, idx) => (
                        <div key={`${person.id}-${idx}`} className="crew-member">
                          <strong>{person.name}</strong>
                          <span>{person.job}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Related Pages */}
          <section className="content-section">
            <h2>More About {title}</h2>
            <div className="related-links">
              <Link to={`/${contentType}/${slug}/review`} className="related-card">
                <span className="icon">⭐</span>
                <h3>Review & Analysis</h3>
                <p>Read our detailed review</p>
              </Link>
              <Link to={`/${contentType}/${slug}/ending-explained`} className="related-card">
                <span className="icon">💡</span>
                <h3>Ending Explained</h3>
                <p>Understand the conclusion</p>
              </Link>
              <Link to={`/${contentType}/${slug}/similar`} className="related-card">
                <span className="icon">🎬</span>
                <h3>Similar Content</h3>
                <p>Find related {contentType === 'movie' ? 'movies' : 'shows'}</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CastPage;
