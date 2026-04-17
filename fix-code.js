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
        } else {
            let isCode = p.endsWith('.js') || p.endsWith('.mjs') || p.endsWith('.ts') || p.endsWith('.tsx') || p.endsWith('.json') || p.endsWith('.css');
            let isAstro = p.endsWith('.astro');
            
            if (isCode || isAstro) {
                let orig = fs.readFileSync(p, 'utf8');
                let current = orig;
                
                // STEP 1 - CRITICAL FIX
                current = current.replace(/remark\uFFFDgfm/g, 'remark-gfm');
                current = current.replace(/remark—gfm/g, 'remark-gfm');
                
                if (isCode) {
                    // STEP 2 - In code files: ALWAYS use "-", NEVER "—"
                    current = current.replace(/\uFFFD/g, '-');
                    current = current.replace(/—/g, '-');
                } else if (isAstro) {
                    // ONLY explicitly fix any package names or code syntax without messing prose
                    current = current.replace(/class="([^"]*)\uFFFD([^"]*)"/g, 'class="$1-$2"');
                    current = current.replace(/class="([^"]*)—([^"]*)"/g, 'class="$1-$2"');
                }
                
                if (current !== orig) {
                    fs.writeFileSync(p, current, 'utf8');
                    console.log('Fixed syntax in:', p);
                }
            }
        }
    }
}
walk('C:\\Users\\Zion\\Dev\\getglobalyields');
