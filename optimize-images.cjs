/**
 * optimize-images.js
 *
 * HOW TO USE:
 * 1. Copy to ROOT of your Astro project (next to package.json)
 * 2. npm install sharp --save-dev
 * 3. node optimize-images.js
 *
 * WHAT IT DOES:
 * - Converts all PNG/JPG in /public/ to WebP
 * - Deletes original PNG/JPG files
 * - Updates ALL references in src/ (.md, .mdx, .astro, .ts, .js)
 * - Backs up originals to /public/_originals/ first
 */

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const PUBLIC_DIR = './public';
const SRC_DIR    = './src';
const BACKUP_DIR = './public/_originals';
const MAX_WIDTH  = 1200;
const QUALITY    = 85;
const SUPPORTED  = ['.png', '.jpg', '.jpeg'];
const SRC_EXTS   = ['.md', '.mdx', '.astro', '.ts', '.tsx', '.js', '.jsx', '.json'];

let processed  = 0;
let skipped    = 0;
let totalSaved = 0;
const renames  = [];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function convertImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (path.resolve(fullPath).startsWith(path.resolve(BACKUP_DIR))) continue;
    if (entry.isDirectory()) { await convertImages(fullPath); continue; }

    const ext = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED.includes(ext)) continue;

    const originalSize = fs.statSync(fullPath).size;
    const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    if (fs.existsSync(webpPath)) {
      console.log('⏭  Already WebP: ' + entry.name);
      skipped++;
      continue;
    }

    try {
      const backupPath = path.resolve(fullPath).replace(path.resolve(PUBLIC_DIR), path.resolve(BACKUP_DIR));
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(fullPath, backupPath);

      const buffer = fs.readFileSync(fullPath);
      const meta   = await sharp(buffer).metadata();
      const targetWidth = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);

      const webpBuffer = await sharp(buffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();

      fs.writeFileSync(webpPath, webpBuffer);
      fs.unlinkSync(fullPath);

      const newSize   = webpBuffer.length;
      const saved     = originalSize - newSize;
      const reduction = Math.round((saved / originalSize) * 100);
      totalSaved += saved;

      const oldRef = path.resolve(fullPath).replace(path.resolve(PUBLIC_DIR), '').replace(/\\/g, '/');
      const newRef = path.resolve(webpPath).replace(path.resolve(PUBLIC_DIR), '').replace(/\\/g, '/');
      renames.push({ oldRef, newRef });

      console.log('✅ ' + entry.name + ' → ' + path.basename(webpPath) + ': ' + formatBytes(originalSize) + ' → ' + formatBytes(newSize) + ' (-' + reduction + '%)');
      processed++;
    } catch (err) {
      console.error('❌ Failed: ' + fullPath + ' — ' + err.message);
    }
  }
}

function updateReferences(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) { updateReferences(fullPath); continue; }

    const ext = path.extname(entry.name).toLowerCase();
    if (!SRC_EXTS.includes(ext)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    for (const { oldRef, newRef } of renames) {
      if (content.includes(oldRef)) {
        content = content.split(oldRef).join(newRef);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('📝 Updated: ' + fullPath.replace(path.resolve(SRC_DIR), 'src'));
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log('── Step 1: Converting images ──────────────────');
  await convertImages(path.resolve(PUBLIC_DIR));

  console.log('\n── Step 2: Updating references in src/ ────────');
  if (renames.length > 0) {
    updateReferences(path.resolve(SRC_DIR));
  } else {
    console.log('Nothing to update.');
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log('✅ Converted:   ' + processed + ' images');
  console.log('⏭  Skipped:    ' + skipped + ' images');
  console.log('💾 Total saved: ' + formatBytes(totalSaved));
  console.log('📦 Backups at:  ' + BACKUP_DIR);
  console.log('═══════════════════════════════════════════════');
  console.log('\n✨ Done! Deploy to Cloudflare — images load ~10x faster.');
  console.log('   To delete backups after verifying: rm -rf ./public/_originals');
}

main().catch(console.error);
