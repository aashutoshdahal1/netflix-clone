import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Watchio - Watch Free Movies & TV Shows Online | fmovies.in.net",
  description = "Watch unlimited movies, TV shows, and series online for free on Watchio. Stream latest Hollywood, Bollywood movies in HD quality. No subscription required.",
  keywords = "watch movies online, free movies, TV shows, streaming, HD movies, Watchio, fmovies, online cinema, web series, latest movies",
  image = "https://fmovies.in.net/watchio-logo.png",
  url = "https://fmovies.in.net",
  type = "website",
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Watchio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
