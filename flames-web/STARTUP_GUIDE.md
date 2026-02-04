# 🚀 FLAMES Game - Startup & Commands Guide

## **Starting the Application**

### ✅ Quick Start (Recommended)
```bash
npm run dev
```
Opens: **http://localhost:5173**

---

## **📋 All Available Commands**

### **Development**
```bash
npm run dev
```
- Starts development server with hot reload
- Opens at `http://localhost:5173`
- Auto-refreshes on code changes

### **Build for Production**
```bash
npm run build
```
- Compiles TypeScript
- Optimizes with Vite
- Creates `dist/` folder
- Ready for deployment

### **Preview Production Build**
```bash
npm run preview
```
- Shows how app will look in production
- Opens at `http://localhost:4173`

### **Lint Code**
```bash
npm run lint
```
- Checks code quality with ESLint
- Fixes formatting issues

### **Export Data to CSV**
```bash
npm run export-data
```
- Exports all FLAMES data from Firebase
- Creates `flames_data.csv`
- Great for analytics and backups

---

## **🔧 Package.json Scripts**

```json
"scripts": {
  "dev": "vite",                              // Start dev server
  "build": "tsc -b && vite build",            // Build for production
  "preview": "vite preview",                  // Preview production
  "lint": "eslint .",                         // Check code quality
  "export-data": "node exportFlamesData.js"   // Export data to CSV
}
```

---

## **📁 Folder Structure**

```
flames-web/
├── src/
│   ├── components/          # React components
│   ├── utils/              # Helper functions & Firebase
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── *.css               # Styles
├── public/                 # Static assets
├── dist/                   # Build output (after npm run build)
├── exportFlamesData.js     # Data export script
├── package.json            # Dependencies & scripts
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── .env.local              # Firebase credentials
```

---

## **⚡ Key Features**

✅ **FLAMES Game Calculation**
- Enter two names
- Get FLAMES result with quote
- Beautiful animations

✅ **QR Code Generation**
- Dynamic QR codes
- Glowing animations
- Download as PNG
- Share on WhatsApp

✅ **Firebase Integration**
- Save results to Firestore
- Store both names in database
- Track view counts
- Generate shareable links

✅ **Data Export**
- Export all data to CSV
- Perfect for analytics
- One command: `npm run export-data`

---

## **🔐 Environment Setup**

Make sure `.env.local` exists with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=flames-be443
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## **📊 Dependencies**

### Runtime Dependencies:
- **react** & **react-dom** - UI framework
- **firebase** - Database & backend
- **framer-motion** - Animations
- **react-router-dom** - Routing
- **qrcode.react** - QR code generation
- **lucide-react** - Icons
- **tailwindcss** - Styling
- **three.js** - 3D effects

### Dev Dependencies:
- **vite** - Build tool
- **typescript** - Type safety
- **eslint** - Code quality
- **tailwindcss** - CSS utilities

---

## **🎯 Typical Development Workflow**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Make code changes** (auto-reloads)

3. **Check code quality:**
   ```bash
   npm run lint
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

6. **Export data:**
   ```bash
   npm run export-data
   ```

---

## **🚀 Deployment**

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flames-game.git
   git push -u origin master
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Import your repository
   - Vercel auto-detects Vite config

3. **Add environment variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all 6 Firebase config variables

4. **Deploy:**
   - Vercel auto-deploys on push
   - Your app goes live!

---

## **🔍 Testing the App**

### 1. Start the app:
```bash
npm run dev
```

### 2. Open in browser:
```
http://localhost:5173
```

### 3. Test features:
- ✅ Enter two names
- ✅ Click "Calculate Destiny"
- ✅ Click "Generate QR & Share"
- ✅ Download/copy/share QR code

### 4. Verify database:
- Go to Firebase Console
- Check `flames_shares` collection
- See your saved data

---

## **📊 Monitoring**

### View console logs:
Open browser DevTools (F12) → Console tab

### Check Firebase:
- https://console.firebase.google.com/
- Project: `flames-be443`
- Firestore Database

### Export data for analytics:
```bash
npm run export-data
```

---

## **🛠️ Troubleshooting**

### Port already in use:
```bash
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found:
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### Firebase connection error:
```bash
# Check .env.local file exists and is correct
cat .env.local
```

### Build fails:
```bash
# Check TypeScript errors
npm run build
```

---

## **📝 Git Commands**

### View commit history:
```bash
git log --oneline
```

### Check status:
```bash
git status
```

### Make a new commit:
```bash
git add .
git commit -m "Your message"
```

### Push to remote:
```bash
git push origin master
```

---

## **✨ Production Checklist**

- [ ] ✅ Code compiles without errors: `npm run build`
- [ ] ✅ Linter passes: `npm run lint`
- [ ] ✅ Firebase credentials in `.env.local`
- [ ] ✅ Test in production mode: `npm run preview`
- [ ] ✅ Git repository initialized
- [ ] ✅ Code pushed to GitHub
- [ ] ✅ Connected to Vercel
- [ ] ✅ Environment variables set in Vercel
- [ ] ✅ App deployed and live!

---

## **🎉 You're Ready!**

Your FLAMES game is production-ready! 🚀

**Quick Start:**
```bash
npm run dev
```

That's it! 🎊
