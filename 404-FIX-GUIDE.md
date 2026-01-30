# 🔧 Fixing 404 Errors on Nepal Hosting

## Current Errors:
```
❌ Failed to load: index-CdyaWqqZ.css (404)
❌ Failed to load: index--A9X96E8.js (404)
❌ ReferenceError: aclib is not defined
```

## ✅ Solutions Applied:

### 1. Commented Out aclib Script
The aclib error is now fixed in `index.html`.

### 2. For 404 Errors - Check Your Server Setup

## 🔍 Diagnosis: Why 404 Errors Happen

The 404 errors mean your server can't find the CSS/JS files. This usually happens because:

1. **Files not uploaded** - Assets folder missing
2. **Wrong location** - Files in subdirectory instead of root
3. **Wrong permissions** - Server can't read files
4. **htaccess not working** - Path rewriting issues

## 📋 Step-by-Step Fix

### Step 1: Verify File Structure on Server

Your server should have this EXACT structure:

```
public_html/  (or www/)
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── watchio-logo.png
└── assets/
    ├── index-CdyaWqqZ.css  ← THIS FILE
    ├── index--A9X96E8.js   ← THIS FILE
    └── logo-D4CDb0Tc.png
```

### Step 2: Check Common Issues

#### Issue A: Files in Wrong Directory
**Problem**: Files uploaded to subdirectory like `public_html/fmovies/`
**Solution**: Move ALL files to ROOT `public_html/`

#### Issue B: assets/ Folder Not Uploaded
**Problem**: Only index.html uploaded, no assets folder
**Solution**: Re-upload entire `dist` folder contents

#### Issue C: Wrong Permissions
**Problem**: Server can't read files (permission denied)
**Solution**: Set permissions:
- Folders: 755
- Files: 644

#### Issue D: .htaccess Not Working
**Problem**: Apache not reading .htaccess
**Solution**: See Step 3 below

### Step 3: Fix .htaccess Issues

If .htaccess is not working, try this simpler version:

```apache
# Simple .htaccess for React Router
RewriteEngine On
RewriteBase /

# Don't rewrite files or directories
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

Or if that doesn't work, try WITHOUT URL rewriting:

```apache
# Minimal .htaccess (if mod_rewrite is disabled)
Options -Indexes
DirectoryIndex index.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Step 4: Manual Upload Checklist

Use this checklist when uploading via cPanel:

- [ ] Delete ALL old files from public_html
- [ ] Upload index.html to public_html
- [ ] Upload .htaccess to public_html (enable "show hidden files")
- [ ] Upload robots.txt to public_html
- [ ] Upload sitemap.xml to public_html
- [ ] Upload watchio-logo.png to public_html
- [ ] Create folder "assets" in public_html
- [ ] Upload ALL files from dist/assets/ to public_html/assets/
  - [ ] index-CdyaWqqZ.css
  - [ ] index--A9X96E8.js
  - [ ] logo-D4CDb0Tc.png

### Step 5: Set Correct Permissions

In cPanel File Manager:
1. Select all files and folders
2. Click "Permissions"
3. Set:
   - Folders: `755` (drwxr-xr-x)
   - Files: `644` (-rw-r--r--)
   - .htaccess: `644`

### Step 6: Clear Everything and Test

1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Clear server cache** (if any)
3. **Test URL directly**:
   ```
   https://fmovies.in.net/assets/index-CdyaWqqZ.css
   ```
   Should show CSS code, not 404

4. **Check main site**:
   ```
   https://fmovies.in.net
   ```
   Should load completely

## 🔍 Advanced Debugging

### Check if Files Are Really There

In cPanel, navigate to:
```
public_html/assets/
```

You should see:
- index-CdyaWqqZ.css (15.53 KB)
- index--A9X96E8.js (527.98 KB)
- logo-D4CDb0Tc.png (2.15 MB)

### Test Direct Access

Try accessing files directly in browser:
```
https://fmovies.in.net/assets/index-CdyaWqqZ.css
https://fmovies.in.net/assets/index--A9X96E8.js
```

**If 404**: Files not uploaded or wrong location
**If shows code**: Files are there, issue is with paths

### Check Browser Console

1. Open browser console (F12)
2. Go to Network tab
3. Reload page
4. Look at failed requests
5. Check the URL it's trying to load

**Example**:
```
❌ https://fmovies.in.net/assets/index-CdyaWqqZ.css
   Status: 404 Not Found
```

This tells you EXACTLY what URL is failing.

## 🚀 Quick Fix Commands

### Option 1: Re-upload Everything (Recommended)

1. **Delete all files** from public_html
2. **Build fresh**:
   ```bash
   npm run build
   ```
3. **Upload entire dist folder** to public_html
4. **Verify**:
   ```
   public_html/
   ├── index.html ✓
   ├── assets/
   │   ├── index-CdyaWqqZ.css ✓
   │   └── index--A9X96E8.js ✓
   ```

### Option 2: Check URL in index.html

Open `dist/index.html` in text editor and verify:

```html
<script type="module" crossorigin src="/assets/index--A9X96E8.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-CdyaWqqZ.css">
```

Should start with `/assets/` NOT `./assets/` or `assets/`

## 🆘 Contact Hosting Support If:

- Files are uploaded correctly but still 404
- .htaccess not working
- Can't set permissions
- mod_rewrite not enabled

Tell them:
```
"I need mod_rewrite enabled for my React app.
My .htaccess file is not working.
Please enable mod_rewrite module."
```

## ✅ Success Checklist

Your site is working when:
- [ ] No 404 errors in console
- [ ] Homepage loads with styles
- [ ] Search page works
- [ ] Movies load and play
- [ ] No aclib errors
- [ ] All routes work (/search, /browse, /player)

## 📞 Still Having Issues?

### Quick Diagnostic:

1. **Visit**: https://fmovies.in.net
2. **Press**: F12 (open console)
3. **Take screenshot** of:
   - Console errors
   - Network tab (failed requests)
   - Elements tab (HTML source)

4. **Check cPanel File Manager**:
   - Screenshot of public_html folder
   - Screenshot of public_html/assets folder

This will help identify the exact problem!

## 🎯 Most Common Solution

**99% of the time, the issue is**:
1. ❌ assets folder not uploaded
2. ❌ Files in wrong directory
3. ❌ .htaccess not uploaded

**Solution**: Re-upload everything to ROOT public_html!

---

Last Updated: December 17, 2025
Build Version: index--A9X96E8.js
