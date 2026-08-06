// Generates article hero images: a real stat from the article in a bold
// monospace numeral, a secondary real fact, and a short label - no baked
// article title, no generic icon. Dark+light variants per site convention.
//
// Font note: this renders via sharp/librsvg (no headless browser), which
// does not have "Inter" installed as a system font and silently falls back
// to a serif if asked for it - Arial/Consolas are what's actually available
// and resolve correctly. Do not "fix" this back to Inter/system-ui.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const MONO = "Consolas,'Courier New',monospace";
const SANS = "Arial,'Segoe UI',sans-serif";

function mixHex(a, b, t) {
  const pa = a.match(/\w\w/g).map(h => parseInt(h, 16));
  const pb = b.match(/\w\w/g).map(h => parseInt(h, 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const candidate = line ? line + ' ' + w : w;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function cardSVG(item, theme, tint) {
  const len = String(item.number).length;
  const fontSize = len > 6 ? 92 : len > 4 ? 120 : 176;

  const dark = {
    bgTop: mixHex('#050d1a', '#ffffff', 0.06),
    bgBottom: mixHex(mixHex('#0a192f', tint, 0.9), '#ffffff', 0.22),
    grainOpacity: 0.035,
    brandText: 'rgba(255,255,255,0.8)',
    brandIcon: 'rgba(255,255,255,0.85)',
    catText: '#dcb963',
    numberFill: '#f5f2e8',
    secondaryFill: '#dcb963',
    ruleFill: '#dcb963',
    labelFill: 'rgba(255,255,255,0.82)',
  };
  const light = {
    bgTop: mixHex('#ffffff', '#0a192f', 0.03),
    bgBottom: mixHex('#eef1f8', tint, 0.48),
    grainOpacity: 0.02,
    brandText: 'rgba(10,25,47,0.75)',
    brandIcon: 'rgba(10,25,47,0.8)',
    catText: '#a9821f',
    numberFill: '#0a192f',
    secondaryFill: '#a9821f',
    ruleFill: '#c9a545',
    labelFill: 'rgba(10,25,47,0.72)',
  };
  const c = theme === 'light' ? light : dark;

  return `<svg width="840" height="560" viewBox="0 0 840 560" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.bgTop}"/>
        <stop offset="100%" stop-color="${c.bgBottom}"/>
      </linearGradient>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feColorMatrix in="n" type="saturate" values="0"/></filter>
    </defs>
    <rect width="840" height="560" fill="url(#g)"/>
    <rect width="840" height="560" filter="url(#grain)" opacity="${c.grainOpacity}"/>

    <g transform="translate(48,44)">
      <circle cx="8" cy="8" r="8" fill="none" stroke="${c.brandIcon}" stroke-width="1.4"/>
      <path d="M2 8 h12 M8 1 a8 10.5 0 010 14 M8 1 a8 10.5 0 000 14" stroke="${c.brandIcon}" stroke-width="1" fill="none"/>
      <text x="23" y="12" font-family="${SANS}" font-size="13" font-weight="600" fill="${c.brandText}">GetGlobalYields.com</text>
    </g>

    <text x="56" y="120" font-family="${SANS}" font-size="12" font-weight="700" letter-spacing="2.5" fill="${c.catText}">${escapeXml(item.cat.toUpperCase())}</text>
    <text x="52" y="255" font-family="${MONO}" font-weight="700" font-size="${fontSize}" letter-spacing="-2" fill="${c.numberFill}" style="font-variant-numeric:tabular-nums">${escapeXml(item.number)}</text>

    <g transform="translate(56,280)">
      <path d="M0,5 L14,5 M8,0 L14,5 L8,10" fill="none" stroke="${c.secondaryFill}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="22" y="9" font-family="${SANS}" font-size="15" font-weight="600" fill="${c.secondaryFill}">${escapeXml(item.secondary)}</text>
    </g>

    <rect x="56" y="315" width="52" height="3" fill="${c.ruleFill}" opacity="0.85"/>
    <text x="52" y="362" font-family="${SANS}" font-size="20" font-weight="400" fill="${c.labelFill}">${wrapText(item.label, 38).map((line, i) =>
      `<tspan x="52" dy="${i === 0 ? 0 : 29}">${escapeXml(line)}</tspan>`
    ).join('')}</text>
  </svg>`;
}

// items: [{ slug, cat, number, secondary, label }]
// outDir/outLightDir: category folders under public/images/blog
export async function generateCategoryHeroes(items, tint, outDir, outLightDir) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(outLightDir, { recursive: true });
  const results = [];
  for (const item of items) {
    const darkSvg = cardSVG(item, 'dark', tint);
    const lightSvg = cardSVG(item, 'light', tint);
    const darkOut = path.join(outDir, `${item.slug}.webp`);
    const lightOut = path.join(outLightDir, `${item.slug}.webp`);
    await sharp(Buffer.from(darkSvg)).webp({ quality: 88, effort: 6 }).toFile(darkOut);
    await sharp(Buffer.from(lightSvg)).webp({ quality: 88, effort: 6 }).toFile(lightOut);
    const dSize = fs.statSync(darkOut).size;
    const lSize = fs.statSync(lightOut).size;
    results.push({ slug: item.slug, dSize, lSize });
    console.log(`${item.slug}: dark ${(dSize/1024).toFixed(1)}KB, light ${(lSize/1024).toFixed(1)}KB`);
  }
  return results;
}
