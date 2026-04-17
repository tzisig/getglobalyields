import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blogPosts = await getCollection('guides');
  const reviewPosts = await getCollection('reviews');
  const comparisonPosts = await getCollection('comparisons');

  const allPosts = [
    ...blogPosts.map(post => ({ ...post, collectionPath: 'guides' })),
    ...reviewPosts.map(post => ({ ...post, collectionPath: 'reviews' })),
    ...comparisonPosts.map(post => ({ ...post, collectionPath: 'comparisons' }))
  ].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Get Global Yields',
    description: 'Expert reviews, how-to guides, and comparisons for global financial products.',
    site: context.site || 'https://getglobalyields.com',
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.collectionPath}/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
