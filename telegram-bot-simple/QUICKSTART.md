# ⚡ 3-MINUTE QUICKSTART

## 🎯 Get Bot Running RIGHT NOW

### 1️⃣ Edit bot.py (1 minute)

Open `bot.py` and change these 3 lines:

```python
BOT_TOKEN = "PUT_YOUR_BOT_TOKEN_HERE"
CHANNEL_ID = "@YourChannelUsername"
TMDB_API_KEY = "PUT_YOUR_TMDB_KEY_HERE"
```

### 2️⃣ Install (30 seconds)

```bash
cd telegram-bot-simple
pip3 install --break-system-packages requests
```

### 3️⃣ Run (30 seconds)

```bash
python3 bot.py
```

### 4️⃣ Check Your Channel! ✅

You should see 5 movies posted!

---

## 🔑 Where to Get Keys?

### Bot Token:
1. Telegram → Search `@BotFather`
2. Send: `/newbot`
3. Follow prompts
4. Copy token

### Channel:
1. Create new channel in Telegram
2. Make it Public
3. Add your bot as Administrator
4. Use username like: `@WatchioMovies`

### TMDB Key:
1. https://www.themoviedb.org/settings/api
2. Sign up (free)
3. Request API key
4. Copy it

---

## ⏰ Run Daily Automatically

```bash
crontab -e
```

Add this line:
```
0 9 * * * cd /Users/aashutoshdahal/netflix-clone/telegram-bot-simple && /usr/bin/python3 bot.py
```

Posts 5 movies every day at 9 AM!

---

## 🎉 Done!

Simplest possible Telegram bot. One file. No database. No server.

**Manual:** Run `python3 bot.py` anytime
**Auto:** Set up cron job above

Check your channel - movies with WATCH NOW buttons linking to your site! 🚀
