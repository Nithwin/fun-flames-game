# 🎵 Adding Music to Your FLAMES App

## Current Status:
✅ **sparkle.mp3** - Downloaded (sound effect for star tapping)
✅ **lovers.mp3** - Downloaded (temporary romantic music)

## What You Need to Add:

### For "Love Me" by Justin Bieber (Lovers/Marriage):
**Important:** I cannot download copyrighted music for you. Here's how to add it yourself:

1. **Option 1: Use YouTube to MP3 (Personal Use Only)**
   - Go to a YouTube to MP3 converter (e.g., ytmp3.cc, y2mate.com)
   - Search for "Love Me Justin Bieber"
   - Download as MP3
   - Rename to `lovers.mp3`
   - Place in `public/audio/` folder

2. **Option 2: Use Your Own Music Library**
   - If you own the song on iTunes/Spotify, you can use it
   - Export as MP3
   - Rename to `lovers.mp3`

3. **Option 3: Use Royalty-Free Romantic Music**
   - Visit https://pixabay.com/music/search/romantic/
   - Download a romantic piano track
   - Rename to `lovers.mp3`

### Other Files Needed:
Download royalty-free music from **Pixabay** or **Mixkit**:

- **bg-music.mp3** - Ambient/chill background music
- **enemies.mp3** - Dramatic/epic music
- **friends.mp3** - Upbeat/happy music
- **affectionate.mp3** - Sweet/soft music
- **siblings.mp3** - Warm/playful music

## Quick Links:
- 🎵 Pixabay Music: https://pixabay.com/music/
- 🔊 Mixkit Sounds: https://mixkit.co/free-sound-effects/
- 📚 Free Music Archive: https://freemusicarchive.org/

## After Adding Files:
1. Place all MP3 files in `public/audio/`
2. Restart your dev server: `npm run dev`
3. Test the app - music should play!
4. Deploy to Vercel: `git add . && git commit -m "Add music files" && git push`

## File Sizes:
Keep each file under 5MB for faster loading. You can compress MP3s online if needed.
