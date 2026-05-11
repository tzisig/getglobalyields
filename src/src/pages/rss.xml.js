import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const bestBrokers = await getCollection('best-brokers');
  const strategies = await getCollection('strategies');
  const taxes = await getCollection('taxes');
  const usInvesting = await getCollection('us-investing');

  const allPosts = [
    ...bestBrokers.map(post => ({ ...post, collectionPath: 'best-brokers' })),
    ...strategies.map(post => ({ ...post, collectionPath: 'strategies' })),
    ...taxes.map(post => ({ ...post, collectionPath: 'taxes' })),
    ...usInvesting.map(post => ({ ...post, collectionPath: 'us-investing' }))
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
