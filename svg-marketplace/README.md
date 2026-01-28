# 🇻🇨 SVG Marketplace - Complete Platform

A modern, full-stack marketplace platform for Saint Vincent and the Grenadines with authentication, real-time messaging, and cloud storage.

---

## ✨ Features

### 🔐 User Authentication
- Email/password sign up & sign in
- Secure user profiles
- Password reset (coming soon)
- Social login ready (Google, Facebook)

### 📱 Core Marketplace
- **Browse** - All listings with smart filters
- **Create Listings** - 3-step form with image upload
- **Product Details** - Full specs, gallery, seller info
- **My Listings** - Manage your items
- **Real-time Messaging** - Chat with buyers/sellers
- **Notifications** - Expiring listings, new messages
- **Favorites** - Save items you like

### 💬 Messaging System
- Real-time chat with WebSocket
- Conversation threads per listing
- Unread message indicators
- Message history

### 🖼️ Image Upload
- Drag & drop or click to upload
- Cloudinary CDN integration
- Auto-compression (60% size reduction)
- Multiple images per listing
- Progress tracking

### 🔔 Smart Notifications
- Listing expiring soon (7 days)
- New message alerts
- View milestones
- Real-time updates

### 📊 Advanced Features
- Price value alerts (overpriced/great deal)
- 30-day auto-expiration
- Search across title & description
- Multi-filter (category, location, price, condition)
- View & favorite tracking
- Business/wholesale listings

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free)
- Cloudinary account (free)

### 1. Clone & Install
```bash
cd svg-marketplace
npm install
```

### 2. Setup Supabase (5 min)
Follow detailed guide: **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)**

Quick steps:
1. Create project at [supabase.com](https://supabase.com)
2. Run `lib/supabase/schema.sql` in SQL Editor
3. Copy API keys

### 3. Setup Cloudinary (3 min)
Follow guide: **[IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md)**

Quick steps:
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Create upload preset: "svg-marketplace"
3. Copy cloud name

### 4. Configure Environment
```bash
# Copy template
cp .env.local.example .env.local

# Edit .env.local with your keys:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
svg-marketplace/
│
├── 📱 APP
│   ├── app/
│   │   ├── layout.tsx              # Root layout with AuthProvider
│   │   ├── page.tsx                # Home page
│   │   └── test-upload/            # Image upload test page
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx       # Sign in/up modal
│   │   │   └── AuthProvider.tsx    # Auth context
│   │   ├── ImageUpload.tsx         # Upload component
│   │   ├── ImageUploadStep.tsx     # Form step wrapper
│   │   ├── Marketplace.tsx         # Main marketplace (old)
│   │   └── MarketplaceClient.tsx   # Client wrapper
│   │
│   └── lib/
│       ├── imageUpload.ts          # Upload logic
│       └── supabase/
│           ├── client.ts           # Supabase client
│           ├── types.ts            # TypeScript types
│           ├── schema.sql          # Database schema
│           └── services.ts         # API functions
│
├── 📚 DOCUMENTATION
│   ├── README.md                   # This file
│   ├── SUPABASE_SETUP.md          # Backend setup guide
│   ├── IMAGE_UPLOAD_GUIDE.md      # Cloudinary setup
│   ├── QUICKSTART.md              # Quick reference
│   └── DEPLOYMENT.md              # Deploy to Vercel
│
└── ⚙️ CONFIG
    ├── .env.local.example         # Environment template
    ├── next.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🎯 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - PostgreSQL database, Auth, Real-time
- **Cloudinary** - Image CDN & optimization
- **Row Level Security** - Built-in data protection

### Libraries
- `@supabase/supabase-js` - Supabase client
- `lucide-react` - Icons
- `react` & `react-dom` - UI framework

---

## 📖 Documentation

### Setup Guides
1. **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Complete backend setup
2. **[IMAGE_UPLOAD_GUIDE.md](IMAGE_UPLOAD_GUIDE.md)** - Image upload setup
3. **[QUICKSTART.md](QUICKSTART.md)** - Quick reference

### Deployment
4. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Vercel

---

## 🔐 Security Features

✅ Row Level Security (RLS) enabled
✅ Users can only edit their own data
✅ Email verification (configurable)
✅ Password minimum requirements
✅ HTTPS by default on Vercel
✅ Environment variables for secrets
✅ XSS protection via React
✅ CSRF tokens (Supabase handles)

---

## 💰 Pricing (Free Tier)

### Supabase Free
- 500MB database
- 1GB file storage
- 2GB bandwidth/month
- 50,000 monthly active users
- Unlimited API requests

### Cloudinary Free
- 25GB storage
- 25GB bandwidth/month
- 25 credits/month
- Free forever

### Vercel Free
- 100GB bandwidth
- Unlimited sites
- Automatic HTTPS
- Global CDN

**Total: $0/month for production-ready app! 🎉**

---

## 🧪 Testing

### Test Image Upload
```bash
npm run dev
# Visit: http://localhost:3000/test-upload
```

### Test Authentication
1. Click "Sign Up"
2. Create account with email
3. Should redirect to marketplace
4. Check Supabase dashboard for user

### Test Listings
1. Click "Sell Item"
2. Fill form & upload images
3. Submit listing
4. Check database for entry

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/svg-marketplace.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4. Click "Deploy"

**Done!** Your app is live at `https://your-app.vercel.app`

---

## 🔜 Roadmap

### Phase 1 (Current) ✅
- ✅ User authentication
- ✅ Database backend
- ✅ Image upload
- ✅ Real-time messaging
- ✅ Notifications

### Phase 2 (Next)
- [ ] Payment integration (Stripe)
- [ ] Delivery tracking
- [ ] Seller ratings & reviews
- [ ] Admin moderation panel
- [ ] Analytics dashboard

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] In-app video chat
- [ ] AI-powered price suggestions
- [ ] Dispute resolution system

---

## 🐛 Troubleshooting

### Common Issues

**"Module not found"**
```bash
npm install
```

**"Invalid Supabase key"**
- Check `.env.local` has correct keys
- Restart dev server: `npm run dev`

**Images not uploading**
- Verify Cloudinary preset is "Unsigned"
- Check cloud name is correct
- See IMAGE_UPLOAD_GUIDE.md

**Can't create listing**
- Make sure you're signed in
- Check all required fields filled
- View browser console for errors

---

## 📞 Support

- **Setup Issues**: Read SUPABASE_SETUP.md
- **Image Upload**: Read IMAGE_UPLOAD_GUIDE.md
- **Deployment**: Read DEPLOYMENT.md
- **Bugs**: Check browser console

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

## 📄 License

MIT License - Feel free to use for your own marketplace!

---

## 🎉 Success Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Cloudinary account setup
- [ ] Environment variables configured
- [ ] Dev server running
- [ ] Test account created
- [ ] Test listing posted
- [ ] Images uploading
- [ ] Messages working
- [ ] Ready to deploy!

---

**Built for Saint Vincent and the Grenadines 🇻🇨**

*Last Updated: January 2026*
