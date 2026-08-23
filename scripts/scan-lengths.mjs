import fs from 'node:fs';
import path from 'node:path';

const LIMITS = { title: 60, description: 160 };
const root = 'src/content';
const rows = [];

for (const cat of fs.readdirSync(root)) {
  const dir = path.join(root, cat);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const fm = (raw.match(/^---([\s\S]*?)---/) || [])[1] || '';
    const get = re => (fm.match(re) || [])[1] || '';

    const title = get(/^title:\s*["'](.*?)["']\s*$/m);
    const metaTitle = get(/^\s{2}metaTitle:\s*["'](.*?)["']\s*$/m);
    const desc = get(/^description:\s*["'](.*?)["']\s*$/m);
    const metaDesc = get(/^\s{2}metaDescription:\s*["'](.*?)["']\s*$/m);
    const draft = /^draft:\s*true/m.test(fm);

    for (const [kind, value, field] of [
      ['title', metaTitle || title, metaTitle ? 'seo.metaTitle' : 'title'],
      ['description', metaDesc || desc, metaDesc ? 'seo.metaDescription' : 'description']
    ]) {
      if (value.length > LIMITS[kind]) {
        rows.push({ file: `${cat}/${file}`, draft, field, len: value.length, limit: LIMITS[kind] });
      }
    }
  }
}

rows.sort((a, b) => (a.draft === b.draft ? b.len - a.len : a.draft ? 1 : -1));
console.log(`חי: ${rows.filter(r => !r.draft).length}   טיוטות: ${rows.filter(r => r.draft).length}\n`);
for (const r of rows) {
  console.log(`${r.draft ? 'טיוטה' : 'חי   '} ${String(r.len).padStart(4)}/${r.limit}  ${r.field.padEnd(20)} ${r.file}`);
}
