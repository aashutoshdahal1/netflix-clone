# 📤 SIMPLE UPLOAD GUIDE - Follow This EXACTLY

## Your Files Are Ready ✅

Located in: `/Users/aashutoshdahal/netflix-clone/dist/`

## 🎯 WHERE to Upload

**Your hosting directory structure should look like this:**

```
fmovies.in.net (your account)
└── public_html/  ← UPLOAD HERE (root folder)
    ├── index.html
    ├── .htaccess (from public/ folder)
    ├── robots.txt
    ├── sitemap.xml
    ├── watchio-logo.png
    ├── background_banner.jpg
    ├── netflix_favicon.ico
    └── assets/  ← CREATE THIS FOLDER
        ├── index--A9X96E8.js
        ├── index-CdyaWqqZ.css
        └── logo-D4CDb0Tc.png
```

## 📋 Step-by-Step Upload (cPanel)

### 1. Clean Up Server
```
✓ Login to cPanel
✓ Open File Manager
✓ Go to public_html/
✓ Select ALL files
✓ Click Delete
✓ Confirm
```

### 2. Upload Root Files
```
✓ Click "Upload" button
✓ Select these files from YOUR COMPUTER dist/ folder:
  - index.html
  - robots.txt
  - sitemap.xml
  - watchio-logo.png
  - background_banner.jpg
  - netflix_favicon.ico
✓ Wait for upload to complete
```

### 3. Create assets Folder
```
✓ Click "New Folder"
✓ Type: assets (all lowercase)
✓ Click "Create New Folder"
```

### 4. Upload Assets
```
✓ Double-click "assets" folder to open it
✓ Click "Upload" button
✓ Select these files from YOUR COMPUTER dist/assets/ folder:
  - index--A9X96E8.js (516 KB file)
  - index-CdyaWqqZ.css (15 KB file)
  - logo-D4CDb0Tc.png (2 MB file)
✓ Wait for upload to complete
```

### 5. Upload .htaccess
```
✓ Go back to public_html/ (click "Up One Level")
✓ Click Settings (top right)
✓ Enable "Show Hidden Files (dotfiles)"
✓ Click "Save"
✓ Click "Upload"
✓ Select .htaccess from YOUR COMPUTER public/ folder
✓ Upload
```

### 6. Set Permissions
```
✓ Select "assets" folder
✓ Click "Permissions"
✓ Set to: 755
✓ Click "Change Permissions"

✓ Select ALL files (not folders)
✓ Click "Permissions"
✓ Set to: 644
✓ Click "Change Permissions"
```

## ✅ VERIFY - Test These URLs

**Open these URLs in your browser:**

### Test 1: CSS File
```
https://fmovies.in.net/assets/index-CdyaWqqZ.css
```
**Expected**: You see CSS code
**If 404**: File not uploaded or wrong location

### Test 2: JS File
```
https://fmovies.in.net/assets/index--A9X96E8.js
```
**Expected**: You see JavaScript code
**If 404**: File not uploaded or wrong location

### Test 3: Main Site
```
https://fmovies.in.net
```
**Expected**: Website loads perfectly with styles
**If broken**: Check browser console (F12)

## 🚨 Common Mistakes

### Mistake 1: Wrong Directory
```
❌ WRONG:
public_html/
└── dist/        ← NO! Don't upload dist folder itself
    └── assets/
        └── files...

✅ CORRECT:
public_html/     ← Upload CONTENTS of dist, not dist folder
└── assets/
    └── files...
```

### Mistake 2: Missing assets Folder
```
❌ WRONG:
public_html/
├── index.html
└── index--A9X96E8.js  ← Files loose in root

✅ CORRECT:
public_html/
├── index.html
└── assets/            ← Files inside assets folder
    └── index--A9X96E8.js
```

### Mistake 3: Case Sensitive
```
❌ WRONG: Assets/ (capital A)
❌ WRONG: ASSETS/ (all caps)
✅ CORRECT: assets/ (all lowercase)
```

## 🎬 Visual Check

**After upload, your cPanel File Manager should show:**

```
📁 public_html/
  📄 index.html (4.3 KB)
  📄 .htaccess (showing after enabling dotfiles)
  📄 robots.txt
  📄 sitemap.xml
  📄 watchio-logo.png
  📄 background_banner.jpg
  📄 netflix_favicon.ico
  📁 assets/
    📄 index--A9X96E8.js (516 KB)
    📄 index-CdyaWqqZ.css (15.5 KB)
    📄 logo-D4CDb0Tc.png (2.0 MB)
```

**Total files:** 10 files, 1 folder

## 📞 Still Getting 404?

### Checklist:
- [ ] Files are in `public_html/` NOT in `public_html/dist/`
- [ ] `assets` folder exists (lowercase)
- [ ] Files are INSIDE `assets/` folder
- [ ] File names match EXACTLY (including dashes)
- [ ] Permissions set correctly
- [ ] Browser cache cleared (Ctrl+Shift+Delete)

### If Everything is Correct But Still 404:

**Contact Nepal Hosting Support:**
```
Subject: Static files returning 404

I have uploaded my React application to public_html/
The files exist but return 404 errors:
- /assets/index--A9X96E8.js
- /assets/index-CdyaWqqZ.css

Files are confirmed to exist in:
public_html/assets/

Permissions are set to 644 for files, 755 for folders.

Please check if there are any server-side 
restrictions or .htaccess issues.

Domain: fmovies.in.net
```

## 💡 Pro Tip

After uploading, open browser console (F12):
- **Network tab** → Reload page
- Check failed requests
- Right-click failed request → "Copy URL"
- Paste URL in browser to test directly

This tells you EXACTLY what URL is failing.

---

**Remember**: Your build is perfect ✅  
**The issue**: Upload location or file structure ❌  
**Solution**: Follow this guide step-by-step ✓

Last Updated: December 17, 2025
Files: index--A9X96E8.js, index-CdyaWqqZ.css
