// Example: How to update TitleCards to link to SEO-friendly pages
// This shows how to modify your existing TitleCards component

import React from 'react';
import { Link } from 'react-router-dom';
import './TitleCards.css';

const TitleCards = ({ title, data, category }) => {
  
  // Helper function to create SEO-friendly slug
  const createSlug = (item) => {
    const title = item.title || item.name;
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${cleanTitle}-${item.id}`;
  };

  // Determine if it's a movie or TV series
  const getContentType = (item) => {
    return item.title ? 'movie' : 'series';
  };

  return (
    <div className="title-cards">
      <h2>{title || 'Popular on Watchio'}</h2>
      <div className="card-list">
        {data.map((item, index) => {
          const slug = createSlug(item);
          const contentType = getContentType(item);
          
          return (
            <div className="card" key={index}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title || item.name}
                loading="lazy"
              />
              
              <div className="card-info">
                <h3>{item.title || item.name}</h3>
                
                <div className="card-actions">
                  {/* Link to Review (SEO-friendly, INDEXABLE) */}
                  <Link 
                    to={`/${contentType}/${slug}/review`}
                    className="btn-review"
                  >
                    📖 Review
                  </Link>
                  
                  {/* Link to Cast (SEO-friendly, INDEXABLE) */}
                  <Link 
                    to={`/${contentType}/${slug}/cast`}
                    className="btn-cast"
                  >
                    👥 Cast
                  </Link>
                  
                  {/* Link to Player (NOINDEX, hidden from search engines) */}
                  <Link 
                    to={`/player/${contentType}/${item.id}`}
                    className="btn-watch"
                  >
                    ▶️ Watch
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;

/* 
CSS for card actions (add to TitleCards.css):

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.card-actions a {
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-review {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-review:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-cast {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-cast:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-watch {
  background: #e50914;
  color: #fff;
  border: none;
}

.btn-watch:hover {
  background: #b00710;
}
*/

/* 
ALTERNATIVE APPROACH: Dropdown Menu
If you want a cleaner UI with a dropdown:

<div className="card" key={index}>
  <img src="..." alt="..." />
  
  <div className="card-hover">
    <h3>{item.title || item.name}</h3>
    
    <button className="btn-more">More Info ▼</button>
    
    <div className="dropdown-menu">
      <Link to={`/${contentType}/${slug}/review`}>
        📖 Read Review
      </Link>
      <Link to={`/${contentType}/${slug}/cast`}>
        👥 View Cast
      </Link>
      <Link to={`/${contentType}/${slug}/ending-explained`}>
        💡 Ending Explained
      </Link>
      <Link to={`/${contentType}/${slug}/similar`}>
        🎬 Similar Content
      </Link>
      <hr />
      <Link to={`/player/${contentType}/${item.id}`} className="watch-link">
        ▶️ Watch Now
      </Link>
    </div>
  </div>
</div>

CSS for dropdown:

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 10px;
  display: none;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  z-index: 100;
}

.card-hover:hover .dropdown-menu {
  display: flex;
}

.dropdown-menu a {
  padding: 10px 15px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.dropdown-menu a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.watch-link {
  background: #e50914;
  text-align: center;
  font-weight: 600;
}

.watch-link:hover {
  background: #b00710;
}
*/

/* 
IMPLEMENTATION STEPS:

1. Backup your current TitleCards.jsx:
   cp src/components/TitleCards/TitleCards.jsx src/components/TitleCards/TitleCards.jsx.backup

2. Update TitleCards.jsx with the new code above

3. Add CSS for card actions to TitleCards.css

4. Test:
   - Click "Review" button → Should go to /movie/inception-27205/review
   - Click "Cast" button → Should go to /movie/inception-27205/cast
   - Click "Watch" button → Should go to /player/movie/27205

5. Build and deploy:
   npm run build
   node scripts/generate-sitemap.js

RESULT:
- Users can access SEO-friendly review/cast pages
- Search engines will index review/cast pages
- Player pages remain hidden (noindex)
- Better user experience with multiple content options
*/
