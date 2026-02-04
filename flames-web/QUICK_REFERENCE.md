# 🎮 FLAMES Game - Quick Reference Card

## 🚀 START THE APP NOW

```bash
npm run dev
```

**Opens:** http://localhost:5173 ⚡

---

## 📋 All Commands

```bash
npm run dev            # Start development (AUTO RELOAD)
npm run build          # Build for production
npm run preview        # Test production build
npm run lint           # Check code quality
npm run export-data    # Export Firebase data to CSV
```

---

## 📤 Push to GitHub

**First time only:**
```bash
# Replace YOUR_USERNAME with your actual GitHub username

git remote add origin https://github.com/YOUR_USERNAME/flames-game.git
git branch -M main
git push -u origin main
```

**After that:**
```bash
git add .
git commit -m "Your message"
git push
```

---

## 🔍 Check Status

```bash
git status          # See what changed
git log --oneline   # See commit history
git remote -v       # See where it pushes
```

---

## ✅ What's Included

✨ **FLAMES Game Logic**
- Calculate FLAMES result
- Dynamic quotes
- Beautiful UI

🔗 **Share Feature**
- Generate QR codes
- Animated design
- Download/Copy/Share buttons

💾 **Firebase Database**
- Save both names
- Track views
- Generate share links

📊 **Data Export**
- Export to CSV
- One command: `npm run export-data`

---

## 🎯 Project Structure

```
src/
├── components/
│   ├── InputForm.tsx          # Name input
│   ├── ResultCard.tsx         # Result display + share button
│   ├── ShareModal.tsx         # QR code modal
│   ├── SharedResultView.tsx   # View shared result
│   ├── ParticlesBackground.tsx
│   └── TiltWrapper.tsx
├── utils/
│   ├── firebase.ts            # Database integration
│   ├── flames.ts              # FLAMES logic
│   ├── quotes.ts              # Dynamic quotes
│   └── excelExport.ts
└── App.tsx                    # Main app
```

---

## 🔐 Environment Variables

File: `.env.local` (already created)

Contains:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

---

## 📦 Key Dependencies

- **React 19** - UI framework
- **Firebase** - Database
- **Framer Motion** - Animations
- **QRCode.React** - QR generation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **TypeScript** - Type safety

---

## 🌐 Deployment (Vercel)

1. Push to GitHub (see above)
2. Go to https://vercel.com
3. Import your repo
4. Add environment variables
5. Deploy!

---

## 🆘 Quick Troubleshoot

### Port 5173 busy?
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found?
```bash
npm install
```

### Firebase error?
Check `.env.local` has all 6 variables

### Git error?
```bash
git config user.name "Your Name"
git config user.email "your@email.com"
```

---

## 📊 Git Commits

```
da6d240 ← Final setup complete (current)
20cba21 ← Add startup guide
e4755de ← Initial commit with full app
```

---

## ✨ Features Quick Test

1. **Start app:** `npm run dev`
2. **Enter names:** "John" & "Sarah"
3. **Click:** "Calculate Destiny"
4. **Click:** "Generate QR & Share"
5. **See:** Beautiful animated QR!
6. **Download/Share:** Your QR code
7. **Check:** Firebase Console for data
8. **Export:** `npm run export-data`

---

## 🎊 You're Ready!

Everything is set up. Just run:

```bash
npm run dev
```

And enjoy your FLAMES game! 🚀
