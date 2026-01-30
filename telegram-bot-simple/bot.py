#!/usr/bin/env python3
"""
Simple Telegram Bot for Movie Posting
No database, no Express server - just Python!
"""

import os
import requests
import time
from datetime import datetime
import json

# ============================================
# CONFIGURATION - Edit these values
# ============================================

# Get from @BotFather
BOT_TOKEN = "8360649615:AAG6u6p9tKTj2DvNqrtlgu0f2nPzPfkVBW8"

# Your channel username (with @) or ID
CHANNEL_ID = "@watchio_community"

# Get from https://www.themoviedb.org/settings/api
# Use the "API Key (v3 auth)" - looks like: 426e58c5fbf22549...
# NOT the "API Read Access Token (v4 auth)" - that's the long JWT token
TMDB_API_KEY = "426e58c5fbf225492414d9988f91a7b1"

# Your website URL
WEBSITE_URL = "https://fmovies.in.net"

# How many movies to post per run
MOVIES_TO_POST = 5

# Track posted movies (simple text file)
POSTED_FILE = "posted_movies.txt"

# ============================================
# TMDB API Functions
# ============================================

def get_latest_movies():
    """Get latest/newest movies from TMDB (now playing and upcoming)"""
    url = f"https://api.themoviedb.org/3/movie/now_playing"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US",
        "page": 1
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        movies = response.json()["results"]
        
        # Sort by release date (newest first)
        movies.sort(key=lambda x: x.get('release_date', ''), reverse=True)
        return movies
    except Exception as e:
        print(f"❌ Error fetching movies: {e}")
        return []

def get_trending_movies():
    """Get trending movies from TMDB"""
    url = f"https://api.themoviedb.org/3/trending/movie/week"
    params = {"api_key": TMDB_API_KEY}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()["results"]
    except Exception as e:
        print(f"❌ Error fetching movies: {e}")
        return []

def get_movie_details(movie_id):
    """Get detailed movie info"""
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {"api_key": TMDB_API_KEY}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"❌ Error fetching movie details: {e}")
        return None

# ============================================
# Helper Functions
# ============================================

def load_posted_movies():
    """Load list of already posted movie IDs"""
    if not os.path.exists(POSTED_FILE):
        return set()
    
    with open(POSTED_FILE, 'r') as f:
        return set(line.strip() for line in f if line.strip())

def save_posted_movie(movie_id):
    """Save movie ID to posted list"""
    with open(POSTED_FILE, 'a') as f:
        f.write(f"{movie_id}\n")

def create_slug(title):
    """Create URL-friendly slug from title"""
    import re
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

# ============================================
# Telegram Functions
# ============================================

def send_movie_to_channel(movie):
    """Post movie to Telegram channel"""
    
    movie_id = movie['id']
    title = movie['title']
    year = movie.get('release_date', '')[:4]
    rating = movie.get('vote_average', 0)
    overview = movie.get('overview', 'No description available.')
    poster_path = movie.get('poster_path', '')
    
    # Get full details for genres
    details = get_movie_details(movie_id)
    genres = []
    if details and 'genres' in details:
        genres = [g['name'] for g in details['genres']]
    
    # Create slug and URLs
    slug = create_slug(title)
    watch_url = f"{WEBSITE_URL}/player/{movie_id}"
    review_url = f"{WEBSITE_URL}/movie/{slug}-{movie_id}/review"
    cast_url = f"{WEBSITE_URL}/movie/{slug}-{movie_id}/cast"
    ending_url = f"{WEBSITE_URL}/movie/{slug}-{movie_id}/ending-explained"
    
    # Create message
    genre_text = ', '.join(genres[:3]) if genres else 'N/A'
    
    caption = f"""🎬 <b>{title}</b> ({year})

⭐ <b>Rating:</b> {rating}/10
🎭 <b>Genre:</b> {genre_text}
📅 <b>Release:</b> {movie.get('release_date', 'N/A')}

{overview[:180]}{'...' if len(overview) > 180 else ''}

<i>Watch now on Watchio! 🍿</i>"""
    
    # Create inline keyboard
    keyboard = {
        "inline_keyboard": [
            [
                {"text": "▶️ WATCH NOW", "url": watch_url}
            ],
            [
                {"text": "📖 Read Review", "url": review_url},
                {"text": "👥 View Cast", "url": cast_url}
            ],
            [
                {"text": "💡 Ending Explained", "url": ending_url}
            ]
        ]
    }
    
    # Send to Telegram
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto"
    
    if poster_path:
        photo_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
        
        data = {
            "chat_id": CHANNEL_ID,
            "photo": photo_url,
            "caption": caption,
            "parse_mode": "HTML",
            "reply_markup": json.dumps(keyboard)
        }
        
        try:
            response = requests.post(url, data=data)
            response.raise_for_status()
            print(f"✅ Posted: {title} ({year})")
            return True
        except Exception as e:
            print(f"❌ Error posting {title}: {e}")
            return False
    
    return False

# ============================================
# Main Function
# ============================================

def main():
    """Main bot function"""
    
    print("=" * 50)
    print("🎬 Watchio Telegram Bot - Simple Version")
    print("=" * 50)
    print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Validate configuration
    if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("❌ ERROR: Please set your BOT_TOKEN in the script!")
        return
    
    if TMDB_API_KEY == "YOUR_TMDB_API_KEY":
        print("❌ ERROR: Please set your TMDB_API_KEY in the script!")
        return
    
    # Load already posted movies
    posted_movies = load_posted_movies()
    print(f"📊 Already posted: {len(posted_movies)} movies")
    
    # Get latest movies (newest releases)
    print("🔍 Fetching latest movies from TMDB...")
    movies = get_latest_movies()
    
    if not movies:
        print("❌ No movies found!")
        return
    
    print(f"✅ Found {len(movies)} latest movies")
    print(f"ℹ️  Newest: {movies[0]['title']} ({movies[0].get('release_date', 'N/A')})")
    print()
    
    # Filter out already posted
    new_movies = [m for m in movies if str(m['id']) not in posted_movies]
    
    if not new_movies:
        print("ℹ️  All trending movies already posted!")
        return
    
    print(f"📬 Posting {min(MOVIES_TO_POST, len(new_movies))} new movies...")
    print()
    
    # Post movies
    posted_count = 0
    for i, movie in enumerate(new_movies[:MOVIES_TO_POST]):
        if send_movie_to_channel(movie):
            save_posted_movie(movie['id'])
            posted_count += 1
            
            # Wait 2 seconds between posts to avoid rate limits
            if i < len(new_movies) - 1:
                time.sleep(2)
    
    print()
    print("=" * 50)
    print(f"✅ Successfully posted {posted_count} movies")
    print(f"⏰ Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

# ============================================
# Run the bot
# ============================================

if __name__ == "__main__":
    main()
