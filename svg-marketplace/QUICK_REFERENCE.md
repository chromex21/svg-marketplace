# 📸 Image Upload - Quick Reference Card

## 🚀 5-Minute Setup

```bash
# 1. Get Cloudinary account (free)
https://cloudinary.com → Sign Up

# 2. Create upload preset
Dashboard → Settings → Upload → Add preset
Name: svg-marketplace
Mode: Unsigned ✓

# 3. Configure
cp .env.local.example .env.local
# Edit .env.local with your Cloud Name

# 4. Test
npm run dev
Visit: localhost:3000/test-upload
```

## 📝 Usage Cheatsheet

### Import
```tsx
import ImageUpload from '@/components/ImageUpload';
```

### Basic
```tsx
<ImageUpload
  images={images}
  onImagesChange={setImages}
/>
```

### With Options
```tsx
<ImageUpload
  images={images}
  onImagesChange={setImages}
  maxImages={5}
  compress={true}
/>
```

### Form Step
```tsx
import ImageUploadStep from '@/components/ImageUploadStep';

<ImageUploadStep
  images={images}
  onImagesChange={setImages}
  onNext={() => setStep(3)}
  onBack={() => setStep(1)}
/>
```

## 🎯 Props Reference

| Prop | Type | Default | Required |
|------|------|---------|----------|
| `images` | `string[]` | - | ✓ |
| `onImagesChange` | `(urls: string[]) => void` | - | ✓ |
| `maxImages` | `number` | `5` | ✗ |
| `compress` | `boolean` | `true` | ✗ |

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=svg-marketplace
```

## 🐛 Common Errors

| Error | Fix |
|-------|-----|
| "Cloudinary not configured" | Add env vars, restart server |
| "File size exceeds 5MB" | Choose smaller file or enable compression |
| "File type not allowed" | Use JPG, PNG, WebP, or GIF |
| "Upload failed (400)" | Check preset is "Unsigned" |
| "Network error" | Check internet, retry |

## 📊 Features Checklist

- ✅ Drag & drop
- ✅ Click to upload
- ✅ Multiple files (up to 5)
- ✅ Progress tracking
- ✅ Auto-compression
- ✅ Error handling
- ✅ Retry failed
- ✅ Remove images
- ✅ Preview
- ✅ Mobile support

## 🔧 Testing

```
Visit: http://localhost:3000/test-upload

✓ Upload works
✓ Config shows green
✓ Images appear in Cloudinary
```

## 📂 File Locations

```
components/
  ├─ ImageUpload.tsx          Main component
  └─ ImageUploadStep.tsx      Form wrapper

lib/
  └─ imageUpload.ts           Core logic

app/test-upload/
  └─ page.tsx                 Test page
```

## 📚 Documentation

| Doc | Purpose |
|-----|---------|
| `IMAGE_UPLOAD_GUIDE.md` | Cloudinary setup |
| `INTEGRATION_GUIDE.md` | Add to forms |
| `IMAGE_UPLOAD_COMPLETE.md` | Feature details |
| `OVERVIEW.md` | Full overview |

## 💡 Code Examples

### Get Uploaded URLs
```tsx
const urls = images; // Already strings!
```

### Check if Images Uploaded
```tsx
const hasImages = images.length > 0;
```

### Clear All Images
```tsx
onImagesChange([]);
```

### Add Images to Existing
```tsx
onImagesChange([...images, newUrl]);
```

### Remove Specific Image
```tsx
const filtered = images.filter((_, i) => i !== indexToRemove);
onImagesChange(filtered);
```

## 🎨 Customization

### Change Max Images
```tsx
<ImageUpload maxImages={10} />
```

### Disable Compression
```tsx
<ImageUpload compress={false} />
```

### Custom Validation
```tsx
// Edit lib/imageUpload.ts
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
```

## 🚢 Deploy to Vercel

```bash
# 1. Push to GitHub
git push

# 2. Import to Vercel
vercel.com → Import

# 3. Add env vars in Vercel
Settings → Environment Variables:
  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# 4. Deploy!
```

## 📱 Mobile Support

- ✅ Touch-friendly
- ✅ Responsive grid
- ✅ Mobile file picker
- ✅ Works on iOS/Android

## 🔐 Security

- ✅ Client validation
- ✅ Size limits (5MB)
- ✅ Type whitelist
- ✅ Unsigned preset
- ✅ No API keys exposed

## 📈 Performance

**Free Tier:**
- 25GB storage
- 25GB bandwidth/month
- ~50,000 images!

**Optimized:**
- Auto-compression (~60% smaller)
- CDN delivery
- WebP format

## 🎯 Quick Troubleshooting

**Not uploading?**
→ Check env vars
→ Restart server
→ Visit /test-upload

**Slow uploads?**
→ Enable compression (default on)
→ Check file sizes

**Images don't show?**
→ Check Cloudinary dashboard
→ Verify public URLs

## 🆘 Get Help

1. Check `/test-upload` page
2. Read `IMAGE_UPLOAD_GUIDE.md`
3. Check browser console
4. Verify environment variables

## ⚡ Tips

- First image = main thumbnail
- Use good lighting
- Show multiple angles
- Be honest about defects
- Include packaging

## 🎉 Ready!

All set to upload images!

**Test**: `/test-upload`
**Integrate**: See `INTEGRATION_GUIDE.md`
**Deploy**: Push to Vercel

---

*Keep this card handy! 📌*
