// Fails the build if any LIVE page (a published content article, or any
// .astro page) contains a real link - markdown [text](/path/) or HTML
// href="/path/" - pointing straight at an article that is still draft: true.
//
// That's the exact bug this script exists to catch: the site's convention is
// that a link to an unpublished article must NOT exist yet - the anchor
// phrase stays as plain text and the intent is recorded in
// relink-when-published.tsv, so scripts/relink-published.mjs can turn it into
// a real link automatically the day the target actually goes live (see that
// file's header for the exact queue format). A direct link bypasses that
// queue entirely and ships a 404/soft-broken link to real visitors, silently,
// for however long the target stays in draft - which can be months on this
// site's staged rollout calendar.
//
// Usage: node scripts/check-draft-links.mjs
// Exit code 0 = clean, 1 = at least one live-to-draft link found.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const contentRoot = path.join(repoRoot, 'src', 'content');
const pagesRoot = path.join(repoRoot, 'src', 'pages');
const componentsRoot = path.join(repoRoot, 'src', 'components');

function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, ext, out);
    else if (entry.name.endsWith(ext)) out.push(p);
  }
  return out;
}

// --- Build a map of every content article's URL path -> draft status -----
// /<collection>/<slug>/ -> true (draft) | false (live)
const draftStatusByPath = new Map();

for (const file of walk(contentRoot, '.md')) {
  const text = fs.readFileSync(file, 'utf8');
  const fm = (text.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1];
  if (!fm) continue;
  const slugMatch = fm.match(/^slug:\s*"?([^"\n]+)"?/m);
  if (!slugMatch) continue;
  const collection = path.relative(contentRoot, path.dirname(file)).replace(/\\/g, '/');
  const isDraft = /^draft:\s*true\s*$/m.test(fm);
  draftStatusByPath.set(`/${collection}/${slugMatch[1].trim()}/`, isDraft);
}

// --- Gather every page that can carry a real, already-live link ----------
const liveContentFiles = walk(contentRoot, '.md').filter((file) => {
  const text = fs.readFileSync(file, 'utf8');
  const fm = (text.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
  return /^draft:\s*false\s*$/m.test(fm);
});
const astroFiles = [...walk(pagesRoot, '.astro'), ...walk(componentsRoot, '.astro')];

const sourcesToScan = [...liveContentFiles, ...astroFiles];

// --- Extract internal links and flag any that hit a draft target ---------
// Markdown: [anchor](/path/)   HTML: href="/path/"
const markdownLinkRe = /\[([^\]]+)\]\((\/[a-z0-9-]+\/[a-z0-9-]+)\/?\)/gi;
const hrefLinkRe = /href="(\/[a-z0-9-]+\/[a-z0-9-]+)\/?"/gi;

const violations = [];

for (const file of sourcesToScan) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  const relFile = path.relative(repoRoot, file).replace(/\\/g, '/');

  lines.forEach((line, idx) => {
    for (const re of [markdownLinkRe, hrefLinkRe]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        const targetPath = (re === markdownLinkRe ? m[2] : m[1]) + '/';
        if (!draftStatusByPath.has(targetPath)) continue; // not a mapped content article - ignore
        if (draftStatusByPath.get(targetPath) !== true) continue; // target is live - fine
        violations.push({
          file: relFile,
          line: idx + 1,
          text: line.trim().slice(0, 160),
          target: targetPath.slice(0, -1),
        });
      }
    }
  });
}

if (violations.length === 0) {
  console.log(`OK - no live page links directly to a draft article (checked ${sourcesToScan.length} files).`);
  process.exit(0);
}

console.error(`\nFound ${violations.length} link(s) from a LIVE page to a DRAFT article:\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ->  ${v.target}`);
  console.error(`    ${v.text}${v.text.length >= 160 ? '...' : ''}\n`);
}

console.error(
  [
    'A live page must never link directly to an unpublished article - the target',
    "won't exist for visitors until it publishes, and could stay in draft for",
    'months on this site\'s staged rollout calendar.',
    '',
    'To fix each one:',
    '  1. Remove the link, keeping only the anchor text as plain prose.',
    '  2. Add a row to relink-when-published.tsv (repo root) so the link is',
    '     restored automatically the day the target goes live:',
    '',
    '       source<TAB>target<TAB>anchor[<TAB>htmlAttrs]',
    '',
    '     - source: path relative to src/content (e.g. taxes/foo.md), or for a',
    '       page outside src/content use ../ - e.g. ../pages/foo.astro',
    '     - target: the URL without a trailing slash, e.g. /taxes/bar',
    '     - anchor: the exact anchor text left in the body (case-sensitive)',
    '     - htmlAttrs (only for a .astro source): the original tag\'s other',
    "       attributes, e.g. class=\"text-accent-500 hover:underline\", so the",
    '       link can be reconstructed exactly when restored',
    '',
    '  scripts/relink-published.mjs runs daily and will pick it up automatically',
    '  once the target\'s draft flips to false - see that file\'s header for the',
    '  full format documentation.',
  ].join('\n')
);

process.exit(1);
