#!/usr/bin/env node

/**
 * Automated Google Search Console Sitemap Submission
 * 
 * This script submits your sitemap to Google Search Console automatically.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Cloud Project: https://console.cloud.google.com
 * 2. Enable the Search Console API
 * 3. Create OAuth 2.0 credentials (Desktop app)
 * 4. Download credentials JSON and save as 'credentials.json' in this directory
 * 5. Run: npm install googleapis open
 * 6. Run: node submit-sitemap-gsc.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// Configuration
const SCOPES = ['https://www.googleapis.com/auth/webmasters'];
const TOKEN_PATH = './token.json';
const CREDENTIALS_PATH = './credentials.json';
const SITE_URL = 'https://fmovies.in.net';
const SITEMAP_URL = 'https://fmovies.in.net/sitemap.xml';

/**
 * Create an OAuth2 client with the given credentials
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
  } else {
    getNewToken(oAuth2Client, callback);
  }
}

/**
 * Get and store new token after prompting for user authorization
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('\n🔐 Authorize this app by visiting this URL:\n');
  console.log(authUrl);
  console.log('\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the authorization code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('❌ Error retrieving access token:', err);
        return;
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log('✅ Token stored to', TOKEN_PATH);
      callback(oAuth2Client);
    });
  });
}

/**
 * Submit sitemap to Google Search Console
 */
async function submitSitemap(auth) {
  const webmasters = google.webmasters({ version: 'v3', auth });

  try {
    console.log('\n📤 Submitting sitemap to Google Search Console...');
    console.log(`   Site: ${SITE_URL}`);
    console.log(`   Sitemap: ${SITEMAP_URL}\n`);

    await webmasters.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });

    console.log('✅ SUCCESS! Sitemap submitted successfully!\n');
    console.log('📊 Next steps:');
    console.log('   1. Visit Google Search Console: https://search.google.com/search-console');
    console.log('   2. Check sitemap status under "Sitemaps" section');
    console.log('   3. Monitor indexing progress over the next few days\n');

    // Also list current sitemaps
    await listSitemaps(auth);

  } catch (error) {
    console.error('❌ Error submitting sitemap:', error.message);
    if (error.code === 403) {
      console.log('\n⚠️  Permission denied. Make sure:');
      console.log('   1. You have verified ownership of the site in Search Console');
      console.log('   2. The Search Console API is enabled in your Google Cloud project');
      console.log('   3. Your OAuth credentials have the correct permissions\n');
    }
  }
}

/**
 * List all sitemaps for the site
 */
async function listSitemaps(auth) {
  const webmasters = google.webmasters({ version: 'v3', auth });

  try {
    console.log('📋 Current sitemaps for', SITE_URL, ':\n');
    
    const res = await webmasters.sitemaps.list({
      siteUrl: SITE_URL,
    });

    if (res.data.sitemap && res.data.sitemap.length > 0) {
      res.data.sitemap.forEach((sitemap, index) => {
        console.log(`   ${index + 1}. ${sitemap.path}`);
        console.log(`      Status: ${sitemap.isPending ? 'Pending' : 'Processed'}`);
        console.log(`      Last submitted: ${sitemap.lastSubmitted || 'N/A'}`);
        console.log(`      Last downloaded: ${sitemap.lastDownloaded || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('   No sitemaps found.\n');
    }
  } catch (error) {
    console.error('❌ Error listing sitemaps:', error.message);
  }
}

/**
 * Request indexing for specific URLs
 */
async function requestIndexing(auth, urls) {
  const indexing = google.indexing({ version: 'v3', auth });

  console.log('\n🔄 Requesting indexing for specific URLs...\n');

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`   ✅ ${url}`);
    } catch (error) {
      console.log(`   ❌ ${url} - ${error.message}`);
    }
  }
  console.log('');
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🚀 Google Search Console Sitemap Submission Tool\n');
  console.log('================================================\n');

  // Check if credentials file exists
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('❌ Error: credentials.json not found!\n');
    console.log('📝 Setup instructions:');
    console.log('   1. Go to https://console.cloud.google.com');
    console.log('   2. Create a new project or select existing one');
    console.log('   3. Enable the "Google Search Console API"');
    console.log('   4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"');
    console.log('   5. Choose "Desktop app" as application type');
    console.log('   6. Download the JSON file and save it as "credentials.json"\n');
    process.exit(1);
  }

  // Load credentials
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

  // Authorize and submit sitemap
  authorize(credentials, async (auth) => {
    await submitSitemap(auth);

    // Optionally request indexing for important pages
    const importantUrls = [
      'https://fmovies.in.net/',
      'https://fmovies.in.net/fmovies.html',
      'https://fmovies.in.net/fmovies-guide.html',
      'https://fmovies.in.net/fmovies-alternatives.html',
      'https://fmovies.in.net/fmovies-safety.html',
    ];

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Would you like to request indexing for key pages? (y/n): ', async (answer) => {
      rl.close();
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        await requestIndexing(auth, importantUrls);
      }
      console.log('✅ Done!\n');
    });
  });
}

// Run the script
main().catch(console.error);
