import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const bestBrokers = await getCollection('best-brokers');
  const strategies = await getCollection('strategies');
  const taxes = await getCollection('taxes');
  const usInvesting = await getCollection('us-investing');
  const retirementPension = await getCollection('retirement-pension');
  const estatePlanning = await getCollection('estate-planning');
  const indexFunds = await getCollection('index-funds');
  const currencyBanking = await getCollection('currency-banking');

  const allPosts = [
    ...bestBrokers.map(post => ({ ...post, collectionPath: 'best-brokers' })),
    ...strategies.map(post => ({ ...post, collectionPath: 'strategies' })),
    ...taxes.map(post => ({ ...post, collectionPath: 'taxes' })),
    ...usInvesting.map(post => ({ ...post, collectionPath: 'us-investing' })),
    ...retirementPension.map(post => ({ ...post, collectionPath: 'retirement-pension' })),
    ...estatePlanning.map(post => ({ ...post, collectionPath: 'estate-planning' })),
    ...indexFunds.map(post => ({ ...post, collectionPath: 'index-funds' })),
    ...currencyBanking.map(post => ({ ...post, collectionPath: 'currency-banking' })),
  ].filter(post => !post.data.draft).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

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
