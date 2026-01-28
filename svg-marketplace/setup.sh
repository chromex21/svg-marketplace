#!/bin/bash

# SVG Marketplace - Image Upload Setup Script

echo "🚀 SVG Marketplace - Image Upload Setup"
echo "========================================"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✓ .env.local found"
else
    echo "⚠️  .env.local not found"
    echo "Creating .env.local from example..."
    
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo "✓ Created .env.local"
        echo ""
        echo "📝 IMPORTANT: Edit .env.local and add your Cloudinary credentials:"
        echo "   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
        echo "   - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"
        echo ""
    else
        echo "❌ .env.local.example not found!"
        exit 1
    fi
fi

# Check if node_modules exists
if [ -d node_modules ]; then
    echo "✓ Dependencies installed"
else
    echo "📦 Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
fi

echo ""
echo "🎯 Setup Checklist:"
echo ""
echo "1. Cloudinary Account"
echo "   → Create at https://cloudinary.com (free)"
echo ""
echo "2. Upload Preset"
echo "   → Settings → Upload → Add upload preset"
echo "   → Name: svg-marketplace"
echo "   → Mode: Unsigned"
echo ""
echo "3. Environment Variables"
echo "   → Edit .env.local with your credentials"
echo ""
echo "4. Test Upload"
echo "   → npm run dev"
echo "   → Visit http://localhost:3000/test-upload"
echo ""
echo "📚 Full guide: IMAGE_UPLOAD_GUIDE.md"
echo ""
echo "Ready to start? Run: npm run dev"
