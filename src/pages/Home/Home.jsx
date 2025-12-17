import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [heroMovie, setHeroMovie] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * Math.min(10, data.results.length));
        setHeroMovie(data.results[randomIndex]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePlay = () => {
    if (heroMovie) {
      const mediaType = heroMovie.media_type || "movie";
      navigate(`/player/${mediaType}/${heroMovie.id}`);
    }
  };

  const handleMoreInfo = () => {
    if (heroMovie) {
      const mediaType = heroMovie.media_type || "movie";
      navigate(`/player/${mediaType}/${heroMovie.id}`);
    }
  };
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        {heroMovie && (
          <>
            <img 
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`} 
              alt={heroMovie.title || heroMovie.name} 
              className="banner-img" 
            />
            <div className="hero-caption">
              <img 
                src={heroMovie.poster_path ? `https://image.tmdb.org/t/p/w500${heroMovie.poster_path}` : `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
                alt={heroMovie.title || heroMovie.name} 
                className="caption-img" 
              />
              <p>
                {heroMovie.overview || "No description available."}
              </p>
              <div className="hero-btns">
                <button className="btn" onClick={handlePlay}>
                  <img src={play_icon} alt="play" />
                  Play
                </button>
                <button className="btn dark-btn" onClick={handleMoreInfo}>
                  <img src={info_icon} alt="info" />
                  More Info
                </button>
              </div>
              <TitleCards />
            </div>
          </>
        )}
        {!heroMovie && (
          <div className="hero-loading">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Watchio"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
