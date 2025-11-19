# Deployment Guide - YouTube SEO Tool

Complete guide for deploying your YouTube SEO Tool to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ Gemini API Key
- ✅ YouTube Data API v3 Key
- ✅ Environment variables configured
- ✅ All dependencies installed
- ✅ Build runs successfully locally
- ✅ All tools tested and working

## 🚀 Deployment Options

### 1. Vercel (Recommended - Free Tier)

**Why Vercel?**
- Built by Next.js creators
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Instant rollbacks
- Free hobby plan

**Steps:**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? youtube-seo-tool
# - Directory? ./
# - Override settings? No
```

**Add Environment Variables:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following:

```
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

5. Redeploy: `vercel --prod`

**Custom Domain (Optional):**

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` environment variable

---

### 2. Render (Free Tier Available)

**Why Render?**
- Free tier with 750 hours/month
- Easy deployment from GitHub
- Automatic deployments on push
- Environment variable management

**Steps:**

1. **Create Account:** [render.com](https://render.com)

2. **New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or use public Git URL

3. **Configure Service:**
   ```
   Name: youtube-seo-tool
   Environment: Node
   Region: Choose closest to users
   Branch: main
   Build Command: bun install && bun run build
   Start Command: bun run start
   ```

4. **Add Environment Variables:**
   - Click "Environment" tab
   - Add variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   NEXT_PUBLIC_BASE_URL=https://your-app.onrender.com
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete

**Auto-Deploy:**
- Render automatically deploys on git push
- Configure in Settings → Build & Deploy

---

### 3. Railway (Free $5/month credit)

**Why Railway?**
- Simple deployment
- Good free tier
- Built-in environment variables
- Easy database integration

**Steps:**

1. **Create Account:** [railway.app](https://railway.app)

2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Or "Empty Project" for manual setup

3. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   NEXT_PUBLIC_BASE_URL=https://your-app.up.railway.app
   ```

4. **Deploy:**
   - Railway auto-detects Next.js
   - Deployment starts automatically

5. **Get URL:**
   - Go to "Settings" → "Domains"
   - Generate domain or add custom domain

---

### 4. Netlify

**Steps:**

1. **Create Account:** [netlify.com](https://netlify.com)

2. **New Site from Git:**
   - Connect GitHub repository
   - Configure build settings:
   ```
   Build command: bun run build
   Publish directory: .next
   ```

3. **Add Environment Variables:**
   - Site Settings → Environment Variables
   - Add your API keys

4. **Deploy:**
   - Deploys automatically

**Note:** For API routes, you may need to configure redirects.

---

### 5. Self-Hosting (VPS/Dedicated Server)

**Requirements:**
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx or Apache
- PM2 for process management

**Steps:**

1. **Setup Server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Bun (optional)
curl -fsSL https://bun.sh/install | bash

# Install PM2
npm install -g pm2
```

2. **Deploy Application:**

```bash
# Clone repository
git clone your-repo-url
cd youtube-seo-tool

# Install dependencies
bun install

# Build
bun run build

# Create .env.local
nano .env.local
# Add your environment variables

# Start with PM2
pm2 start npm --name "youtube-seo" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **SSL with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔐 Security Best Practices

### Environment Variables

**Never commit:**
- `.env.local`
- `.env.production`
- Any file with API keys

**Always:**
- Use `.env.example` as template
- Add `.env.local` to `.gitignore`
- Rotate API keys periodically
- Use different keys for dev/prod

### API Rate Limiting

Both APIs have rate limits:

**Gemini AI:**
- Free tier: 60 requests/minute
- Consider caching responses

**YouTube Data API:**
- Quota: 10,000 units/day
- Each API call costs units
- Monitor usage in Google Cloud Console

**Implement Caching:**

```typescript
// Example: Cache API responses
const cache = new Map()
const CACHE_DURATION = 3600000 // 1 hour

function getCached(key: string) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}
```

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Google Analytics

Add to `layout.tsx`:
```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 3. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

Initialize:
```typescript
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

---

## 🚦 Performance Optimization

### 1. Image Optimization

Already handled by Next.js Image component.

### 2. API Response Caching

Implement Redis or in-memory caching for frequent requests.

### 3. CDN for Static Assets

Vercel and Netlify automatically provide CDN.

### 4. Database Connection Pooling

If you add a database later:
```typescript
import { Pool } from 'pg'

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Build
        run: bun run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🧪 Testing Before Production

### 1. Build Test

```bash
bun run build
bun run start
```

Visit `http://localhost:3000` and test all tools.

### 2. API Tests

```bash
# Test keyword research
curl -X POST http://localhost:3000/api/keyword-research \
  -H "Content-Type: application/json" \
  -d '{"keyword":"test"}'

# Test tag generator
curl -X POST http://localhost:3000/api/tag-generator \
  -H "Content-Type: application/json" \
  -d '{"topic":"test video"}'
```

### 3. SEO Check

- Test with [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Validate meta tags with [Meta Tags](https://metatags.io/)
- Check structured data with [Schema Markup Validator](https://validator.schema.org/)

---

## 📱 Post-Deployment

### 1. Submit Sitemap

Submit to Google Search Console:
```
https://yourdomain.com/sitemap.xml
```

### 2. Monitor Performance

- Check Lighthouse scores
- Monitor API usage
- Track error rates

### 3. Setup Alerts

Configure alerts for:
- API quota warnings
- Error rate spikes
- Downtime notifications

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
bun install
bun run build
```

### API Keys Not Working

- Check environment variable names
- Verify keys are correctly copied
- Test keys with curl directly
- Check API quotas in respective consoles

### 500 Errors

- Check server logs
- Verify all environment variables are set
- Test API endpoints individually

---

## 📈 Scaling Considerations

When your app grows:

1. **Upgrade API Plans:**
   - Gemini AI: Paid tiers for higher limits
   - YouTube API: Request quota increase

2. **Add Database:**
   - Store user data
   - Cache API responses
   - Track analytics

3. **Add Authentication:**
   - Implement user accounts
   - Save favorite searches
   - Premium features

4. **Load Balancing:**
   - Multiple server instances
   - Geographic distribution

---

## ✅ Deployment Checklist

- [ ] API keys configured
- [ ] Environment variables set
- [ ] Build successful locally
- [ ] All tools tested
- [ ] SEO tags verified
- [ ] Sitemap accessible
- [ ] robots.txt configured
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup
- [ ] Error tracking enabled
- [ ] Monitoring configured
- [ ] Backup strategy defined

---

## 🎉 You're Ready!

Your YouTube SEO Tool is now live and helping creators optimize their content!

**Support Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [YouTube API Documentation](https://developers.google.com/youtube/v3)

**Need Help?**
- Open an issue on GitHub
- Check the documentation
- Review error logs
