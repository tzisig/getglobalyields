/**
 * optimize-blog-images.cjs
 *
 * Converts PNG/JPG in /public/images/blog/dark and /public/images/blog/light to WebP,
 * resizes them to exactly 840x560 (cover), backs up originals to /public/_originals,
 * deletes the originals, and updates references in src/ files.
 *
 * Usage: node optimize-blog-images.cjs
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public/_originals';
const TARGET_DIRS = [
  path.join(PUBLIC_DIR, 'images', 'blog', 'dark'),
  path.join(PUBLIC_DIR, 'images', 'blog', 'light'),
];
const WIDTH = 840;
const HEIGHT = 560;
const QUALITY = 80;
const SUPPORTED = ['.png', '.jpg', '.jpeg', '.webp'];
const SRC_DIR = './src';
const SRC_EXTS = ['.md', '.mdx', '.astro', '.ts', '.tsx', '.js', '.jsx', '.json'];

const renames = [];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED.includes(ext)) continue;

    const isWebp = ext === '.webp';
    const webpPath = isWebp ? fullPath : fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    try {
      const originalSize = fs.statSync(fullPath).size;
      const backupPath = fullPath.replace(path.resolve(PUBLIC_DIR), path.resolve(BACKUP_DIR));
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(fullPath, backupPath);

      const buffer = fs.readFileSync(fullPath);
      const pipeline = sharp(buffer).resize(WIDTH, HEIGHT, { fit: 'cover' }).webp({ quality: QUALITY });
      const webpBuffer = await pipeline.toBuffer();

      // Backup already done above
      if (isWebp) {
        // Overwrite existing webp file
        fs.writeFileSync(webpPath, webpBuffer);
      } else {
        fs.writeFileSync(webpPath, webpBuffer);
        fs.unlinkSync(fullPath);
      }

      const newSize = webpBuffer.length;
      const saved = originalSize - newSize;
      const reduction = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;
      if (!isWebp) {
        renames.push({
          oldRef: path.resolve(fullPath).replace(path.resolve(PUBLIC_DIR), '').replace(/\\/g, '/'),
          newRef: path.resolve(webpPath).replace(path.resolve(PUBLIC_DIR), '').replace(/\\/g, '/'),
        });
      }
      console.log('✅', entry.name, isWebp ? '-> resized webp' : '→ ' + path.basename(webpPath), formatBytes(originalSize), '→', formatBytes(newSize), `(-${reduction}%)`);
    } catch (err) {
      console.error('❌ Failed:', fullPath, err.message);
    }
  }
}

function updateReferences(dir) {
  if (!fs.existsSync(dir)) return;
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
      console.log('📝 Updated:', fullPath.replace(path.resolve(SRC_DIR), 'src'));
    }
  }
}

async function main() {
  console.log('🚀 Starting blog images optimization...');
  for (const dir of TARGET_DIRS) {
    console.log('── Processing:', dir);
    await processDir(dir);
  }

  if (renames.length > 0) {
    console.log('\n── Updating references in src/');
    updateReferences(path.resolve(SRC_DIR));
  } else {
    console.log('\nNothing converted; no references to update.');
  }

  console.log('\nDone. Backups at:', BACKUP_DIR);
}

main().catch(err => { console.error(err); process.exit(1); });
