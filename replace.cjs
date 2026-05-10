const fs = require('fs');
const path = require('path');
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.astro') || p.endsWith('.md') || p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
            let c = fs.readFileSync(p, 'utf8');
            if (c.includes('—')) {
                fs.writeFileSync(p, c.replace(/—/g, '�'), 'utf8');
                console.log('Replaced in:', p);
            }
        }
    });
}
walk('C:\\Users\\Zion\\Dev\\getglobalyields\\src');
