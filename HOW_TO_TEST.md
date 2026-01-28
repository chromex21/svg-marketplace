# 🎯 How to Test SVG Marketplace for Errors

**Quick Start Guide** | Last Updated: January 26, 2026

---

## 🚀 Quick Test (5 Minutes)

### Step 1: Setup Environment
```bash
# Windows
quick-fix.bat

# Mac/Linux
chmod +x quick-fix.sh
./quick-fix.sh
```

### Step 2: Configure Keys (If Not Done)
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=svg-marketplace
```

### Step 3: Start Server
```bash
npm run dev
```

### Step 4: Open Browser
Go to: `http://localhost:3000`

### Step 5: Quick Smoke Test
- [ ] Page loads without errors
- [ ] Can click "Sign Up"
- [ ] Form appears
- [ ] Can browse listings (if any)
- [ ] No red errors in browser console (F12)

**✅ If all pass → Continue to full testing**
**❌ If any fail → Check MAINTENANCE_REPORT.md**

---

## 🔍 Full Test (30 Minutes)

### Priority 1: Critical Features
**Must work for app to be functional**

1. **Authentication** (5 min)
   ```
   □ Sign up with test account
   □ Sign out
   □ Sign back in
   □ Profile data persists
   ```

2. **Create Listing** (5 min)
   ```
   □ Click "Sell Item"
   □ Fill all 3 steps
   □ Upload image (test with <5MB JPG)
   □ Submit successfully
   □ Listing appears in "My Listings"
   ```

3. **View Listings** (5 min)
   ```
   □ Browse shows listings
   □ Click listing opens details
   □ Images display
   □ Contact buttons work (WhatsApp/Call)
   ```

### Priority 2: Important Features
**Should work for good UX**

4. **Search & Filters** (3 min)
   ```
   □ Search by keyword
   □ Filter by category
   □ Filter by location
   □ Filter by price range
   ```

5. **Messaging** (5 min)
   ```
   □ Send message to listing
   □ Check notifications
   □ Reply to message
   □ Conversation preserved
   ```

6. **Favorites** (2 min)
   ```
   □ Click heart on listing
   □ Go to favorites section
   □ Unfavorite item
   ```

### Priority 3: Nice-to-Have
**Good if working, not critical**

7. **Mobile** (3 min)
   ```
   □ Open on phone browser
   □ Layout responsive
   □ Bottom nav works
   □ Can create listing on mobile
   ```

8. **Notifications** (2 min)
   ```
   □ Check notifications tab
   □ Mark as read
   □ Badge updates
   ```

---

## 🐛 Common Errors & Fixes

### Error: "Supabase client not configured"
**Fix:**
1. Check `.env.local` has correct keys
2. Restart dev server: `npm run dev`
3. Verify keys in Supabase dashboard

### Error: "Failed to upload image"
**Fix:**
1. Check Cloudinary preset is "Unsigned"
2. Verify cloud name correct
3. Test at `/test-upload` page
4. Check file is <5MB and JPG/PNG/WebP

### Error: "Module not found"
**Fix:**
```bash
rm -rf node_modules
npm install
```

### Error: "Can't create listing"
**Fix:**
1. Make sure you're signed in
2. Fill all required fields
3. Check browser console for specific error
4. Verify Supabase connection

### Error: "Messages not appearing"
**Fix:**
1. Check Supabase RLS policies enabled
2. Run schema.sql again
3. Verify auth working
4. Check browser console

---

## ✅ Success Checklist

**Minimum to Deploy:**
- [ ] Users can sign up/in
- [ ] Users can create listings with images
- [ ] Listings display on browse page
- [ ] Contact buttons work
- [ ] No critical console errors
- [ ] Mobile layout doesn't break

**Full Feature Set:**
- [ ] All minimum features ✓
- [ ] Search and filters work
- [ ] Messaging functions
- [ ] Notifications deliver
- [ ] Favorites work
- [ ] Performance acceptable (<3s load)

---

## 📊 Where to Check for Errors

### 1. Browser Console (Primary)
- Press `F12` or `Ctrl+Shift+I`
- Click "Console" tab
- Look for red errors

**Common Issues:**
- Network errors → Supabase/Cloudinary config
- Type errors → Code issues
- CORS errors → Next.js config

### 2. Network Tab
- Press `F12` → "Network" tab
- Look for failed requests (red)
- Check API call responses

### 3. Supabase Dashboard
- Go to your project dashboard
- Check "Table Editor" for data
- Check "Authentication" for users
- Check "Logs" for errors

### 4. Terminal/Command Prompt
- Watch dev server output
- Look for compilation errors
- Check for warnings

---

## 📁 Testing Resources

### Detailed Guides
- **TESTING_GUIDE.md** - Comprehensive testing (all phases)
- **MAINTENANCE_REPORT.md** - Known issues & fixes
- **SUPABASE_SETUP.md** - Backend configuration
- **IMAGE_UPLOAD_GUIDE.md** - Image upload setup

### Quick References
- **QUICKSTART.md** - Fast setup
- **README.md** - Project overview
- **DEPLOYMENT.md** - Deploy guide

---

## 🎓 Testing Order (Recommended)

**For New Setup:**
1. Run quick-fix script
2. Configure environment
3. Test authentication first
4. Then test create listing
5. Then test browsing
6. Finally test messaging/favorites

**For Bug Hunting:**
1. Check browser console first
2. Then check network tab
3. Then check Supabase dashboard
4. Then check code

**For Pre-Deployment:**
1. Run full test suite (TESTING_GUIDE.md)
2. Test on mobile
3. Check performance
4. Verify security
5. Do final build: `npm run build`

---

## 💡 Testing Tips

1. **Use Incognito Mode**
   - Fresh state for each test
   - No cached data interference

2. **Test with Multiple Accounts**
   - Create 2-3 test accounts
   - Test user interactions
   - Verify privacy/security

3. **Test Different Data**
   - Various listing types
   - Different image sizes
   - Long/short descriptions
   - Edge cases (empty, max values)

4. **Document Issues**
   - Take screenshots
   - Note steps to reproduce
   - Record error messages
   - Check browser/OS

5. **Test Incrementally**
   - Fix one issue at a time
   - Retest after each fix
   - Don't skip steps

---

## 🚨 Critical Test Failures

**If these fail, DO NOT deploy:**
- ❌ Users can't sign up/in
- ❌ Can't create listings
- ❌ Images don't upload
- ❌ Database not saving data
- ❌ Critical console errors
- ❌ Build fails

**Fix these before proceeding!**

---

## ✅ Ready to Deploy?

**Before deploying, verify:**
- [ ] All critical tests pass
- [ ] No console errors
- [ ] Build succeeds: `npm run build`
- [ ] Environment variables ready for production
- [ ] Tested on mobile
- [ ] Supabase RLS policies enabled
- [ ] Images uploading correctly

**If all checked → Follow DEPLOYMENT.md**

---

## 📞 Need Help?

**Check in this order:**
1. Browser console errors
2. MAINTENANCE_REPORT.md
3. TESTING_GUIDE.md (detailed)
4. Setup guides (SUPABASE_SETUP.md, etc.)
5. Supabase/Cloudinary dashboards

**Still stuck?**
- Clear cache and restart
- Try different browser
- Check Node.js version (18+)
- Reinstall dependencies

---

## 🎉 Testing Complete?

**Next Steps:**
1. Fix any found issues
2. Retest after fixes
3. Run production build
4. Deploy to Vercel
5. Test production URL
6. Monitor for errors

**Congratulations on thorough testing! 🚀**

---

*Remember: Good testing prevents production issues!*
