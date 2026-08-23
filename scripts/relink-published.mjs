// Turns pending plain-text cross-references into real internal links on the
// day their target article goes live.
//
// The writing convention on this site is that when an article wants to point
// at a guide that has not been published yet, the anchor phrase is left in the
// prose as ordinary text and the intent is recorded as a row in
// relink-when-published.tsv:
//
//     source<TAB>target<TAB>anchor
//     taxes/us-argentina-tax-treaty-investors.md   /taxes/us-brazil-tax-treaty-investors   Investing in US Stocks from Brazil
//
// Nothing used to read that file, so the links were never created. This script
// closes that loop: it runs straight after publish-scheduled-articles.mjs,
// finds rows whose target is now `draft: false`, converts the anchor phrase in
// the source article into a markdown link, and removes the row from the queue.
//
// Deliberately conservative. A row is left in the queue untouched whenever the
// anchor cannot be located unambiguously - a missed link costs nothing, a
// mangled sentence costs a rewrite.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const contentRoot = path.join(repoRoot, 'src', 'content');
const queuePath = path.join(repoRoot, 'relink-when-published.tsv');

if (!fs.existsSync(queuePath)) {
  console.log('No relink-when-published.tsv - nothing to do.');
  process.exit(0);
}

const raw = fs.readFileSync(queuePath, 'utf8');
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
const lines = raw.split(/\r?\n/);
const header = lines[0];
const rows = lines.slice(1).filter((l) => l.trim() !== '');

const isPublished = (targetUrl) => {
  const file = path.join(contentRoot, targetUrl.replace(/^\//, '') + '.md');
  if (!fs.existsSync(file)) return { ok: false, why: 'target file does not exist' };
  const t = fs.readFileSync(file, 'utf8');
  if (/^draft:\s*false\s*$/m.test(t)) return { ok: true };
  return { ok: false, why: 'target still draft' };
};

// Find the first occurrence of `anchor` in the body that is safe to linkify.
// Rejects: matches already inside a markdown link, matches that are part of a
// longer word, and matches sitting in the italic Sources / disclaimer trailer,
// where the same phrase routinely reappears as a citation.
const linkify = (body, anchor, targetUrl) => {
  const bodyLines = body.split('\n');
  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i];
    if (/^\s*\*(Sources:|This article|None of this|General|Educational|Background|Written|A general|Read the foregoing|Nothing here)/i.test(line)) continue;
    if (/^\s*#/.test(line)) continue;

    let from = 0;
    while (true) {
      const at = line.indexOf(anchor, from);
      if (at === -1) break;
      const before = line.slice(0, at);
      const after = line.slice(at + anchor.length);

      const partOfLongerWord = /[A-Za-z0-9]$/.test(before) || /^[A-Za-z0-9]/.test(after);
      const alreadyLinked = /\[[^\]]*$/.test(before) || /^\s*\]\(/.test(after);

      if (!partOfLongerWord && !alreadyLinked) {
        bodyLines[i] = before + `[${anchor}](${targetUrl}/)` + after;
        return { ok: true, body: bodyLines.join('\n'), line: i + 1 };
      }
      from = at + 1;
    }
  }
  return { ok: false, why: 'anchor not found in a linkable position' };
};

const kept = [];
const done = [];
const skipped = [];

for (const row of rows) {
  const [source, target, anchor] = row.split('\t');
  if (!source || !target || !anchor) { kept.push(row); continue; }

  const pub = isPublished(target);
  if (!pub.ok) { kept.push(row); continue; }

  const sourcePath = path.join(contentRoot, source);
  if (!fs.existsSync(sourcePath)) {
    kept.push(row);
    skipped.push(`${source} -> ${target}: source file missing`);
    continue;
  }

  const text = fs.readFileSync(sourcePath, 'utf8');
  const crlf = text.includes('\r\n');
  const flat = text.split('\r\n').join('\n');
  const fmEnd = flat.indexOf('\n---\n', 4);
  if (fmEnd === -1) { kept.push(row); skipped.push(`${source}: no frontmatter`); continue; }

  const head = flat.slice(0, fmEnd + 5);
  const body = flat.slice(fmEnd + 5);

  // Already linked to this target somewhere? Then the queue row is stale.
  if (body.includes(`](${target}/)`) || body.includes(`](${target})`)) {
    done.push(`${source} -> ${target} (already linked)`);
    continue;
  }

  const res = linkify(body, anchor, target);
  if (!res.ok) {
    kept.push(row);
    skipped.push(`${source} -> ${target}: ${res.why} ("${anchor}")`);
    continue;
  }

  const out = head + res.body;
  fs.writeFileSync(sourcePath, crlf ? out.split('\n').join('\r\n') : out, 'utf8');
  done.push(`${source}:${res.line} -> ${target}`);
}

if (done.length > 0) {
  fs.writeFileSync(queuePath, [header, ...kept].join(eol) + eol, 'utf8');
  console.log(`Relinked ${done.length}:`);
  done.forEach((d) => console.log('  ' + d));
} else {
  console.log('No pending cross-reference became linkable today.');
}

if (skipped.length > 0) {
  console.log(`\nLeft in the queue for a human (${skipped.length}):`);
  skipped.forEach((s) => console.log('  ' + s));
}

console.log(`\nQueue: ${kept.length} row(s) still pending.`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `relinked=${done.length}\n`);
}
