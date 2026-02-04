# 📤 Push to GitHub - Step by Step

## 🎯 Complete Instructions

### **Step 1: Create Repository on GitHub**

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `flames-game`
   - **Description:** "FLAMES game with QR sharing and Firebase integration"
   - **Public** or **Private** (your choice)
3. Click **"Create repository"**

---

### **Step 2: Connect Local Repo to GitHub**

In PowerShell, run these commands (one at a time):

```powershell
cd "c:\Users\vmnit\Desktop\fun flames game\flames-web"
```

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/flames-game.git
```

Verify it's connected:
```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/flames-game.git (fetch)
origin  https://github.com/YOUR_USERNAME/flames-game.git (push)
```

---

### **Step 3: Push to GitHub**

Run these commands:

```powershell
git branch -M main
```

Then push:
```powershell
git push -u origin main
```

**First time will ask for credentials:**
- Enter your GitHub username
- Enter your GitHub password (or personal access token)

---

### **Step 4: Verify on GitHub**

1. Go to: `https://github.com/YOUR_USERNAME/flames-game`
2. You should see your code!
3. See all 4 commits in the commit history

---

## ✅ Example Walkthrough

Replace `YOUR_USERNAME` = `john-doe`

```powershell
# Step 1: Navigate to project
cd "c:\Users\vmnit\Desktop\fun flames game\flames-web"

# Step 2: Add remote
git remote add origin https://github.com/john-doe/flames-game.git

# Step 3: Verify
git remote -v

# Step 4: Push
git branch -M main
git push -u origin main

# Enter credentials when prompted
```

---

## 🔄 After Pushing

### **Make a change to code?**
```powershell
git add .
git commit -m "Your change description"
git push
```

### **Check status?**
```powershell
git status
git log --oneline
```

---

## 🚀 Deploy to Vercel (Optional)

Once pushed to GitHub:

1. Go to: https://vercel.com
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select: `flames-game`
5. Click **"Import"**
6. Add Environment Variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
7. Click **"Deploy"**

Your app goes live! 🎉

---

## 🆘 Troubleshooting

### **Error: "fatal: remote origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/flames-game.git
```

### **Error: "fatal: 'origin' does not appear to be a 'git' repository"**
Make sure you're in the `flames-web` folder:
```powershell
cd "c:\Users\vmnit\Desktop\fun flames game\flames-web"
```

### **Authentication failed?**
1. Go to: https://github.com/settings/tokens
2. Create new **Personal Access Token**
3. Use token instead of password when prompted

### **Can't remember your username?**
```powershell
git remote -v
```

---

## 📋 Pre-Push Checklist

- [ ] Created GitHub repository
- [ ] Updated `YOUR_USERNAME` in commands
- [ ] App runs locally: `npm run dev`
- [ ] All code is committed: `git status` shows clean
- [ ] Ready to push!

---

## 🎊 You Did It!

Your code is now on GitHub! 🎉

Next steps:
1. Share the repo link with others
2. Deploy to Vercel (optional)
3. Make changes and push: `git push`

---

## 📚 Quick Reference

```powershell
# View remote
git remote -v

# View commits
git log --oneline

# View status
git status

# Make change & push
git add .
git commit -m "message"
git push

# View branches
git branch -a
```

---

**All set! Your FLAMES game is version controlled and ready to share!** 🚀
