# 🚀 SIMPLE TELEGRAM BOT - 3 MINUTE SETUP

## ⚡ The Simplest Way!

Just one Python file - no database, no Node.js, no complicated setup!

---

## 📋 Requirements

- Python 3.6+ (already installed on macOS)
- That's it!

---

## 🎯 Setup (3 Minutes)

### Step 1: Get Bot Token (1 minute)

1. Open Telegram, search `@BotFather`
2. Send: `/newbot`
3. Name: `Watchio Movies Bot`
4. Username: `WatchioMoviesBot`
5. **Copy the token!**

### Step 2: Create Channel (1 minute)

1. Create new Telegram channel: `Watchio Movies`
2. Make it **Public**: `@WatchioMovies`
3. Add your bot as **Administrator** with "Post Messages" permission

### Step 3: Get TMDB API Key (1 minute)

1. Go to: https://www.themoviedb.org/settings/api
2. Sign up (free)
3. Request API key
4. **Copy the key!**

### Step 4: Configure Bot (30 seconds)

Open `bot.py` and edit these 3 lines:

```python
# Line 18
BOT_TOKEN = "1234567890:ABC..."  # From @BotFather

# Line 21
CHANNEL_ID = "@WatchioMovies"  # Your channel

# Line 24
TMDB_API_KEY = "abc123..."  # From TMDB
```

---

## 🚀 Run It!

```bash
cd telegram-bot-simple

# Install requirements (only once)
pip3 install --break-system-packages requests

# Run the bot
python3 bot.py
```

**That's it!** Check your Telegram channel - 5 movies posted! 🎉

---

## ⏰ Auto-Post Daily

### Option 1: macOS cron (Built-in)

```bash
# Edit crontab
crontab -e

# Add this line (posts at 9 AM daily)
0 9 * * * cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple && /usr/bin/python3 bot.py

# Save and exit
```

### Option 2: Manual

Just run whenever you want to post:

```bash
python3 bot.py
```

---

## 🎬 What It Does

1. Fetches trending movies from TMDB
2. Filters out already posted ones (saved in `posted_movies.txt`)
3. Posts 5 new movies to your channel with:
   - Movie poster
   - Info (rating, genre, release date)
   - Description
   - **▶️ WATCH NOW** button → Your player
   - Review, Cast, Ending buttons → SEO pages
4. Tracks posted movies to avoid duplicates

---

## 🎨 Button Layout

```
┌──────────────────────┐
│   ▶️ WATCH NOW      │  → /player/27205
├──────────────────────┤
│ 📖 Review | 👥 Cast │  → SEO pages
├──────────────────────┤
│  💡 Ending Explained │  → SEO page
└──────────────────────┘
```

---

## ⚙️ Customize

Edit `bot.py`:

```python
# Change number of posts
MOVIES_TO_POST = 10  # Post 10 movies instead of 5

# Change website URL
WEBSITE_URL = "https://yoursite.com"
```

---

## 🧪 Test Different Movies

Edit the script to post specific movies:

```python
# At the end of bot.py, add:
if __name__ == "__main__":
    # Test with specific movie
    movie = {
        'id': 550,  # Fight Club
        'title': 'Fight Club',
        'release_date': '1999-10-15',
        'vote_average': 8.4,
        'overview': 'An insomniac office worker...',
        'poster_path': '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    }
    send_movie_to_channel(movie)
```

Popular movie IDs:
- 550 - Fight Club
- 27205 - Inception  
- 155 - The Dark Knight
- 278 - The Shawshank Redemption
- 680 - Pulp Fiction

---

## 📊 Check Posted Movies

```bash
# See how many movies posted
wc -l posted_movies.txt

# See which movies
cat posted_movies.txt
```

---

## 🔧 Troubleshooting

### ❌ "Unauthorized"
- Check BOT_TOKEN is correct
- No spaces before/after token

### ❌ "Chat not found"
- Use @username: `@WatchioMovies`
- Make sure channel is Public
- Bot must be Administrator

### ❌ "Not enough rights"
- Bot needs "Post Messages" permission
- Go to channel → Administrators → Edit bot

### ❌ Python not found
```bash
# Install Python (if needed)
brew install python3
```

---

## 🆚 Simple vs Full Version

### ✅ This Simple Version (telegram-bot-simple/)
- **Setup:** 3 minutes
- **Files:** 1 Python file
- **Dependencies:** Just Python + requests
- **Database:** None (uses text file)
- **API:** None
- **Best for:** Quick setup, manual/scheduled runs

### 🔧 Full Version (telegram-bot/)
- **Setup:** 15 minutes
- **Files:** 10+ files (Node.js + Express + MongoDB)
- **Dependencies:** Many npm packages
- **Database:** MongoDB
- **API:** REST API for remote control
- **Best for:** Advanced features, web dashboard, stats

---

## 🎉 You're Done!

**Single command to post:**
```bash
python3 bot.py
```

**Daily auto-post:**
```bash
crontab -e
# Add: 0 9 * * * cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple && python3 bot.py
```

**Check results:**
- Open your Telegram channel
- You should see 5 movies with WATCH NOW buttons!

---

## 📈 Scale Up Later

Start with this simple version. When you need more features:

✅ **Keep using simple:** Just run `python3 bot.py` daily
❌ **Need API/dashboard:** Use the full Node.js version in `telegram-bot/`

---

## 💡 Pro Tips

1. **Test first:** Post to a test channel before your main one
2. **Adjust timing:** Change MOVIES_TO_POST based on channel size
3. **Monitor growth:** Check channel analytics in Telegram
4. **Vary content:** Edit script to post different movie categories

---

🎬 **That's it! Simplest possible Telegram bot!** 🚀

No database, no server, just one Python script. Run it whenever you want to post movies!
