# Quick Start Guide

## Setup

1. **Install dependencies:**
```bash
cd svg-marketplace
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
http://localhost:3000

## Deploy to Vercel

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy:**
- Go to vercel.com
- Click "Import Project"
- Select your repo
- Click "Deploy"

Done! Your app is now live.

## File Structure

```
svg-marketplace/
├── app/
│   ├── globals.css       # Tailwind CSS
│   ├── layout.tsx         # Root layout + SEO
│   └── page.tsx           # Home page (loads component)
├── components/
│   ├── Marketplace.tsx    # Export wrapper
│   └── MarketplaceClient.tsx  # Client component
├── package.json
├── next.config.js
└── tailwind.config.js
```

##  Key Features

✅ Browse/Search listings
✅ Create listings
✅ Product details
✅ Contact sellers (WhatsApp/Call)
✅ Manage listings
✅ Price alerts
✅ Mobile responsive

## Next Steps

- Add image upload
- Add authentication
- Add real messaging
- Connect to database (Supabase recommended)
