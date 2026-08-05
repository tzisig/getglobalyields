// Fetches real, recent headlines for the weekly-update reminder issue.
// Only two verified real feeds exist for this use case:
//   - SEC press releases: clean, on-topic (Regulatory Update)
//   - PRNewswire Financial Services: real but broad/noisy (Broker News candidates)
// No working IRS/Treasury feed was found, so Tax Treaty Update and Stat of the
// Week are not covered here - they stay manual. This script never invents or
// summarizes; it only surfaces the feed's own title/link/date.

const FEEDS = [
  {
    label: 'Regulatory Update (SEC)',
    url: 'https://www.sec.gov/news/pressreleases.rss',
    maxItems: 5,
  },
  {
    label: 'Broker / Financial Services News (PRNewswire - broad, skim for relevance)',
    url: 'https://www.prnewswire.com/rss/financial-services-latest-news/financial-services-latest-news-list.rss',
    maxItems: 8,
  },
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function parseItems(xml) {
  const items = [];
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const block of itemBlocks) {
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const pubDate = extractTag(block, 'pubDate');
    if (title && link && pubDate) {
      items.push({ title: decodeEntities(title), link: link.trim(), pubDate: new Date(pubDate) });
    }
  }
  return items;
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`));
  if (!match) return null;
  return (match[1] ?? match[2] ?? '').trim();
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchFeed({ label, url, maxItems }) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'GetGlobalYields-WeeklyUpdateBot/1.0' } });
    if (!res.ok) {
      return { label, error: `HTTP ${res.status}`, items: [] };
    }
    const xml = await res.text();
    const cutoff = Date.now() - SEVEN_DAYS_MS;
    const items = parseItems(xml)
      .filter((item) => !isNaN(item.pubDate) && item.pubDate.getTime() >= cutoff)
      .slice(0, maxItems);
    return { label, items };
  } catch (err) {
    return { label, error: String(err?.message ?? err), items: [] };
  }
}

function formatMarkdown(results) {
  const lines = [];
  for (const { label, items, error } of results) {
    lines.push(`### ${label}`);
    if (error) {
      lines.push(`_Feed request failed: ${error}. Check manually this week._`);
    } else if (items.length === 0) {
      lines.push('_No items in the last 7 days._');
    } else {
      for (const item of items) {
        const dateStr = item.pubDate.toISOString().slice(0, 10);
        lines.push(`- [${item.title}](${item.link}) - ${dateStr}`);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

const results = await Promise.all(FEEDS.map(fetchFeed));
console.log(formatMarkdown(results));
