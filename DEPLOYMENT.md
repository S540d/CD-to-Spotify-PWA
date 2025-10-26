# Deployment Guide

This guide explains how to deploy the CD to Spotify PWA to various hosting platforms.

## Prerequisites

Before deploying, you need:

1. A Spotify Developer account and app credentials
2. Your hosting platform configured
3. Node.js 18+ installed locally

## GitHub Pages Deployment

### Initial Setup

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Configure Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VITE_SPOTIFY_CLIENT_ID`: Your Spotify app client ID
     - `VITE_SPOTIFY_REDIRECT_URI`: Your GitHub Pages URL (e.g., `https://s540d.github.io/CD-to-Spotify-PWA/`)

3. **Update Spotify App Settings**:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Edit your app
   - Add your GitHub Pages URL to "Redirect URIs"

4. **Update Vite Config** (if using GitHub Pages with a repository name):
   
   Edit `app/vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/CD-to-Spotify-PWA/', // Your repository name
     plugins: [
       // ... rest of config
     ],
   })
   ```

### Deployment

Once configured, deployment is automatic:

1. Push to the `main` branch
2. GitHub Actions will build and deploy automatically
3. Check the Actions tab to monitor the deployment
4. Visit your GitHub Pages URL once complete

### Manual Deployment

You can also trigger deployment manually:

1. Go to the "Actions" tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## Netlify Deployment

1. **Connect Repository**:
   - Log in to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Base directory: `app`
   - Build command: `npm run build`
   - Publish directory: `app/dist`

3. **Set Environment Variables**:
   - Go to Site settings → Build & deploy → Environment
   - Add:
     - `VITE_SPOTIFY_CLIENT_ID`
     - `VITE_SPOTIFY_REDIRECT_URI` (use your Netlify URL)

4. **Update Spotify Redirect URI**:
   - Add your Netlify URL to Spotify app settings

## Vercel Deployment

1. **Import Project**:
   - Log in to Vercel
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project**:
   - Root Directory: `app`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**:
   - In project settings, add:
     - `VITE_SPOTIFY_CLIENT_ID`
     - `VITE_SPOTIFY_REDIRECT_URI` (use your Vercel URL)

4. **Update Spotify Redirect URI**:
   - Add your Vercel URL to Spotify app settings

## Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**:
   ```bash
   firebase login
   cd app
   firebase init hosting
   ```

   Configure:
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub integration: Optional

3. **Create `.firebaserc`**:
   ```json
   {
     "projects": {
       "default": "your-project-id"
     }
   }
   ```

4. **Build and Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

5. **Environment Variables**:
   - Create `.env.production` locally with your credentials
   - Add your Firebase URL to Spotify redirect URIs

## Custom Domain Setup

### GitHub Pages

1. In repository settings → Pages
2. Add your custom domain
3. Configure DNS:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or A records for GitHub's IP addresses
4. Update `VITE_SPOTIFY_REDIRECT_URI` to your custom domain

### Netlify

1. Go to Domain settings
2. Add custom domain
3. Configure DNS as instructed
4. Update Spotify redirect URI

### Vercel

1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS records
4. Update Spotify redirect URI

## Post-Deployment Checklist

- [ ] App loads correctly at deployed URL
- [ ] Spotify authentication works
- [ ] Can scan barcodes (requires HTTPS)
- [ ] PWA can be installed
- [ ] Service worker is registered
- [ ] Offline functionality works
- [ ] All API calls succeed
- [ ] Icons display correctly

## Troubleshooting

### Spotify Authentication Fails

- Verify redirect URI in Spotify app settings matches exactly
- Check environment variables are set correctly
- Ensure URL uses HTTPS

### Camera Not Working

- Camera requires HTTPS (or localhost)
- Check browser permissions
- Verify on a supported browser (Chrome, Edge, Safari)

### PWA Not Installing

- Ensure service worker is registered
- Check manifest.webmanifest is accessible
- Verify icons are present in public folder
- Use HTTPS

### Build Fails

- Check Node.js version (18+ required)
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Verify environment variables are set

## Performance Optimization

### After Deployment

1. **Run Lighthouse Audit**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for mobile and desktop
   - Target: 90+ for all categories

2. **Check Bundle Size**:
   ```bash
   npm run build
   # Review output for bundle sizes
   ```

3. **Monitor Real User Metrics**:
   - Consider adding analytics
   - Monitor error rates
   - Track PWA installation rates

## Monitoring

### GitHub Pages

- Check Actions tab for build status
- Review deployment logs for errors

### Netlify/Vercel

- Use built-in analytics
- Monitor deploy logs
- Set up error tracking

## Security

### Environment Variables

- Never commit `.env` files
- Use platform-specific secret management
- Rotate credentials periodically

### API Keys

- Use read-only tokens where possible
- Set up rate limiting
- Monitor API usage

## Updating

### To update the deployment:

1. Make changes locally
2. Test thoroughly: `npm run dev`
3. Build: `npm run build`
4. Test build: `npm run preview`
5. Commit and push
6. Automatic deployment will trigger

### Manual rollback:

- GitHub Pages: Revert the commit and push
- Netlify/Vercel: Use the dashboard to rollback to previous deployment
