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

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC

const published = [];

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
      const updated = content.replace(/^draft: true$/m, 'draft: false');
      fs.writeFileSync(filePath, updated, 'utf8');
      published.push(`${category}/${file.replace(/\.md$/, '')}`);
    }
  }
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
