// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://getglobalyields.com',
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  integrations: [sitemap(), mdx()]
});