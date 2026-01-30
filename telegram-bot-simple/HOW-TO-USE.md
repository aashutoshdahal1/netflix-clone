# 🎬 HOW TO USE YOUR TELEGRAM BOT

## ✅ YOUR BOT IS WORKING!

Your bot successfully posted to: **@watchio_community**

---

## 📱 HOW TO SHARE YOUR CHANNEL

### Share Link:
```
https://t.me/watchio_community
```

Give this link to users, or share:
- On your website: fmovies.in.net
- On social media
- In WhatsApp/Discord groups
- On Reddit movie communities

### Embed on Website:
Add this to your website footer or navbar:

```html
<a href="https://t.me/watchio_community" target="_blank">
  📢 Join our Telegram Channel
</a>
```

---

## 🚀 HOW TO POST MOVIES

### Option 1: Run Manually Anytime
```bash
cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple
python3 bot.py
```

This posts 5 latest movies immediately!

### Option 2: Auto-Post Daily (Recommended)
```bash
crontab -e
```

Add this line:
```
0 9 * * * cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple && /usr/bin/python3 bot.py >> /tmp/telegram-bot.log 2>&1
```

Now it posts automatically every day at 9 AM!

To check if it's scheduled:
```bash
crontab -l
```

---

## 🎯 WHAT THE BOT DOES

### It Posts:
- ✅ Latest movies (now playing in theaters)
- ✅ Sorted by release date (newest first)
- ✅ Skips already posted movies (no duplicates)
- ✅ 5 movies per run (configurable)

### Each Post Includes:
- 🎬 Movie poster image
- ⭐ Rating, genre, release date
- 📝 Description
- 🔘 **4 Buttons:**
  1. **▶️ WATCH NOW** → Your player (`/player/27205`)
  2. **📖 Read Review** → SEO review page
  3. **👥 View Cast** → Cast & crew page
  4. **💡 Ending Explained** → Ending analysis page

---

## ⚙️ CUSTOMIZE THE BOT

### Change Number of Posts
Edit `bot.py` line 30:
```python
MOVIES_TO_POST = 10  # Post 10 movies instead of 5
```

### Post Specific Movie
Add at the end of `bot.py`:
```python
# Manual test
if __name__ == "__main__":
    # Post specific movie by ID
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

---

## 📊 CHECK POSTED MOVIES

### See How Many Posted:
```bash
wc -l posted_movies.txt
```

### See Which Movies:
```bash
cat posted_movies.txt
```

### Clear History (Post Again):
```bash
rm posted_movies.txt
```

Now run `python3 bot.py` to post the same movies again.

---

## 🎬 MOVIE SOURCES

The bot gets movies from TMDB (The Movie Database).

### Current Setting: **Latest Movies**
- Now playing in theaters
- Sorted by release date (newest first)
- Updates daily

### Alternative: Want Popular Movies Instead?
Edit `bot.py` line 231:
```python
# Change this:
movies = get_latest_movies()

# To this:
movies = get_trending_movies()
```

---

## 💡 PRO TIPS

### 1. Post Multiple Times Daily
```bash
crontab -e
```

Add multiple times:
```
0 9 * * * cd ... && python3 bot.py   # 9 AM
0 15 * * * cd ... && python3 bot.py  # 3 PM
0 21 * * * cd ... && python3 bot.py  # 9 PM
```

Posts 15 movies per day (5 movies × 3 times)!

### 2. Test Before Auto-Posting
Always run manually first:
```bash
python3 bot.py
```

Check your channel to verify everything looks good.

### 3. Monitor Logs
If using cron, check logs:
```bash
tail -f /tmp/telegram-bot.log
```

### 4. Avoid Duplicates
The bot automatically tracks posted movies in `posted_movies.txt`. Never post the same movie twice!

---

## 🔧 TROUBLESHOOTING

### No New Movies Posted?
```
ℹ️ All trending movies already posted!
```

**Solution:** The bot already posted all available movies. Wait for new releases or:
```bash
rm posted_movies.txt  # Clear history
python3 bot.py        # Post again
```

### Want More Variety?
Edit `bot.py` to fetch from multiple sources:
```python
# Get movies from different sources
latest = get_latest_movies()[:2]      # 2 latest
trending = get_trending_movies()[2:5]  # 3 trending
movies = latest + trending             # Mix both!
```

---

## 📈 GROW YOUR CHANNEL

### 1. Promote on Website
Add banner:
```html
<div class="telegram-banner">
  📢 Get latest movies on Telegram: 
  <a href="https://t.me/watchio_community">Join Channel</a>
</div>
```

### 2. Add to Movie Pages
In your review/player pages:
```html
<a href="https://t.me/watchio_community" class="telegram-btn">
  📱 Follow us on Telegram for more movies!
</a>
```

### 3. Social Media
- Post on Twitter/X
- Share in movie groups
- Post on Reddit (r/movies, r/MovieSuggestions)
- Share on Facebook movie pages

### 4. Word of Mouth
- Tell friends
- Share in WhatsApp groups
- Post in Discord servers

---

## 📊 EXPECTED GROWTH

**Week 1:** 50-200 subscribers
**Month 1:** 500-2,000 subscribers  
**Month 3:** 2,000-10,000 subscribers
**Month 6:** 10,000+ subscribers

Each subscriber = potential website visitor = ad revenue! 💰

---

## 🎉 YOU'RE ALL SET!

**Your Channel:** https://t.me/watchio_community

**Post Movies:**
```bash
python3 bot.py
```

**Auto-Post Daily:**
```bash
crontab -e
# Add: 0 9 * * * cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple && python3 bot.py
```

**Share Your Channel:**
- Website: fmovies.in.net
- Social media
- Movie communities

**Watch It Grow!** 🚀📈

Your channel will drive tons of traffic to your website! 🎬✨
