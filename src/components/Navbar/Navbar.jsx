import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMovieDropdown, setShowMovieDropdown] = useState(false);
  const [showTVDropdown, setShowTVDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);
  return (
    <div className="navbar" ref={navRef}>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
      
      <div className="navbar-left">
        <img src={logo} alt="logo" onClick={() => navigate("/")} style={{cursor: "pointer"}} />
        <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
          <li onClick={() => {navigate("/"); setMenuOpen(false);}}>Home</li>
          <li onClick={() => {navigate("/browse/tv?category=popular"); setMenuOpen(false);}}>TV Shows</li>
          <li onClick={() => {navigate("/browse/movies?category=popular"); setMenuOpen(false);}}>Movies</li>
          <li onClick={() => {navigate("/browse/movies?category=now_playing"); setMenuOpen(false);}}>New & Popular</li>
        </ul>
        <div 
          className={menuOpen ? "hamburger active" : "hamburger"} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="navbar-right">
        <img 
          src={search_icon} 
          alt="search" 
          className="icons search-icon" 
          onClick={() => {
            navigate("/search");
            setMenuOpen(false);
          }}
        />
      

      </div>
    </div>
  );
};

export default Navbar;
