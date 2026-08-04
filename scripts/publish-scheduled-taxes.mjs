// Flips `draft: true` -> `draft: false` for any src/content/taxes/*.md article
// whose pubDate has arrived. Designed to be run daily by
// .github/workflows/publish-scheduled-taxes.yml as part of a staged content rollout.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const taxesDir = path.join(__dirname, '..', 'src', 'content', 'taxes');

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC

const files = fs.readdirSync(taxesDir).filter(f => f.endsWith('.md'));
const published = [];

for (const file of files) {
  const filePath = path.join(taxesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const draftMatch = content.match(/^draft: (true|false)$/m);
  const pubDateMatch = content.match(/^pubDate: (\d{4}-\d{2}-\d{2})$/m);
  if (!draftMatch || !pubDateMatch) continue;

  const isDraft = draftMatch[1] === 'true';
  const pubDate = pubDateMatch[1];

  if (isDraft && pubDate <= today) {
    const updated = content.replace(/^draft: true$/m, 'draft: false');
    fs.writeFileSync(filePath, updated, 'utf8');
    published.push(file.replace(/\.md$/, ''));
  }
}

if (published.length > 0) {
  console.log('Published:', published.join(', '));
  // GITHUB_OUTPUT is only set when running inside GitHub Actions.
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
