import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router";
const Player = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const mediaType = type || "movie"; // Default to movie if not specified
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });
  const [tvDetails, setTvDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0] || {}))
      .catch((err) => console.error(err));

    // Fetch TV show details if it's a TV show
    if (mediaType === "tv") {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setTvDetails(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, mediaType]);

  // Fetch season details when season changes
  useEffect(() => {
    if (mediaType === "tv" && selectedSeason) {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          setSeasonDetails(res);
          // Reset to episode 1 when season changes
          setSelectedEpisode(1);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedSeason, id, mediaType]);

  // Decode the video source URL
  const getVideoUrl = () => {
    const encoded = import.meta.env.VITE_VIDEO_SOURCE;
    const baseUrl = atob(encoded);
    
    if (mediaType === "tv") {
      return `${baseUrl}/tv/${id}/${selectedSeason}/${selectedEpisode}`;
    }
    return `${baseUrl}/movie/${id}`;
  };

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => {
          navigate(-2);
        }}
      />

      {mediaType === "tv" && tvDetails && (
        <div className="episode-selector">
          <div className="tv-title">
            <h2>{tvDetails.name}</h2>
            {tvDetails.tagline && <p className="tagline">{tvDetails.tagline}</p>}
          </div>
          
          <div className="selectors">
            <div className="selector-group">
              <label htmlFor="season-select">Season:</label>
              <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="season-select"
              >
                {tvDetails.seasons
                  ?.filter((season) => season.season_number > 0)
                  .map((season) => (
                    <option key={season.id} value={season.season_number}>
                      Season {season.season_number} ({season.episode_count} episodes)
                    </option>
                  ))}
              </select>
            </div>

            <div className="selector-group">
              <label htmlFor="episode-select">Episode:</label>
              <select
                id="episode-select"
                value={selectedEpisode}
                onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                className="episode-select"
              >
                {seasonDetails?.episodes?.map((episode) => (
                  <option key={episode.id} value={episode.episode_number}>
                    Episode {episode.episode_number} - {episode.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <iframe
        key={`${mediaType}-${id}-${selectedSeason}-${selectedEpisode}`}
        width="90%"
        height="90%"
        src={getVideoUrl()}
        title={mediaType === "tv" ? "episode" : "movie"}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen"
        referrerPolicy="origin"
      ></iframe>

      {mediaType === "movie" && (
        <div className="player-info">
          <p>{apiData?.published_at?.slice(0, 10) || ""}</p>
          <p>{apiData?.name || ""}</p>
          <p>{apiData?.typeof || ""}</p>
        </div>
      )}
    </div>
  );
};

export default Player;
