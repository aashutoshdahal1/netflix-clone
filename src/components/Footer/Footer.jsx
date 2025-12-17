import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <>
      {/* Fixed YouTube button */}
      <a 
        href="https://www.youtube.com/@Aashucode?sub_confirmation=1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed-youtube-btn"
        title="Subscribe to our YouTube channel"
      >
        <img src={youtube_icon} alt="Subscribe on YouTube" />
      </a>

      <div className="footer">
        <div className="footer-icons">
          {/* <img src={facebook_icon} alt="fb" />
          <img src={instagram_icon} alt="instagram" />
          <img src={twitter_icon} alt="twitter" /> */}
         <a href="https://www.youtube.com/@Aashucode?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
          <img src={youtube_icon} alt="youtube" />
         </a>
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
    </>
  );
};

export default Footer;
