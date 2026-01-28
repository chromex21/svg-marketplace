# Image Upload Setup Guide

## Cloudinary Setup (Free Tier - Recommended)

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Complete registration (Free tier includes 25GB storage + 25GB bandwidth/month)

### Step 2: Get Your Credentials

1. Log into Cloudinary Dashboard
2. Note your **Cloud Name** (visible at top)
3. Go to Settings → Upload
4. Scroll to "Upload presets"
5. Click "Add upload preset"

### Step 3: Create Upload Preset

1. **Preset Name**: `svg-marketplace`
2. **Signing Mode**: Select "Unsigned"
3. **Folder**: `svg-marketplace` (optional but recommended)
4. **Access mode**: Public
5. **Image transformation**:
   - Width: 1200 (auto-scale large images)
   - Quality: auto
   - Format: auto
6. Click "Save"

### Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=svg-marketplace
```

Replace `your_actual_cloud_name` with your Cloud Name from step 2.

### Step 5: Test Upload

1. Start dev server:
```bash
npm run dev
```

2. Go to Create Listing page
3. Try uploading an image
4. Check Cloudinary Dashboard → Media Library to see uploaded images

## Features Included

✅ **Drag & Drop** - Drag images or click to upload
✅ **Multiple Images** - Up to 5 images per listing
✅ **File Validation** - Size (5MB max), type (JPG/PNG/WebP/GIF)
✅ **Auto-Compression** - Images >1MB are compressed
✅ **Progress Tracking** - Real-time upload progress
✅ **Error Handling** - Clear error messages
✅ **Retry Failed** - Retry button for failed uploads
✅ **Preview** - Instant preview of uploaded images
✅ **Reorder** - Drag to reorder (coming soon)
✅ **Remove** - Easy removal of images

## Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "No file selected" | Empty file | Select a valid image |
| "File size exceeds 5MB" | File too large | Compress or choose smaller image |
| "File type not allowed" | Wrong format | Use JPG, PNG, WebP, or GIF |
| "Cloudinary not configured" | Missing env vars | Set environment variables |
| "Network error during upload" | Connection issue | Check internet, retry |
| "Upload failed with status 400" | Invalid config | Check upload preset settings |

## Troubleshooting

### Images not uploading?

1. **Check environment variables**:
```bash
# .env.local should exist with:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

2. **Restart dev server after adding env vars**:
```bash
npm run dev
```

3. **Verify upload preset is "Unsigned"** in Cloudinary settings

4. **Check browser console** for detailed errors

### CORS errors?

Make sure your upload preset is set to "Unsigned" mode in Cloudinary.

### Images upload but don't display?

Check if the URL returned is valid by pasting it in a browser.

## Alternative: Local Storage (Development Only)

For development without Cloudinary, images can use:
- Data URLs (base64 - not recommended for production)
- Local file paths (development only)
- Mock URLs for testing

## Production Deployment

### Vercel

Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
3. Redeploy

### Security Notes

- ✅ Upload preset is unsigned (safe for client-side)
- ✅ File validation happens before upload
- ✅ Cloudinary rate limits prevent abuse
- ✅ Folder isolation keeps marketplace images organized
- ⚠️ Consider adding backend validation for production
- ⚠️ Monitor Cloudinary usage via dashboard

## Limits

### Free Tier (Cloudinary)
- 25GB storage
- 25GB bandwidth/month
- 25 credits/month (transformations)
- Usually sufficient for small marketplaces

### Paid Upgrade
If you exceed limits:
- Plus: $89/month (78GB storage, 140GB bandwidth)
- Advanced: Custom pricing

### Our Implementation
- Max 5 images per listing
- Auto-compression reduces storage
- Optimized transformations save credits

## Cost Estimation

Assuming:
- Average image: 500KB compressed
- 100 listings/month
- Each viewed 10 times

**Storage**: 100 listings × 5 images × 0.5MB = 250MB (1% of free tier)
**Bandwidth**: 500 views × 5 images × 0.5MB = 1.25GB (5% of free tier)

You can handle **thousands of listings** on free tier! 🎉
