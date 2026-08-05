// Assigns pubDate values to newly-written draft articles so they roll out
// gradually instead of appearing all at once - the same mechanism used for
// the taxes category, generalized across all rollout categories.
//
// Usage: node scripts/rollout-schedule.mjs <category>/<slug> [<category>/<slug> ...]
// Example: node scripts/rollout-schedule.mjs us-investing/how-to-invest-in-us-stocks-from-spain strategies/vwce-review-2026
//
// Reads scripts/rollout-schedule-state.json to know the last-filled date and
// how many slots are already used on it, fills remaining slots on that date
// up to DAILY_QUOTA, then moves to the next Sun-Thu day. Writes the assigned
// pubDate directly into each article's frontmatter (draft stays true - the
// publish-scheduled-articles.yml workflow flips it when the date arrives).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, '..', 'src', 'content');
const statePath = path.join(__dirname, 'rollout-schedule-state.json');

// Steady, modest pace - deliberately NOT ramped to 10/day. At ~150-200 total
// articles needed and ~105 Sun-Thu days left before year end, 3/day clears
// the target with room to spare, and a steady cadence looks more natural to
// Google than a sudden acceleration. Raise this only if the actual content
// queue turns out larger than expected.
const DAILY_QUOTA = 3;

// Sunday=0 ... Saturday=6. Matches the existing taxes rollout (Sun-Thu).
const ROLLOUT_WEEKDAYS = new Set([0, 1, 2, 3, 4]);

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function nextRolloutDay(d) {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + 1);
  while (!ROLLOUT_WEEKDAYS.has(next.getUTCDay())) {
    next.setUTCDate(next.getUTCDate() + 1);
  }
  return next;
}

function loadState() {
  if (fs.existsSync(statePath)) {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  }
  return { lastDate: null, countOnLastDate: 0 };
}

function saveState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

function setPubDate(filePath, dateStr) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!/^pubDate: \d{4}-\d{2}-\d{2}$/m.test(content)) {
    throw new Error(`No pubDate line found in ${filePath} - check the frontmatter format.`);
  }
  const updated = content.replace(/^pubDate: \d{4}-\d{2}-\d{2}$/m, `pubDate: ${dateStr}`);
  fs.writeFileSync(filePath, updated, 'utf8');
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('Usage: node scripts/rollout-schedule.mjs <category>/<slug> [...]');
  process.exit(1);
}

let state = loadState();
let currentDate = state.lastDate ? new Date(state.lastDate + 'T00:00:00Z') : nextRolloutDay(new Date());
let countOnCurrentDate = state.lastDate ? state.countOnLastDate : 0;

// If we're resuming and today's real date has already passed currentDate,
// don't backfill into the past - jump forward to the next valid rollout day.
const today = new Date(isoDate(new Date()) + 'T00:00:00Z');
if (currentDate < today) {
  currentDate = ROLLOUT_WEEKDAYS.has(today.getUTCDay()) ? today : nextRolloutDay(today);
  countOnCurrentDate = 0;
}

const assignments = [];

for (const target of targets) {
  const [category, slug] = target.split('/');
  if (!category || !slug) {
    console.error(`Skipping malformed target "${target}" - expected <category>/<slug>.`);
    continue;
  }
  const filePath = path.join(contentRoot, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`Skipping "${target}" - file not found at ${filePath}.`);
    continue;
  }

  if (countOnCurrentDate >= DAILY_QUOTA) {
    currentDate = nextRolloutDay(currentDate);
    countOnCurrentDate = 0;
  }

  const dateStr = isoDate(currentDate);
  setPubDate(filePath, dateStr);
  assignments.push({ target, date: dateStr });
  countOnCurrentDate += 1;
}

saveState({ lastDate: isoDate(currentDate), countOnLastDate: countOnCurrentDate });

console.log('Scheduled:');
for (const { target, date } of assignments) {
  console.log(`  ${date}  ${target}`);
}
