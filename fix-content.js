const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const f of items) {
        if (f === 'node_modules' || f === 'dist' || f === 'build' || f === '.git' || f === '.astro') continue;
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.md') || p.endsWith('.astro') || p.endsWith('.html')) {
            let orig = fs.readFileSync(p, 'utf8');
            let current = orig;

            // 1. Table dividers:  -> ---
            current = current.replace(/\uFFFD\uFFFD\uFFFD/g, '---');
            
            // 2. Bullet points at start of line: ^ -> - or \n -> \n-
            current = current.replace(/(^|\n)([ \t]*)\uFFFD(?=\s)/g, '$1$2-');

            // 3. Em-dash bounded by spaces: `  ` -> ` — `
            current = current.replace(/\s\uFFFD\s/g, ' — ');
            
            // 4. Any other  surrounded by non-spaces (compound words, dates, strings like USIsrael): replace with `-`
            current = current.replace(/(\S)\uFFFD(\S)/g, '$1-$2');

            // 5. Catch any remaining  just in case
            current = current.replace(/\uFFFD/g, '-');

            // 6. Replace incorrect hyphens ` - ` used as sentence separators back to ` — `
            current = current.replace(/([a-zA-Z0-9,\.\!\?\]\’\'\"])\s+-\s+([a-zA-Z0-9\[\’\'\"])/g, (match, p1, p2, offset, string) => {
                const ctx = string.substring(Math.max(0, offset - 20), Math.min(string.length, offset + 25));
                if (ctx.includes('Get Global Yields')) return match; 
                if (ctx.includes('length -')) return match;
                if (ctx.includes('index <')) return match;
                if (ctx.includes('<!--')) return match;
                return p1 + ' — ' + p2;
            });

            if (current !== orig) {
                fs.writeFileSync(p, current, 'utf8');
                console.log('Fixed:', p);
            }
        }
    }
}

walk('c:/Users/Zion/Dev/getglobalyields/src');
