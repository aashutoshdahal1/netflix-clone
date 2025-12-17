import React, { useEffect, useState } from "react";
import "./Browse.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const Browse = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const getTitle = () => {
    if (type === "movies") {
      switch (category) {
        case "popular":
          return "Popular Movies";
        case "top_rated":
          return "Top Rated Movies";
        case "upcoming":
          return "Upcoming Movies";
        case "now_playing":
          return "Now Playing Movies";
        default:
          return "All Movies";
      }
    } else if (type === "tv") {
      switch (category) {
        case "popular":
          return "Popular TV Shows";
        case "top_rated":
          return "Top Rated TV Shows";
        case "airing_today":
          return "Airing Today";
        case "on_the_air":
          return "On The Air";
        default:
          return "All TV Shows";
      }
    }
    return "Browse";
  };

  useEffect(() => {
    setLoading(true);
    const mediaType = type === "tv" ? "tv" : "movie";
    const endpoint = category || "popular";

    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${endpoint}?language=en-US&page=${page}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setContent(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [type, category, page]);

  return (
    <div className="browse-page">
      <Navbar />
      <div className="browse-container">
        <h1 className="browse-title">{getTitle()}</h1>

        {loading && <p className="loading">Loading...</p>}

        <div className="browse-grid">
          {content.map((item) => (
            <Link
              to={`/player/${type === "tv" ? "tv" : "movie"}/${item.id}`}
              className="browse-card"
              key={item.id}
            >
              <img
                src={
                  item.poster_path || item.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${
                        item.poster_path || item.backdrop_path
                      }`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={item.title || item.name}
              />
              <div className="browse-card-info">
                <h3>{item.title || item.name}</h3>
                <div className="browse-card-meta">
                  <span className="rating">⭐ {item.vote_average?.toFixed(1)}</span>
                  <span className="year">
                    {(item.release_date || item.first_air_date)?.slice(0, 4)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!loading && content.length === 0 && (
          <p className="no-results">No content found.</p>
        )}

        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-number">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="page-btn"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
