# 🚨 Vercel Deployment Troubleshooting

## Common Error: NOT_FOUND (404)

### Symptoms:
- ✅ Works perfectly at `localhost:3000`
- ❌ Vercel shows blank page or 404
- ❌ Deployment succeeds but app crashes
- ❌ Browser console shows "undefined" errors

---

## Root Cause:

**Missing Environment Variables!**

Your `.env.local` file is intentionally excluded from Git (security best practice), so Vercel doesn't have your Supabase/Cloudinary credentials.

---

## ✅ Fix (5 minutes):

### Step 1: Add Environment Variables in Vercel

1. Go to https://vercel.com → Your Project
2. Click **Settings** → **Environment Variables**
3. Add these 4 variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://qozpjzjkejfvixvqtiku.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_cH7A0XIWnSU11MXYX1XllQ_SOTiHB5z
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = svg-marketplace
```

4. **Important:** Select **Production**, **Preview**, and **Development** for each

### Step 2: Redeploy

After adding variables, you MUST redeploy:

**Option A: In Vercel Dashboard**
- Go to **Deployments** tab
- Click **"Redeploy"** on latest deployment

**Option B: Git Push**
```powershell
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### Step 3: Verify

Visit your Vercel URL and check:
- ✅ No 404 errors
- ✅ Sign in/up works
- ✅ Can browse listings
- ✅ No console errors

---

## Why This Happens:

### The Environment Variable Flow:

**Local Development:**
```
Code → Reads .env.local → Has all credentials → Works ✅
```

**Vercel (before adding env vars):**
```
Code → No .env.local → undefined values → Crashes ❌
```

**Vercel (after adding env vars):**
```
Code → Reads Vercel env vars → Has credentials → Works ✅
```

---

## Prevention Checklist:

Before deploying to ANY platform:

- [ ] Document all env vars needed
- [ ] Add env vars to deployment platform
- [ ] Test build locally: `npm run build`
- [ ] Verify no hardcoded secrets
- [ ] Check `.gitignore` includes `.env*.local`

---

## Other Common Deployment Issues:

### Issue: Build Fails

**Symptom:** Deployment fails during build
**Fix:** Check build logs for TypeScript errors
```powershell
# Test locally first:
npm run build
```

### Issue: API Calls Fail

**Symptom:** App loads but features don't work
**Fix:** Check Supabase URL/key are correct in Vercel

### Issue: Images Don't Load

**Symptom:** Broken image icons
**Fix:** 
1. Check Cloudinary credentials
2. Verify `next.config.js` has correct domains

---

## Environment Variable Best Practices:

### ✅ DO:
- Use `.env.local` for local development
- Add to `.gitignore`
- Prefix public vars with `NEXT_PUBLIC_`
- Document required vars in README

### ❌ DON'T:
- Commit `.env` files to Git
- Hardcode secrets in code
- Share keys in public channels
- Use same keys for dev/prod

---

## Quick Reference:

### Your Environment Variables:

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Database connection | Auth, Listings, Messages |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Database auth | All Supabase calls |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Image storage | Upload component |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Upload config | Image uploads |

### Need to Update Credentials?

1. Update in Vercel → Settings → Environment Variables
2. Click **"Redeploy"** to apply changes
3. Don't forget to update `.env.local` for local dev

---

## Still Having Issues?

### Debug Steps:

1. **Check Vercel Build Logs:**
   - Deployments → Click deployment → View logs
   - Look for "Error:" or "undefined"

2. **Check Browser Console:**
   - F12 → Console tab
   - Look for network errors

3. **Verify Environment Variables:**
   - Settings → Environment Variables
   - All 4 should be present
   - Check for typos in names

4. **Test Locally:**
   ```powershell
   npm run build
   npm start
   ```
   If this fails, fix local issues first

---

**Remember:** Vercel rebuilds your app from scratch. It needs the same environment variables your local `.env.local` provides!
