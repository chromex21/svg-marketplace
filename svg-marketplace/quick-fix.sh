# 🔧 Quick Fix Script

echo "🚀 SVG Marketplace - Quick Fix"
echo "=============================="
echo ""

# Fix 1: Check Node version
echo "✓ Checking Node.js version..."
node --version

# Fix 2: Install dependencies
echo ""
echo "✓ Installing dependencies..."
npm install

# Fix 3: Check environment file
echo ""
echo "✓ Checking environment configuration..."
if [ -f .env.local ]; then
    echo "  ✓ .env.local exists"
    
    if grep -q "your_supabase_url_here" .env.local; then
        echo "  ⚠️  WARNING: Environment variables not configured!"
        echo "     Please edit .env.local with your Supabase and Cloudinary keys"
    else
        echo "  ✓ Environment variables appear configured"
    fi
else
    echo "  ⚠️  WARNING: .env.local not found!"
    echo "     Copying from template..."
    cp .env.local.example .env.local
    echo "     Please edit .env.local with your keys"
fi

# Fix 4: Type check
echo ""
echo "✓ Running TypeScript check..."
npx tsc --noEmit

# Fix 5: Build check
echo ""
echo "✓ Testing production build..."
npm run build

echo ""
echo "=============================="
echo "✅ Quick fix complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure .env.local if not done"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo "4. Follow TESTING_GUIDE.md"
echo ""
