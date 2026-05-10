const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.astro') || p.endsWith('.md') || p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
            let orig = fs.readFileSync(p, 'utf8');
            let matched = false;
            let current = orig;
            
            // Fix 1: The \uFFFD corruption -> —
            if (current.includes('\uFFFD')) {
                current = current.replace(/\uFFFD/g, '—');
                matched = true;
            }
            // Also some might be literal '' depending on how Node parses it, 
            // but \uFFFD matches the actual character.
            
            // Fix 2: The  -  mistake ->  — 
            // Only replace if preceded by a letter/number/punctuation/quote and followed by a letter/number/quote
            const regex = /(?<=[a-zA-Z0-9,\.\!\?\]\’\'\"])\s+-\s+(?=[a-zA-Z0-9\[\’\'\"])/g;
            if (regex.test(current)) {
                current = current.replace(regex, (match, offset, string) => {
                    const ctx = string.substring(Math.max(0, offset - 20), Math.min(string.length, offset + 25));
                    if (ctx.includes('Get Global Yields')) return match;
                    if (ctx.includes('length - 1')) return match;
                    if (ctx.includes('index < post')) return match;
                    if (ctx.includes('<!--')) return match;
                    return ' — ';
                });
                matched = true;
            }

            if (matched && current !== orig) {
                fs.writeFileSync(p, current, 'utf8');
                console.log('Fixed', p);
            }
        }
    });
}
walk('C:\\Users\\Zion\\Dev\\getglobalyields\\src');
