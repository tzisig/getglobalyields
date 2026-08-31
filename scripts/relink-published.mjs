// Turns pending plain-text cross-references into real internal links on the
// day their target article goes live.
//
// The writing convention on this site is that when an article wants to point
// at a guide that has not been published yet, the anchor phrase is left in the
// prose as ordinary text and the intent is recorded as a row in
// relink-when-published.tsv:
//
//     source<TAB>target<TAB>anchor[<TAB>htmlAttrs]
//     taxes/us-argentina-tax-treaty-investors.md   /taxes/us-brazil-tax-treaty-investors   Investing in US Stocks from Brazil
//     ../pages/currency-banking.astro   /currency-banking/do-you-need-us-bank-account-to-invest   need a US bank account   class="text-accent-500 hover:underline"
//
// Source paths are resolved relative to src/content, so a row for a page
// outside src/content (a .astro page, not a content article) uses a leading
// ../ to point at it - e.g. ../pages/foo.astro resolves to src/pages/foo.astro.
// A source ending in .astro is restored as a real HTML <a href> tag (using the
// optional 4th column for any original attributes like `class="..."`) instead
// of a markdown link.
//
// Nothing used to read that file, so the links were never created. This script
// closes that loop: it runs straight after publish-scheduled-articles.mjs,
// finds rows whose target is now `draft: false`, converts the anchor phrase in
// the source into a link, and removes the row from the queue.
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
const linkify = (body, anchor, targetUrl, isHtml, htmlAttrs) => {
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
      const alreadyLinked = isHtml
        ? /<a\s[^>]*$/i.test(before) || /^\s*<\/a>/i.test(after)
        : /\[[^\]]*$/.test(before) || /^\s*\]\(/.test(after);
      // Reject a match sitting inside an HTML attribute value (e.g. alt="Japan"
      // on a flag icon next to a "Japan" link target) - an odd number of
      // unescaped double-quotes before the match means we're mid-attribute.
      const insideAttrValue = isHtml && (before.match(/"/g) || []).length % 2 === 1;

      if (!partOfLongerWord && !alreadyLinked && !insideAttrValue) {
        const replacement = isHtml
          ? `<a href="${targetUrl}/"${htmlAttrs ? ' ' + htmlAttrs : ''}>${anchor}</a>`
          : `[${anchor}](${targetUrl}/)`;
        bodyLines[i] = before + replacement + after;
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
  const [source, target, anchor, htmlAttrs] = row.split('\t');
  if (!source || !target || !anchor) { kept.push(row); continue; }

  const pub = isPublished(target);
  if (!pub.ok) { kept.push(row); continue; }

  const sourcePath = path.join(contentRoot, source);
  if (!fs.existsSync(sourcePath)) {
    kept.push(row);
    skipped.push(`${source} -> ${target}: source file missing`);
    continue;
  }

  const isHtml = source.endsWith('.astro');

  const text = fs.readFileSync(sourcePath, 'utf8');
  const crlf = text.includes('\r\n');
  const flat = text.split('\r\n').join('\n');
  const fmEnd = flat.indexOf('\n---\n', 4);
  let head, body;
  if (fmEnd === -1) {
    if (!isHtml) { kept.push(row); skipped.push(`${source}: no frontmatter`); continue; }
    // .astro pages without a component-script fence: treat the whole file as body.
    head = '';
    body = flat;
  } else {
    head = flat.slice(0, fmEnd + 5);
    body = flat.slice(fmEnd + 5);
  }

  // Already linked to this target somewhere? Then the queue row is stale.
  const alreadyLinkedGlobally = isHtml
    ? body.includes(`href="${target}/"`) || body.includes(`href="${target}"`)
    : body.includes(`](${target}/)`) || body.includes(`](${target})`);
  if (alreadyLinkedGlobally) {
    done.push(`${source} -> ${target} (already linked)`);
    continue;
  }

  const res = linkify(body, anchor, target, isHtml, htmlAttrs);
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
