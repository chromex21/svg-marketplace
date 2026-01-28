# 🧪 Complete Testing Guide for SVG Marketplace

**Last Updated:** January 26, 2026

---

## 📋 Pre-Test Checklist

Before running any tests, ensure:

- [ ] Node.js 18+ installed: `node --version`
- [ ] Dependencies installed: `npm install`
- [ ] Environment variables configured in `.env.local`
- [ ] Supabase project created and schema executed
- [ ] Cloudinary account configured
- [ ] Dev server can start: `npm run dev`

---

## 🚀 Phase 1: Environment Setup Testing

### Test 1.1: Verify Dependencies
```bash
# Check all packages installed correctly
npm list

# Expected: No errors, all packages resolved
# If errors: run npm install --legacy-peer-deps
```

**✅ Pass Criteria:** No unmet dependencies

---

### Test 1.2: Environment Variables
```bash
# Check environment file exists
cat .env.local  # Linux/Mac
type .env.local  # Windows

# Verify all required keys present:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

**✅ Pass Criteria:** All 4 variables set with real values (not placeholders)

---

### Test 1.3: TypeScript Compilation
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Expected: No errors
# If errors: Fix type issues before proceeding
```

**✅ Pass Criteria:** "Compilation complete" with no errors

---

## 🏗️ Phase 2: Build Testing

### Test 2.1: Development Build
```bash
# Start dev server
npm run dev

# Expected output:
# ✓ Ready in Xms
# ○ Local: http://localhost:3000
```

**✅ Pass Criteria:** Server starts without errors

**🐛 Common Issues:**
- **Port 3000 in use:** Run `npm run dev -- -p 3001`
- **Module not found:** Run `npm install`
- **Supabase error:** Check `.env.local` keys

---

### Test 2.2: Production Build
```bash
# Build for production
npm run build

# Expected: Build completes successfully
# Check for warnings about:
# - Missing environment variables
# - Large bundle sizes
# - Unused dependencies
```

**✅ Pass Criteria:** Build completes with "Compiled successfully"

**⚠️ Warnings are OK, Errors are NOT**

---

## 🌐 Phase 3: Browser Testing

### Test 3.1: Initial Page Load
**URL:** `http://localhost:3000`

**Steps:**
1. Open browser (Chrome, Firefox, Safari)
2. Navigate to localhost:3000
3. Open DevTools Console (F12)

**✅ Pass Criteria:**
- Page loads in < 3 seconds
- No console errors (red text)
- Loading spinner appears then disappears
- Marketplace UI visible

**🐛 Check Console For:**
- `Supabase client not configured` → Check env vars
- `Failed to fetch` → Check Supabase URL
- `localStorage is not defined` → SSR issue (should be fixed)

---

### Test 3.2: Authentication Flow

#### Test 3.2.1: Sign Up
**Steps:**
1. Click "Sign Up" or auth button
2. Fill in form:
   - Email: `test@example.com`
   - Password: `test123456`
   - Full Name: `Test User`
   - WhatsApp: `+1758-555-0123`
   - Phone: `+1758-555-0123`
   - Location: Select any
   - Parish: Select any
3. Click "Create Account"

**✅ Pass Criteria:**
- No validation errors
- Loading state shows
- Redirects to marketplace
- User appears in Supabase dashboard

**🐛 Common Failures:**
- **"Invalid email"** → Check email format
- **"Password too short"** → Min 6 characters
- **"User already exists"** → Use different email
- **Network error** → Check Supabase URL/key

---

#### Test 3.2.2: Sign Out
**Steps:**
1. Click profile/user menu
2. Click "Sign Out"

**✅ Pass Criteria:**
- User logged out
- Returns to browse page
- Auth modal available again

---

#### Test 3.2.3: Sign In
**Steps:**
1. Click "Sign In"
2. Enter previous credentials
3. Click "Sign In"

**✅ Pass Criteria:**
- Logs in successfully
- User data persists
- Can access protected features

---

### Test 3.3: Browse Listings

**Steps:**
1. View homepage
2. Scroll through listings (if any)
3. Use search bar
4. Try filters (category, location, price)

**✅ Pass Criteria:**
- Listings display in grid
- Images load properly
- Search returns relevant results
- Filters work correctly
- No infinite loading

**🐛 Check For:**
- Broken images → Check Cloudinary config
- No listings → Create test listing first
- Filters don't work → Check Supabase query logic

---

### Test 3.4: Create Listing

#### Step 1: Basic Info
**Steps:**
1. Click "Sell Item" or "Create Listing"
2. Select listing type (Regular/Business/Wholesale)
3. Fill in:
   - Title: "Test iPhone 13"
   - Price: 2000
   - Condition: Like New
   - Category: iPhones
   - Description: "Test listing description"
4. Click "Next"

**✅ Pass Criteria:**
- All fields accept input
- Required field validation works
- Advances to step 2

---

#### Step 2: Specifications
**Steps:**
1. Add specs:
   - Key: "Storage", Value: "256GB"
   - Key: "Color", Value: "Blue"
2. Click "Next"

**✅ Pass Criteria:**
- Specs added to list
- Can remove specs
- Advances to step 3

---

#### Step 3: Images & Contact
**Steps:**
1. Upload image:
   - Click or drag image
   - Wait for upload
2. Fill contact info:
   - Should auto-fill from profile
   - Or enter manually
3. Click "Publish Listing"

**✅ Pass Criteria:**
- Image uploads successfully
- Progress bar shows
- Preview displays
- Form submits
- Redirects to "My Listings"
- New listing visible

**🐛 Common Issues:**
- **Upload fails** → Check Cloudinary preset
- **Upload stuck** → Check file size (<5MB)
- **Invalid format** → Only JPG, PNG, WebP
- **Submit fails** → Check Supabase auth

---

### Test 3.5: View Listing Detail

**Steps:**
1. Click any listing
2. View full details
3. Navigate image gallery (if multiple)
4. Click WhatsApp/Call buttons

**✅ Pass Criteria:**
- All details display correctly
- Images navigate properly
- Price alerts show (if applicable)
- Seller info visible
- Contact buttons work (opens WhatsApp/dialer)

---

### Test 3.6: My Listings Management

**Steps:**
1. Go to "My Listings" tab
2. View your listings
3. Try actions:
   - Edit
   - Renew
   - Mark as Sold
   - Delete (be careful!)

**✅ Pass Criteria:**
- Lists your listings only
- Shows correct stats (views, favorites, days left)
- Actions work without errors
- Updates reflected immediately

---

### Test 3.7: Messaging System

**Steps:**
1. Sign in with second account (different browser/incognito)
2. Message a listing from first account
3. Check first account for message notification
4. Reply to message
5. Verify conversation thread

**✅ Pass Criteria:**
- Message sends successfully
- Notification appears
- Real-time updates work
- Conversation history preserved
- Unread count accurate

**🐛 Common Issues:**
- **Messages don't appear** → Check Supabase RLS
- **No real-time** → Check subscription setup
- **Can't send** → Verify authentication

---

### Test 3.8: Notifications

**Steps:**
1. Check notifications tab
2. Verify types:
   - Expiring listings
   - New messages
   - View milestones (if any)
3. Mark as read
4. Check unread badge

**✅ Pass Criteria:**
- Notifications display
- Read/unread status works
- Badge count accurate
- Clicking navigates correctly

---

### Test 3.9: Favorites

**Steps:**
1. Browse listings
2. Click heart icon to favorite
3. Go to favorites section
4. Unfavorite item

**✅ Pass Criteria:**
- Favorite toggles work
- Count updates
- Favorites list displays
- Remove from favorites works

---

## 📱 Phase 4: Mobile Testing

### Test 4.1: Responsive Design
**Devices to Test:**
- iPhone (iOS Safari)
- Android (Chrome)
- Tablet

**Steps:**
1. Open on mobile browser
2. Test all features from Phase 3
3. Check bottom navigation
4. Verify touch interactions

**✅ Pass Criteria:**
- Layout adapts properly
- Bottom nav accessible
- Forms easy to fill
- Images display correctly
- No horizontal scroll

---

### Test 4.2: Touch Interactions
**Check:**
- [ ] Buttons large enough to tap
- [ ] Swipe gestures work (if any)
- [ ] Image gallery swipes
- [ ] Forms keyboard-friendly
- [ ] No accidental clicks

---

## 🔍 Phase 5: Database Testing

### Test 5.1: Verify Data in Supabase

**Steps:**
1. Go to Supabase Dashboard
2. Open Table Editor
3. Check tables:

**profiles:**
- [ ] Your user profile exists
- [ ] Contact info correct
- [ ] Location/parish saved

**listings:**
- [ ] Test listing exists
- [ ] All fields populated
- [ ] Images array has URLs
- [ ] User_id matches your user

**messages:**
- [ ] Messages saved (if tested)
- [ ] Sender/receiver correct
- [ ] Timestamps accurate

**favorites:**
- [ ] Favorites recorded
- [ ] Correct user_id and listing_id

**notifications:**
- [ ] Notifications created
- [ ] Types correct
- [ ] Read status updating

**✅ Pass Criteria:** All data persists correctly

---

### Test 5.2: Row Level Security

**Steps:**
1. Sign in as User A
2. Create listing
3. Note listing ID
4. Sign out, sign in as User B
5. Try to edit User A's listing (should fail)

**✅ Pass Criteria:**
- Users can only edit their own data
- Other users' data visible but not editable
- No unauthorized access

---

## ⚡ Phase 6: Performance Testing

### Test 6.1: Page Load Speed
**Tool:** Chrome DevTools > Network tab

**Steps:**
1. Clear cache
2. Hard reload (Ctrl+Shift+R)
3. Check metrics:

**✅ Pass Criteria:**
- Initial load: < 3 seconds
- Images: < 2 seconds
- Time to Interactive: < 4 seconds

---

### Test 6.2: Image Optimization
**Check:**
- [ ] Images compressed (< 500KB each)
- [ ] Lazy loading works
- [ ] No layout shift (CLS)
- [ ] WebP format served (if supported)

---

### Test 6.3: Bundle Size
```bash
npm run build

# Check .next/static/chunks output
# Look for warnings about large bundles
```

**✅ Target:** Main bundle < 200KB gzipped

---

## 🔒 Phase 7: Security Testing

### Test 7.1: XSS Prevention
**Steps:**
1. Try entering HTML/script in form fields:
   ```
   <script>alert('XSS')</script>
   ```
2. Submit and view listing

**✅ Pass Criteria:** Script tags escaped/sanitized

---

### Test 7.2: Authentication
**Test:**
- [ ] Can't access profile data without login
- [ ] Can't create listings without login
- [ ] Session persists across refreshes
- [ ] Sign out clears session

---

### Test 7.3: API Keys
**Verify:**
- [ ] Keys not in source code
- [ ] `.env.local` in `.gitignore`
- [ ] Keys not exposed in browser Network tab

---

## 🐛 Phase 8: Error Handling

### Test 8.1: Network Errors
**Steps:**
1. Open DevTools > Network tab
2. Set throttling to "Offline"
3. Try actions (create listing, etc.)

**✅ Pass Criteria:**
- Appropriate error messages
- No app crash
- Retry mechanisms work

---

### Test 8.2: Invalid Data
**Try:**
- [ ] Invalid email format
- [ ] Empty required fields
- [ ] Price as text
- [ ] Negative numbers
- [ ] Very long text (> 10,000 chars)

**✅ Pass Criteria:** Validation catches all invalid inputs

---

### Test 8.3: Edge Cases
**Test:**
- [ ] Listing with no images
- [ ] User with no listings
- [ ] Empty search results
- [ ] Expired listings
- [ ] Simultaneous edits (two users)

---

## 📊 Test Results Template

```markdown
## Test Run: [Date]

### Environment
- Node Version: 
- Browser: 
- OS: 

### Results
✅ Phase 1: Setup - PASS/FAIL
✅ Phase 2: Build - PASS/FAIL
✅ Phase 3: Browser - PASS/FAIL
✅ Phase 4: Mobile - PASS/FAIL
✅ Phase 5: Database - PASS/FAIL
✅ Phase 6: Performance - PASS/FAIL
✅ Phase 7: Security - PASS/FAIL
✅ Phase 8: Errors - PASS/FAIL

### Issues Found
1. [Issue description]
   - Severity: Critical/High/Medium/Low
   - Location: [File/Component]
   - Fix: [Solution]

### Notes
[Any additional observations]
```

---

## 🚨 Critical Failure Checklist

If tests fail, check in this order:

1. **Environment Variables**
   ```bash
   cat .env.local
   # All keys present and valid?
   ```

2. **Supabase Connection**
   ```bash
   # Test in browser console:
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```

3. **Database Schema**
   - Re-run schema.sql in Supabase
   - Check all tables exist
   - Verify RLS policies enabled

4. **Cloudinary Config**
   - Preset is "Unsigned"
   - Cloud name correct
   - Test at /test-upload page

5. **Import Paths**
   - All components resolve
   - No circular dependencies
   - Relative paths correct

6. **Browser Console**
   - Check for errors
   - Read stack traces
   - Look for network failures

---

## 🎯 Success Criteria Summary

### Minimum Viable Product (MVP)
- [ ] Users can sign up/in
- [ ] Users can create listings
- [ ] Images upload successfully
- [ ] Listings display on browse page
- [ ] Search works
- [ ] Contact buttons work

### Full Feature Set
- [ ] All MVP features
- [ ] Real-time messaging works
- [ ] Notifications delivered
- [ ] Favorites function
- [ ] My Listings management
- [ ] Mobile responsive
- [ ] No critical errors
- [ ] Performance acceptable

---

## 📞 Getting Help

**If tests fail:**
1. Check MAINTENANCE_REPORT.md for known issues
2. Review error messages carefully
3. Check browser console
4. Verify Supabase dashboard
5. Check Cloudinary dashboard
6. Review setup guides:
   - SUPABASE_SETUP.md
   - IMAGE_UPLOAD_GUIDE.md

**Still stuck?**
- Verify all prerequisites met
- Try fresh install: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)
- Clear browser cache
- Try different browser

---

## 📝 Testing Checklist (Quick Reference)

Copy and check off as you test:

```
Environment Setup
□ Dependencies installed
□ Environment variables set
□ TypeScript compiles
□ Dev server starts
□ Production builds

Authentication
□ Sign up works
□ Sign in works
□ Sign out works
□ Profile created

Listings
□ Browse listings
□ Create listing
□ Upload images
□ View details
□ Edit/Delete

Features
□ Search works
□ Filters work
□ Messaging works
□ Notifications work
□ Favorites work

Technical
□ Mobile responsive
□ No console errors
□ Data persists
□ RLS working
□ Performance good

Ready to Deploy!
```

---

**Happy Testing! 🧪✅**

*Remember: Testing is iterative. Fix issues as you find them and retest.*
