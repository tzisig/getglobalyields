// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Vite plugin: convert <link rel="stylesheet"> to async preload for Astro CSS
function asyncCssPlugin() {
  return {
    name: 'async-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" href="\/_astro\/([^"]+\.css)">/g,
        '<link rel="preload" as="style" href="/_astro/$1" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="/_astro/$1"></noscript>'
      );
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
    plugins: [tailwindcss(), asyncCssPlugin()]
  },
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [sitemap(), mdx()]
});
