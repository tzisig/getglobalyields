// Reads every existing hero image across the site, and re-exports it as a
// small animated webp: the original static card as the base frame, plus one
// small motif (from hero-motif-library.mjs) animating in the top-right safe
// zone - a region that stays empty across every card in the design system
// regardless of that specific article's number/label text length, so this
// never needs to know or touch the original text content.
//
// Motif + color + exact position are assigned deterministically per file
// path (a hash), cycling through the full motif library so runs of
// consecutive articles don't repeat the same combination.
//
// Usage: node scripts/hero-motif-apply.mjs <category> [--dry-run] [--limit N]
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { MOTIFS, MOTIF_NAMES } from './hero-motif-library.mjs';

const N_FRAMES = 14;
const FRAME_DELAY_MS = 100;

const GOLD = '#dcb963';
const GOLD_LIGHT = '#a9821f';

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

// A handful of small position offsets within the safe top-right zone, so
// even the same motif+color combo doesn't always land in the exact same spot.
const POSITIONS = [
  [768, 58], [772, 66], [760, 52], [778, 60], [765, 70], [774, 54],
];

async function applyMotif(filePath, colorHex) {
  const meta = await sharp(filePath).metadata();
  const baseBuf = await sharp(filePath).png().toBuffer();

  const h = hashStr(filePath);
  const motifName = MOTIF_NAMES[h % MOTIF_NAMES.length];
  const motifFn = MOTIFS[motifName];
  const [cx, cy] = POSITIONS[h % POSITIONS.length];

  const frames = [];
  for (let i = 0; i < N_FRAMES; i++) {
    const t = i / N_FRAMES;
    const overlaySvg = `<svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">${motifFn(t, colorHex, cx, cy)}</svg>`;
    const overlayBuf = await sharp(Buffer.from(overlaySvg)).png().toBuffer();
    const frame = await sharp(baseBuf)
      .composite([{ input: overlayBuf, top: 0, left: 0 }])
      .png()
      .toBuffer();
    frames.push(frame);
  }

  const outBuf = await sharp(frames, { join: { animated: true } })
    .webp({ quality: 85, effort: 4, loop: 0, delay: new Array(N_FRAMES).fill(FRAME_DELAY_MS) })
    .toBuffer();

  return { outBuf, motifName, position: [cx, cy] };
}

const args = process.argv.slice(2);
const category = args[0];
const dryRun = args.includes('--dry-run');
const limitIdx = args.indexOf('--limit');
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity;

if (!category) {
  console.error('Usage: node scripts/hero-motif-apply.mjs <category> [--dry-run] [--limit N]');
  process.exit(1);
}

const root = path.join('public', 'images', 'blog');
const darkDir = path.join(root, category);
const lightDir = path.join(root, 'light', category);

const files = fs.readdirSync(darkDir).filter((f) => f.endsWith('.webp'));
let processed = 0;

for (const file of files) {
  if (processed >= limit) break;
  const darkPath = path.join(darkDir, file);
  const lightPath = path.join(lightDir, file);

  const darkResult = await applyMotif(darkPath, GOLD);
  const sizeBefore = fs.statSync(darkPath).size;
  console.log(`${category}/${file}: motif=${darkResult.motifName} pos=${darkResult.position} before=${(sizeBefore/1024).toFixed(1)}KB after=${(darkResult.outBuf.length/1024).toFixed(1)}KB`);

  if (!dryRun) {
    fs.writeFileSync(darkPath, darkResult.outBuf);
    if (fs.existsSync(lightPath)) {
      const lightResult = await applyMotif(lightPath, GOLD_LIGHT);
      fs.writeFileSync(lightPath, lightResult.outBuf);
    }
  }
  processed++;
}

console.log(`\nDone: ${processed} article(s) in ${category}${dryRun ? ' (dry run, no files written)' : ''}`);
