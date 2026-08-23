// Flips `draft: true` -> `draft: false` for any article whose pubDate has
// arrived, across every category in the staged rollout. Generalizes what was
// previously taxes-only (publish-scheduled-taxes.mjs) so the same mechanism
// covers us-investing, best-brokers, options-income, and strategies too.
//
// case-study is deliberately NOT included here - that category is paced by
// real events (the investor's actual portfolio), not a content calendar, and
// stays hand-published.
//
// Designed to be run daily by .github/workflows/publish-scheduled-articles.yml.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, '..', 'src', 'content');

// crypto, insurance-planning, and real-estate were briefly added here and
// then deliberately pulled back out: they're a different vertical from the
// "non-US investor accessing US markets" niche the other categories serve,
// and expanding off-niche before that core niche is established dilutes
// topical authority. Their drafts still exist (pubDate parked at
// 2027-01-01, well out of the way) for whenever the site is ready to
// revisit that expansion - don't add them back without that context.
const ROLLOUT_CATEGORIES = [
  'taxes',
  'us-investing',
  'best-brokers',
  'options-income',
  'strategies',
  'retirement-pension',
  'estate-planning',
  'index-funds',
  'currency-banking',
];

// How many articles may go live in a single run. The pubDates already in the
// files stay exactly as they are - this cap is what actually sets the pace, so
// changing the rhythm is a one-line edit here rather than a rewrite of every
// draft's frontmatter. Anything due but over the cap simply waits its turn,
// oldest pubDate first, so nothing is skipped or lost.
//
// Set to 1 deliberately. The drafts queue is large and most of it has not been
// through a full editorial read yet; a slower drip leaves room to catch a wrong
// number before it is live rather than after.
const DAILY_LIMIT = 1;

// Sun-Thu only. This used to be implicit, because pubDates were only ever
// assigned to those days. Once a cap exists a backlog can form, and without
// this gate the backlog would drain on Fri/Sat too.
const PUBLISH_DAYS = [0, 1, 2, 3, 4];

const now = new Date();
const today = now.toISOString().slice(0, 10); // YYYY-MM-DD, UTC

if (!PUBLISH_DAYS.includes(now.getUTCDay())) {
  console.log('Not a publishing day (%s) - nothing to do.', today);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=0\n`);
  }
  process.exit(0);
}

// Gather everything that is due, then publish only the oldest DAILY_LIMIT.
const due = [];

for (const category of ROLLOUT_CATEGORIES) {
  const dir = path.join(contentRoot, category);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const draftMatch = content.match(/^draft: (true|false)$/m);
    const pubDateMatch = content.match(/^pubDate: (\d{4}-\d{2}-\d{2})$/m);
    if (!draftMatch || !pubDateMatch) continue;

    const isDraft = draftMatch[1] === 'true';
    const pubDate = pubDateMatch[1];

    if (isDraft && pubDate <= today) {
      due.push({ filePath, content, pubDate, slug: `${category}/${file.replace(/\.md$/, '')}` });
    }
  }
}

// Oldest first, then alphabetically so the order is stable across runs.
due.sort((a, b) => (a.pubDate === b.pubDate ? a.slug.localeCompare(b.slug) : a.pubDate.localeCompare(b.pubDate)));

const published = [];

for (const item of due.slice(0, DAILY_LIMIT)) {
  const updated = item.content.replace(/^draft: true$/m, 'draft: false');
  fs.writeFileSync(item.filePath, updated, 'utf8');
  published.push(item.slug);
}

const waiting = Math.max(0, due.length - published.length);
if (waiting > 0) {
  console.log('Backlog: %d more due but held back by the daily cap of %d.', waiting, DAILY_LIMIT);
}

if (published.length > 0) {
  console.log('Published:', published.join(', '));
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=${published.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `published_list=${published.join(', ')}\n`);
  }
} else {
  console.log('Nothing due for publishing today (%s).', today);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=0\n`);
  }
}
