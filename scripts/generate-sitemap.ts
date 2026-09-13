import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Polyfill image asset imports for Node.js execution
// This allows modules importing images (e.g. world50 recipe photos) to execute seamlessly
for (const ext of ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']) {
  require.extensions[ext] = (module: any, filename: string) => {
    module.exports = path.basename(filename);
  };
}

// Now safely import sitemapService
const { sitemapService } = require('../src/services/sitemapService');

async function run() {
  console.log('[Sitemap] Generating comprehensive XML sitemap from live data...');
  
  const stats = sitemapService.getStats();
  const xml = sitemapService.generateXml();

  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf8');
  console.log(`[Sitemap] Written to ${publicSitemapPath}`);

  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf8');
    console.log(`[Sitemap] Written to ${distSitemapPath}`);
  }

  console.log(`[Sitemap] ✅ Successfully generated ${stats.totalUrls} canonical URLs:`);
  console.log(`  - Static Indexable Pages: ${stats.staticCount}`);
  console.log(`  - Botanical Ingredients:   ${stats.ingredientCount}`);
  console.log(`  - Culinary Masterclasses: ${stats.recipeCount}`);
  console.log(`  - Canonical Host:         ${stats.canonicalBaseUrl}`);
}

run().catch((err) => {
  console.error('[Sitemap] ❌ Generation error:', err);
  process.exit(1);
});
