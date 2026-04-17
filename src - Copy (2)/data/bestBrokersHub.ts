/** Articles in the Best Brokers section; URLs are /best-brokers/{slug} */

export type HubGuideEntry = {
  slug: string;
  title: string;
  kind: 'guide';
  contentId: string;
};

export type HubReviewEntry = {
  slug: string;
  title: string;
  kind: 'review';
  contentId: string;
};

export type HubComingEntry = {
  slug: string;
  title: string;
  kind: 'coming';
  teaser?: string;
};

export type BestBrokersHubEntry = HubGuideEntry | HubReviewEntry | HubComingEntry;

export const BEST_BROKERS_HUB: BestBrokersHubEntry[] = [
  {
    slug: 'how-to-open-a-us-brokerage-account-as-a-non-resident-2026-guide',
    title: 'How to Open a US Brokerage Account as a Non-Resident',
    kind: 'guide',
    contentId: 'how-to-open-a-us-brokerage-account-as-a-non-resident-2026-guide',
  },
  {
    slug: 'best-brokers-international-investors-2026',
    title: 'Best Brokers for International Investors in 2026',
    kind: 'guide',
    contentId: 'best-brokers-international-investors-2026',
  },
  {
    slug: 'interactive-brokers-review-2026-the-best-broker-for-international-investors',
    title: 'Interactive Brokers Review 2026',
    kind: 'review',
    contentId: 'interactive-brokers-review-2026-the-best-broker-for-international-investors',
  },
  {
    slug: 'etoro-review-2026',
    title: 'eToro Review 2026',
    kind: 'review',
    contentId: 'etoro-review-2026',
  },
  {
    slug: 'saxo-bank-review-2026',
    title: 'Saxo Bank Review 2026',
    kind: 'review',
    contentId: 'saxo-bank-review-2026',
  },
  {
    slug: 'interactive-brokers-vs-ibkr-lite-for-non-us-investors',
    title: 'Interactive Brokers vs IBKR Lite for Non-US Investors',
    kind: 'coming',
    teaser: 'A focused comparison of Pro vs Lite for international account holders.',
  },
  {
    slug: 'best-options-brokers-for-international-traders-2026',
    title: 'Best Options Brokers for International Traders 2026',
    kind: 'coming',
    teaser: 'Platforms that serve non-US residents who trade US-listed options.',
  },
];
