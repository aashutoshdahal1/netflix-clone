#!/bin/bash

# 🔍 Deployment Verification Script
# Run this before uploading to ensure everything is ready

echo "=================================="
echo "🔍 Verifying Build for Deployment"
echo "=================================="
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist folder not found!"
    echo "   Run: npm run build"
    exit 1
fi

echo "✅ dist folder exists"

# Check index.html
if [ -f "dist/index.html" ]; then
    echo "✅ index.html found ($(stat -f%z dist/index.html 2>/dev/null || stat -c%s dist/index.html 2>/dev/null) bytes)"
else
    echo "❌ index.html missing!"
    exit 1
fi

# Check assets folder
if [ -d "dist/assets" ]; then
    echo "✅ assets folder exists"
    asset_count=$(ls -1 dist/assets | wc -l)
    echo "   Files in assets: $asset_count"
else
    echo "❌ assets folder missing!"
    exit 1
fi

# Check for CSS file
css_file=$(ls dist/assets/*.css 2>/dev/null | head -1)
if [ -n "$css_file" ]; then
    css_size=$(stat -f%z "$css_file" 2>/dev/null || stat -c%s "$css_file" 2>/dev/null)
    echo "✅ CSS file found: $(basename "$css_file") (${css_size} bytes)"
else
    echo "❌ CSS file missing in assets!"
fi

# Check for JS file
js_file=$(ls dist/assets/*.js 2>/dev/null | head -1)
if [ -n "$js_file" ]; then
    js_size=$(stat -f%z "$js_file" 2>/dev/null || stat -c%s "$js_file" 2>/dev/null)
    echo "✅ JS file found: $(basename "$js_file") (${js_size} bytes)"
else
    echo "❌ JS file missing in assets!"
fi

# Check .htaccess in public folder
if [ -f "public/.htaccess" ]; then
    echo "✅ .htaccess found in public folder"
else
    echo "⚠️  WARNING: .htaccess not found in public folder"
fi

# Check robots.txt
if [ -f "dist/robots.txt" ]; then
    echo "✅ robots.txt found"
else
    echo "⚠️  robots.txt missing"
fi

# Check sitemap.xml
if [ -f "dist/sitemap.xml" ]; then
    echo "✅ sitemap.xml found"
else
    echo "⚠️  sitemap.xml missing"
fi

# Check watchio-logo.png
if [ -f "dist/watchio-logo.png" ]; then
    echo "✅ watchio-logo.png found"
else
    echo "⚠️  watchio-logo.png missing"
fi

echo ""
echo "=================================="
echo "📦 Files Ready for Upload:"
echo "=================================="
ls -lh dist/ | tail -n +2
echo ""
echo "Assets folder:"
ls -lh dist/assets/ | tail -n +2

echo ""
echo "=================================="
echo "📋 Upload Checklist:"
echo "=================================="
echo "1. ✓ Delete all files from public_html"
echo "2. ✓ Upload ALL files from dist/ to public_html/"
echo "3. ✓ Upload public/.htaccess to public_html/"
echo "4. ✓ Set permissions (folders: 755, files: 644)"
echo "5. ✓ Test: https://fmovies.in.net"
echo ""
echo "=================================="
echo "🎯 Ready to Deploy!"
echo "=================================="
