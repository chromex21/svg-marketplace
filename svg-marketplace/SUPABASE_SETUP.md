# 🚀 Supabase Backend Integration Guide

## Overview

Complete backend integration with:
- ✅ User authentication (email/password)
- ✅ Real-time messaging
- ✅ Database persistence
- ✅ User profiles
- ✅ Notifications
- ✅ Favorites system

---

## 🎯 Step 1: Create Supabase Project (5 minutes)

### 1.1 Sign Up
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub

### 1.2 Create Project
1. Click "New Project"
2. Choose organization (or create one)
3. Fill in details:
   - **Name**: `svg-marketplace`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to SVG (US East recommended)
4. Click "Create new project"
5. Wait 2-3 minutes for setup

---

## 🗄️ Step 2: Setup Database (3 minutes)

### 2.1 Run Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `lib/supabase/schema.sql`
4. Paste into query editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see: "Success. No rows returned"

### 2.2 Verify Tables
1. Go to **Table Editor**
2. You should see these tables:
   - `profiles`
   - `listings`
   - `messages`
   - `conversations`
   - `favorites`
   - `notifications`

---

## 🔑 Step 3: Get API Keys (1 minute)

### 3.1 Find Keys
1. Go to **Project Settings** (gear icon)
2. Click **API** in sidebar
3. You'll see two keys:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### 3.2 Add to Environment
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local`:
   ```env
   # Cloudinary (if using image upload)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=svg-marketplace

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_key_here
   ```

3. **IMPORTANT**: Restart your dev server:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

---

## ✅ Step 4: Test Integration (2 minutes)

### 4.1 Test Authentication
1. Open app: `http://localhost:3000`
2. Click "Sign Up" or "Sign In" button
3. Create test account:
   - Email: `test@example.com`
   - Password: `test123`
   - Fill in profile details
4. Should redirect to marketplace

### 4.2 Test Listings
1. Click "Sell Item" or "Create Listing"
2. Fill in listing details
3. Submit
4. Should appear in Browse section

### 4.3 Check Database
1. Go to Supabase **Table Editor**
2. Click `profiles` - should see your user
3. Click `listings` - should see your listing

---

## 🎨 What Changed in the App

### New Features
- ✅ **Sign In/Sign Up** - Full authentication flow
- ✅ **User Profiles** - Stored in database
- ✅ **Real Listings** - Saved to Supabase
- ✅ **Real Messages** - Live messaging system
- ✅ **Favorites** - Save listings
- ✅ **Notifications** - Real-time alerts
- ✅ **Data Persistence** - No more localStorage!

### Updated Components
- `MarketplaceClient.tsx` - Now uses Supabase
- Added `AuthModal.tsx` - Sign in/up
- Added `AuthProvider.tsx` - Auth context
- Added Supabase services layer

---

## 🔐 Security (Already Configured!)

### Row Level Security (RLS)
- ✅ Users can only edit their own listings
- ✅ Users can only see their own messages
- ✅ Users can only update their own profile
- ✅ Public listings visible to everyone

### Data Validation
- ✅ Required fields enforced
- ✅ Valid email format
- ✅ Password minimum 6 chars
- ✅ Phone/WhatsApp required

---

## 📊 Free Tier Limits (More Than Enough!)

Supabase Free Tier includes:
- ✅ **500MB database** (~100,000 listings)
- ✅ **1GB file storage** (for future features)
- ✅ **2GB bandwidth** (plenty for API calls)
- ✅ **50,000 monthly active users**
- ✅ **Unlimited API requests**
- ✅ **Real-time subscriptions** (100 concurrent)
- ✅ **Social auth** (Google, Facebook, etc.)

Perfect for a marketplace! 🎉

---

## 🚀 Next Steps (Optional)

### Email Configuration
Currently using Supabase's test SMTP. To send real emails:

1. Go to **Authentication** > **Email Templates**
2. Configure SMTP (use SendGrid, Mailgun, etc.)
3. Customize email templates

### Social Login
Enable Google/Facebook login:

1. Go to **Authentication** > **Providers**
2. Enable desired provider
3. Add OAuth credentials
4. Update AuthModal to include social buttons

### Storage for Images
Currently using Cloudinary. To use Supabase Storage:

1. Go to **Storage**
2. Create bucket: `listing-images`
3. Update upload logic to use Supabase Storage

---

## 🐛 Troubleshooting

### "Invalid API key"
- ✅ Check `.env.local` has correct keys
- ✅ Restart dev server after changing env vars
- ✅ Make sure keys don't have extra spaces

### "Row Level Security policy violation"
- ✅ Make sure you're signed in
- ✅ Check schema.sql was run completely
- ✅ Verify policies in Supabase dashboard

### Tables not created
- ✅ Re-run schema.sql
- ✅ Check SQL Editor for error messages
- ✅ Make sure project is fully initialized

### Can't sign up
- ✅ Check email is valid format
- ✅ Password is at least 6 characters
- ✅ All required fields filled
- ✅ Check browser console for errors

---

## 📁 File Structure

```
svg-marketplace/
├── lib/
│   └── supabase/
│       ├── client.ts          # ✨ Supabase client
│       ├── types.ts           # ✨ TypeScript types
│       ├── schema.sql         # ✨ Database schema
│       └── services.ts        # ✨ API functions
├── components/
│   └── auth/
│       ├── AuthModal.tsx      # ✨ Sign in/up modal
│       └── AuthProvider.tsx   # ✨ Auth context
└── .env.local                 # Your API keys

✨ = New files
```

---

## 🎓 Learn More

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time](https://supabase.com/docs/guides/realtime)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

## 💡 Tips

1. **Development**:
   - Use `.env.local` for local dev
   - Add to Vercel/production separately

2. **Testing**:
   - Create test accounts with +tag emails
   - Example: `yourname+test1@gmail.com`

3. **Security**:
   - Never commit `.env.local` to Git
   - Use different keys for prod/dev
   - Enable 2FA on Supabase account

4. **Performance**:
   - Indexes already added in schema
   - Use filters to limit data fetched
   - Cache user profile data

---

## ✅ Checklist

- [ ] Created Supabase project
- [ ] Ran schema.sql successfully
- [ ] Added API keys to `.env.local`
- [ ] Restarted dev server
- [ ] Created test account
- [ ] Created test listing
- [ ] Verified data in Supabase dashboard
- [ ] Ready to deploy! 🚀

---

**Status: COMPLETE & READY TO USE! 🎉**

*Last Updated: January 2026*
