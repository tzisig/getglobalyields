// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GFM task-list checkboxes (`- [ ] text`) render as disabled, unlabeled
// `<input type="checkbox">` elements - purely a static bullet glyph in our
// articles, never a real interactive control. Screen readers/AI agents
// flagged them as unlabeled form fields, so hide them from the
// accessibility tree entirely rather than adding a label to a control
// nobody can actually operate.
function rehypeHideTaskListCheckboxes() {
  return (tree) => {
    function visit(node) {
      if (node.tagName === 'input' && node.properties?.type === 'checkbox') {
        node.properties.ariaHidden = 'true';
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
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
    rehypePlugins: [rehypeHideTaskListCheckboxes],
  },
  integrations: [
    sitemap({
      // These three category index pages are noindex'd (out-of-niche
      // verticals, paused pending the site's core niche getting stronger -
      // see the ROLLOUT_CATEGORIES comment in
      // scripts/publish-scheduled-articles.mjs). A noindex'd page listed in
      // the sitemap is a contradiction, so exclude exactly these URLs -
      // never a prefix match, so their articles reappear in the sitemap
      // automatically once the categories are unpaused and get published.
      filter: (page) => ![
        'https://getglobalyields.com/crypto/',
        'https://getglobalyields.com/insurance-planning/',
        'https://getglobalyields.com/real-estate/',
      ].includes(page),
    }),
    mdx(),
  ]
});
