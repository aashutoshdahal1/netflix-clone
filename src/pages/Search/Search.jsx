import React, { useState, useEffect } from "react";
import "./Search.css";
import Navbar from "../../components/Navbar/Navbar";
import SEO from "../../components/SEO/SEO";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  // Real-time search with debouncing
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500); // 500ms delay after user stops typing

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          searchQuery
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setSearchResults(
        data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="search-page">
      <SEO 
        title="Search Movies & TV Shows - Watchio | fmovies.in.net"
        description="Search and discover thousands of movies and TV shows. Find your favorite content to watch online for free in HD quality."
        keywords="search movies, find TV shows, movie search, watch movies online, free streaming"
        url="https://fmovies.in.net/search"
      />
      <Navbar />
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies or TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <p className="loading">Searching...</p>}

        {!loading && searchQuery.trim().length > 0 && searchResults.length === 0 && (
          <p className="no-results">
            No results found for "{searchQuery}". Try another search.
          </p>
        )}

        {!loading && searchQuery.trim().length === 0 && (
          <p className="no-results-placeholder">
            Start typing to search for movies or TV shows...
          </p>
        )}

        <div className="search-results">
          {!loading && searchResults.map((item) => (
            <Link
              to={`/player/${item.media_type}/${item.id}`}
              className="search-card"
              key={item.id}
            >
              <img
                src={
                  item.backdrop_path || item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${
                        item.backdrop_path || item.poster_path
                      }`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={item.title || item.name}
              />
              <div className="search-card-info">
                <h3>{item.title || item.name}</h3>
                <p className="media-type">
                  {item.media_type === "movie" ? "Movie" : "TV Series"}
                </p>
                <p className="rating">⭐ {item.vote_average?.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
