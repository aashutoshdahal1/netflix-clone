import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../CastPage/ContentPages.css";

const EndingExplained = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
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
      .then((data) => {
        setContent(data);
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

  const seoTitle = `${title} (${releaseYear}) Ending Explained - Analysis & Theories | Watchio`;
  const seoDescription = `Detailed breakdown and analysis of ${title} (${releaseYear}) ending. Understanding the conclusion, themes, and what it all means. Contains spoilers.`;

  return (
    <div className="content-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={backdropUrl}
        url={`https://fmovies.in.net/${contentType}/${slug}/ending-explained`}
        type="article"
        keywords={`${title} ending explained, ${title} ending, ${title} explained, ${title} analysis, ${title} theories`}
        noIndex={false}
      />
      
      <Navbar />
      
      <div className="page-container">
        <div className="page-header">
          <h1>{title} ({releaseYear}) - Ending Explained</h1>
          <Link to={`/${contentType}/${slug}/review`} className="back-link">← Back to Review</Link>
        </div>

        <div className="spoiler-warning">
          <span>⚠️</span> SPOILER WARNING: This article contains major spoilers for {title}
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Overview</h2>
            <p>
              {title} has captivated audiences with its {content.genres?.map(g => g.name.toLowerCase()).join(' and ')} storytelling. 
              The ending has sparked numerous discussions and interpretations among viewers. In this detailed analysis, 
              we break down the conclusion and explore what it all means.
            </p>
            <p className="section-intro">{content.overview}</p>
          </section>

          <section className="content-section">
            <h2>The Final Act</h2>
            <p>
              The conclusion of {title} brings together various narrative threads established throughout the 
              {contentType === 'movie' ? ' film' : ' series'}. The final sequences serve to resolve character arcs 
              and thematic elements that have been building up.
            </p>
            <p>
              In the climactic moments, the story reaches its emotional and narrative peak. The choices made by 
              the characters reflect the central themes of {content.genres?.map(g => g.name.toLowerCase()).join(', ')}, 
              providing resolution while leaving room for interpretation.
            </p>
            <p>
              The ending demonstrates how the creative team behind {title} chose to conclude the journey they began. 
              Whether it leaves viewers satisfied or wanting more, it's designed to resonate with the 
              {contentType === 'movie' ? 'film\'s' : 'series\''} core message.
            </p>
          </section>

          <section className="content-section">
            <h2>Character Conclusions</h2>
            <p>
              Each main character in {title} experiences their own arc resolution. The ending addresses where 
              these characters end up and what their final decisions reveal about their growth throughout the story.
            </p>
            <div className="theory-card">
              <h3>Character Analysis</h3>
              <p>
                The protagonist's final actions represent a culmination of their journey. The challenges faced 
                throughout the narrative lead to the person they become by the conclusion. This transformation 
                is central to understanding the ending's impact.
              </p>
            </div>
            <p>
              Supporting characters also receive closure, with their stories interweaving with the main narrative. 
              The relationships formed and conflicts resolved contribute to the overall thematic resonance of the ending.
            </p>
          </section>

          <section className="content-section">
            <h2>Thematic Significance</h2>
            <p>
              Beyond the surface-level plot resolution, the ending of {title} carries deeper thematic weight. 
              The {content.genres?.map(g => g.name.toLowerCase()).join(' and ')} elements serve broader commentary 
              on {content.genres?.[0]?.name === 'Drama' ? 'human nature and relationships' : 
                 content.genres?.[0]?.name === 'Science Fiction' ? 'technology and humanity' :
                 content.genres?.[0]?.name === 'Thriller' ? 'morality and consequences' : 'life and choices'}.
            </p>
            <div className="theory-card">
              <h3>Symbolic Interpretation</h3>
              <p>
                Various symbols and motifs throughout {title} come full circle in the ending. These elements 
                add layers of meaning that reward attentive viewers who notice the careful setup throughout.
              </p>
            </div>
          </section>

          <section className="content-section">
            <h2>Fan Theories & Interpretations</h2>
            <p>
              Since its release{releaseYear ? ` in ${releaseYear}` : ''}, {title} has generated various 
              interpretations about what the ending truly means. Here are some popular perspectives:
            </p>
            <div className="theory-card">
              <h3>Theory 1: Literal Interpretation</h3>
              <p>
                The most straightforward reading takes events at face value. This interpretation suggests 
                that what we see is exactly what happened, with no hidden meanings or ambiguous elements.
              </p>
            </div>
            <div className="theory-card">
              <h3>Theory 2: Symbolic Reading</h3>
              <p>
                A more metaphorical approach suggests that the ending represents larger themes rather than 
                literal events. This reading emphasizes the emotional and thematic truth over plot specifics.
              </p>
            </div>
            <div className="theory-card">
              <h3>Theory 3: Open-Ended Conclusion</h3>
              <p>
                Some viewers appreciate that the ending leaves certain questions unanswered, allowing for 
                personal interpretation. This ambiguity can be seen as a strength that respects audience intelligence.
              </p>
            </div>
          </section>

          <section className="content-section">
            <h2>What It All Means</h2>
            <p>
              Ultimately, the ending of {title} serves the story's larger purpose. Whether you found it 
              satisfying, thought-provoking, or controversial, it represents the creative vision for concluding 
              this {contentType === 'movie' ? 'film' : 'series'}.
            </p>
            <p>
              The conclusion invites viewers to reflect on the journey they've experienced. The themes of 
              {content.genres?.map(g => g.name.toLowerCase()).join(' and ')} are brought to their natural 
              resolution, providing closure while potentially sparking discussion.
            </p>
            <p>
              With a rating of <strong>{content.vote_average?.toFixed(1)}/10</strong> from 
              {content.vote_count?.toLocaleString()} viewers, {title} has clearly resonated with audiences, 
              and its ending plays a significant role in that reception.
            </p>
          </section>

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

export default EndingExplained;
