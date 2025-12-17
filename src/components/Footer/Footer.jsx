import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={facebook_icon} alt="fb" />
        <img src={instagram_icon} alt="instagram" />
        <img src={twitter_icon} alt="twitter" />
        <img src={youtube_icon} alt="youtube" />
      </div>
      <ul>
        <li>
          <a
            href="mailto:fmovieshelp@gmail.com"
            title="Contact us"
            style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
          >
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
