# 🚀 Deployment Guide

## 📋 Quick Navigation
- [View Locally](#view-locally)
- [Deploy to GitHub Pages](#deploy-to-github-pages-free)
- [Deploy to Vercel](#deploy-to-vercel-free)
- [Deploy to Netlify](#deploy-to-netlify-free)

---

## 🖥️ View Locally

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open Browser
Go to: **http://localhost:5173**

That's it! The dashboard is now running on your computer.

### Stop the Server
Press `Ctrl + C` in the terminal

---

## 🌐 Deploy to GitHub Pages (FREE)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** button → **"New repository"**
3. Name it: `ai-trading-dashboard` (or any name you want)
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Your Code

Open terminal in your project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Trading Dashboard"

# Add your GitHub repo (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/ai-trading-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **"Settings"** tab
3. Click **"Pages"** in left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Click **"Save"**

### Step 4: Update Base Path

Edit `vite.config.ts` and add base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-trading-dashboard/', // Your repo name
})
```

### Step 5: Push Changes

```bash
git add .
git commit -m "Configure for GitHub Pages"
git push
```

### Step 6: Wait & Access

- Wait 2-3 minutes for deployment
- Your site will be live at: **https://YOUR-USERNAME.github.io/ai-trading-dashboard/**

✅ **Done! Your dashboard is now live!**

---

## 🚀 Deploy to Vercel (FREE - Easiest)

### Method 1: Using Vercel Website

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use GitHub account)
3. Click **"Import Project"**
4. Select your GitHub repository
5. Click **"Deploy"**
6. Wait 1-2 minutes
7. **Done!** Your site is live at: `your-project.vercel.app`

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ai-trading-dashboard
# - Directory? ./
# - Build command? npm run build
# - Output directory? dist

# Your site is now live!
```

**Automatic Updates**: Every time you push to GitHub, Vercel auto-deploys!

---

## 🎯 Deploy to Netlify (FREE)

### Method 1: Drag & Drop

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Click **"Sign Up"** (use GitHub)
4. Drag the `dist` folder to Netlify
5. **Done!** Site is live at: `random-name.netlify.app`

### Method 2: Connect GitHub

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy"**
7. **Done!** Auto-deploys on every push!

---

## 📦 Manual Build & Host Anywhere

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with your complete website.

### Upload to Any Host

You can upload the `dist` folder to:
- **AWS S3** + CloudFront
- **Firebase Hosting**
- **DigitalOcean** App Platform
- **Cloudflare Pages**
- Any web hosting (cPanel, etc.)

Just upload all files from the `dist` folder to your web server!

---

## 🔧 Troubleshooting

### Build Fails on GitHub Actions

Make sure you pushed the workflow file:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add deploy workflow"
git push
```

### Page Shows 404

Check `vite.config.ts` has correct base path:
```typescript
base: '/your-exact-repo-name/'
```

### Blank Page After Deploy

1. Check browser console (F12) for errors
2. Verify base path in `vite.config.ts`
3. Redeploy after fixing

### GitHub Pages Not Working

1. Settings → Pages → Source should be "GitHub Actions"
2. Check Actions tab for deployment status
3. Wait 5 minutes after first push

---

## 🎨 Custom Domain (Optional)

### For GitHub Pages

1. Buy domain (GoDaddy, Namecheap, etc.)
2. Add CNAME file to project:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```
3. In your domain DNS settings, add:
   - Type: `CNAME`
   - Name: `@` (or `www`)
   - Value: `your-username.github.io`
4. In GitHub Settings → Pages → Custom domain → Enter your domain

### For Vercel/Netlify

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

---

## 📊 Comparison

| Platform | Speed | Auto-Deploy | Custom Domain | Difficulty |
|----------|-------|-------------|---------------|------------|
| **Vercel** | ⚡⚡⚡ Very Fast | ✅ Yes | ✅ Free | ⭐ Easiest |
| **Netlify** | ⚡⚡ Fast | ✅ Yes | ✅ Free | ⭐ Easy |
| **GitHub Pages** | ⚡ Good | ✅ Yes | ✅ Free | ⭐⭐ Medium |

**Recommendation**: Use **Vercel** for fastest deployment and best performance!

---

## 🆘 Need Help?

### Quick Commands Reference

```bash
# View locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check if build works
npm run build && npm run preview
```

### Common Issues

**Port 5173 already in use?**
```bash
# Kill the process
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

**Node version error?**
```bash
# Install Node 18 or higher
# Check version
node --version
```

**Dependencies error?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Verification Checklist

After deployment, check:
- [ ] Website loads without errors
- [ ] Market indices show up
- [ ] Stock list displays
- [ ] Can click stocks
- [ ] AI agents analyze (wait 1.5s)
- [ ] Charts render properly
- [ ] All styles load correctly
- [ ] Mobile responsive works

---

## 🎉 You're Live!

Once deployed, share your link:
- **GitHub Pages**: `https://username.github.io/repo-name/`
- **Vercel**: `https://project-name.vercel.app`
- **Netlify**: `https://project-name.netlify.app`

**Pro Tip**: Add your live URL to your GitHub repo description for easy access!

---

Need help? Check:
- GitHub Actions tab (for GitHub Pages)
- Vercel/Netlify dashboard (for those platforms)
- Browser console (F12) for errors
