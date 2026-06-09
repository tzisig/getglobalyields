// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Astro integration: convert render-blocking CSS links to async preload
function asyncCssIntegration() {
  return {
    name: 'async-css-integration',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const { readdir, readFile, writeFile } = await import('fs/promises');
        const { join } = await import('path');
        const { fileURLToPath } = await import('url');
        const outDir = typeof dir === 'string' ? dir : fileURLToPath(dir);
        let htmlFilesProcessed = 0;

        async function processDir(dirPath) {
          const entries = await readdir(dirPath, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = join(dirPath, entry.name);
            if (entry.isDirectory()) {
              await processDir(fullPath);
            } else if (entry.name.endsWith('.html')) {
              let html = await readFile(fullPath, 'utf-8');
              const updated = html.replace(
                /<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)">/g,
                '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
              );
              if (updated !== html) {
                await writeFile(fullPath, updated, 'utf-8');
              }
              htmlFilesProcessed += 1;
            }
          }
        }

        try {
          await processDir(outDir);
          console.log(`[async-css-integration] processed ${htmlFilesProcessed} HTML file(s) in ${outDir}`);
        } catch (error) {
          console.error('[async-css-integration] error processing output directory:', outDir, error);
          throw error;
        }
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://getglobalyields.com',
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [sitemap(), mdx()]
});
